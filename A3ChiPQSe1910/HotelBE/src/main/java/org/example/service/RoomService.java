package org.example.service;

import org.example.dto.request.RoomRequest;
import org.example.dto.response.RoomResponse;
import org.example.entity.RoomInformation;
import org.example.entity.RoomType;
import org.example.exception.NotFoundException;
import org.example.repository.BookingDetailRepository;
import org.example.repository.RoomInformationRepository;
import org.example.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomService {
    @Autowired
    private RoomInformationRepository roomRepository;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    // Helper method chuyển từ Entity sang DTO Response
    private RoomResponse mapToResponse(RoomInformation room) {
        if (room == null) return null;

        RoomResponse response = new RoomResponse();
        response.setRoomId(room.getRoomId());
        response.setRoomNumber(room.getRoomNumber());
        response.setRoomDetailDescription(room.getRoomDetailDescription());
        response.setRoomMaxCapacity(room.getRoomMaxCapacity());
        response.setRoomPricePerDay(room.getRoomPricePerDay());
        response.setRoomStatus(room.getRoomStatus());
        if (room.getRoomType() != null) {
            response.setRoomTypeName(room.getRoomType().getRoomTypeName());
        }
        return response;
    }

    // Lấy danh sách tất cả phòng
    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<RoomResponse> searchRooms(String query) {
        List<RoomInformation> rooms = query == null || query.isBlank()
                ? roomRepository.findAll()
                : roomRepository.findByRoomNumberContainingIgnoreCaseOrRoomDetailDescriptionContainingIgnoreCase(
                        query.trim(), query.trim());
        return rooms.stream().map(this::mapToResponse).toList();
    }

    // Lấy chi tiết 1 phòng theo ID (Không ném Exception)
    public RoomResponse getRoomById(Integer roomId) {
        Optional<RoomInformation> room = roomRepository.findById(roomId);
        return room.map(this::mapToResponse).orElse(null);
    }

    // Tạo phòng mới (Trả về null nếu không tìm thấy RoomType)
    public RoomResponse createRoom(RoomRequest request) {
        Optional<RoomType> roomTypeOpt = roomTypeRepository.findById(request.getRoomTypeId());
        if (roomTypeOpt.isEmpty()) {
            return null; // Không tìm thấy RoomType -> Trả về null để Controller xử lý HTTP Status
        }
        String roomNumber = String.valueOf(request.getRoomNumber());
        if (roomRepository.existsByRoomNumber(roomNumber)) {
            throw new IllegalArgumentException("Số phòng đã tồn tại");
        }

        RoomInformation room = new RoomInformation();
        room.setRoomNumber(roomNumber);
        room.setRoomDetailDescription(request.getRoomDetailDescription());
        room.setRoomMaxCapacity(request.getRoomMaxCapacity());
        room.setRoomPricePerDay(request.getRoomPricePerDay());
        room.setRoomStatus(request.getRoomStatus() != null ? request.getRoomStatus() : 1);
        room.setRoomType(roomTypeOpt.get());

        RoomInformation savedRoom = roomRepository.save(room);
        return mapToResponse(savedRoom);
    }

    public RoomResponse updateRoom(Integer roomId, RoomRequest request) {
        RoomInformation room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy phòng: " + roomId));
        String roomNumber = String.valueOf(request.getRoomNumber());
        if (roomRepository.existsByRoomNumber(roomNumber)
                && !room.getRoomNumber().equals(roomNumber)) {
            throw new IllegalArgumentException("Số phòng đã tồn tại");
        }
        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new NotFoundException("Không tìm thấy loại phòng"));
        room.setRoomNumber(roomNumber);
        room.setRoomDetailDescription(request.getRoomDetailDescription());
        room.setRoomMaxCapacity(request.getRoomMaxCapacity());
        room.setRoomPricePerDay(request.getRoomPricePerDay());
        if (request.getRoomStatus() != null) {
            room.setRoomStatus(request.getRoomStatus());
        }
        room.setRoomType(roomType);
        return mapToResponse(roomRepository.save(room));
    }

    // Xóa/chuyển trạng thái phòng (Trả về boolean kiểm tra thành công hay không)
    public boolean deleteRoom(Integer roomId) {
        Optional<RoomInformation> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isEmpty()) {
            return false; // Không tồn tại phòng để xóa
        }

        // Kiểm tra xem phòng đã từng nằm trong giao dịch đặt phòng nào chưa
        boolean isRented = bookingDetailRepository.existsByRoomId(roomId);
        if (isRented) {
            // Nếu đã từng được thuê -> Đổi trạng thái (RoomStatus = 0)
            RoomInformation room = roomOpt.get();
            room.setRoomStatus(0);
            roomRepository.save(room);
        } else {
            // Chưa từng được thuê -> Xóa hẳn khỏi DB
            roomRepository.deleteById(roomId);
        }
        return true;
    }
}
