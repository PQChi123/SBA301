package org.example.service;

import org.example.dto.request.BookingRequest;
import org.example.dto.request.BookingRoomRequest;
import org.example.dto.response.BookingDetailResponse;
import org.example.dto.response.BookingResponse;
import org.example.entity.BookingDetail;
import org.example.entity.BookingReservation;
import org.example.entity.Customer;
import org.example.entity.RoomInformation;
import org.example.exception.NotFoundException;
import org.example.repository.BookingDetailRepository;
import org.example.repository.BookingReservationRepository;
import org.example.repository.CustomerRepository;
import org.example.repository.RoomInformationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class BookingService {
    private final BookingReservationRepository bookings;
    private final BookingDetailRepository details;
    private final CustomerRepository customers;
    private final RoomInformationRepository rooms;

    public BookingService(
            BookingReservationRepository bookings,
            BookingDetailRepository details,
            CustomerRepository customers,
            RoomInformationRepository rooms) {
        this.bookings = bookings;
        this.details = details;
        this.customers = customers;
        this.rooms = rooms;
    }

    @Transactional
    public BookingResponse create(String email, BookingRequest request) {
        Customer customer = customers.findByEmailAddressIgnoreCase(email);
        if (customer == null || customer.getCustomerStatus() != 1) {
            throw new IllegalArgumentException("Không tìm thấy tài khoản khách hàng đang hoạt động");
        }
        Set<Integer> roomIds = new HashSet<>();
        BigDecimal total = BigDecimal.ZERO;
        List<RoomSelection> selections = new ArrayList<>();
        for (BookingRoomRequest selection : request.getRooms()) {
            if (!roomIds.add(selection.getRoomId())) {
                throw new IllegalArgumentException("Không thể chọn một phòng nhiều lần trong cùng đơn");
            }
            if (selection.getStartDate().isBefore(LocalDate.now())
                    || !selection.getEndDate().isAfter(selection.getStartDate())) {
                throw new IllegalArgumentException("Ngày trả phòng phải sau ngày nhận phòng và không ở quá khứ");
            }
            RoomInformation room = rooms.findById(selection.getRoomId())
                    .orElseThrow(() -> new NotFoundException("Không tìm thấy phòng: " + selection.getRoomId()));
            if (room.getRoomStatus() != 1) {
                throw new IllegalArgumentException("Phòng " + room.getRoomNumber() + " hiện không hoạt động");
            }
            if (details.existsActiveOverlap(room.getRoomId(), selection.getStartDate(), selection.getEndDate())) {
                throw new IllegalArgumentException("Phòng " + room.getRoomNumber() + " đã được đặt trong thời gian này");
            }
            long nights = ChronoUnit.DAYS.between(selection.getStartDate(), selection.getEndDate());
            total = total.add(room.getRoomPricePerDay().multiply(BigDecimal.valueOf(nights)));
            selections.add(new RoomSelection(selection, room, nights));
        }

        BookingReservation booking = new BookingReservation();
        booking.setCustomerId(customer.getCustomerId());
        booking.setBookingDate(LocalDate.now());
        booking.setTotalPrice(total);
        booking.setBookingStatus(1);
        BookingReservation saved = bookings.save(booking);
        for (RoomSelection selection : selections) {
            BookingDetail detail = new BookingDetail();
            detail.setId(new BookingDetail.BookingDetailKey(saved.getBookingReservationId(), selection.room().getRoomId()));
            detail.setStartDate(selection.request().getStartDate());
            detail.setEndDate(selection.request().getEndDate());
            detail.setActualPrice(selection.room().getRoomPricePerDay()
                    .multiply(BigDecimal.valueOf(selection.nights())).doubleValue());
            details.save(detail);
        }
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> findMine(String email) {
        Customer customer = customers.findByEmailAddressIgnoreCase(email);
        if (customer == null) {
            throw new IllegalArgumentException("Không tìm thấy tài khoản khách hàng");
        }
        return bookings.findByCustomerIdOrderByBookingDateDesc(customer.getCustomerId())
                .stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> findAll() {
        return bookings.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public BookingResponse get(Integer id, String email, boolean staff) {
        BookingReservation booking = getBooking(id);
        if (!staff) {
            Customer customer = customers.findByEmailAddressIgnoreCase(email);
            if (customer == null || !booking.getCustomerId().equals(customer.getCustomerId())) {
                throw new org.springframework.security.access.AccessDeniedException("Bạn không có quyền xem đơn đặt phòng này");
            }
        }
        return toResponse(booking);
    }

    @Transactional
    public BookingResponse updateStatus(Integer id, Integer status) {
        BookingReservation booking = getBooking(id);
        booking.setBookingStatus(status);
        return toResponse(bookings.save(booking));
    }

    @Transactional
    public void cancelMine(Integer id, String email) {
        BookingReservation booking = getBooking(id);
        Customer customer = customers.findByEmailAddressIgnoreCase(email);
        if (customer == null || !booking.getCustomerId().equals(customer.getCustomerId())) {
            throw new org.springframework.security.access.AccessDeniedException("Bạn không có quyền hủy đơn này");
        }
        if (booking.getBookingStatus() != 1) {
            throw new IllegalArgumentException("Chỉ có thể hủy đơn đang hoạt động");
        }
        booking.setBookingStatus(0);
        bookings.save(booking);
    }

    @Transactional
    public void delete(Integer id) {
        getBooking(id);
        details.deleteByBookingId(id);
        bookings.deleteById(id);
    }

    private BookingReservation getBooking(Integer id) {
        return bookings.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy đơn đặt phòng: " + id));
    }

    private BookingResponse toResponse(BookingReservation booking) {
        List<BookingDetailResponse> detailResponses = details.findByIdBookingReservationId(
                        booking.getBookingReservationId())
                .stream()
                .map(detail -> {
                    RoomInformation room = rooms.findById(detail.getRoomId()).orElse(null);
                    return new BookingDetailResponse(
                            detail.getRoomId(),
                            room == null ? "Phòng đã xóa" : room.getRoomNumber(),
                            detail.getStartDate(),
                            detail.getEndDate(),
                            detail.getActualPrice());
                })
                .toList();
        return new BookingResponse(
                booking.getBookingReservationId(),
                booking.getCustomerId(),
                booking.getBookingDate(),
                booking.getTotalPrice(),
                booking.getBookingStatus(),
                detailResponses);
    }

    private record RoomSelection(BookingRoomRequest request, RoomInformation room, long nights) {
    }
}
