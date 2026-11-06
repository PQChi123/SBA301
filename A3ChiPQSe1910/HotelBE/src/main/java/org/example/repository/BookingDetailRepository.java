/*
* Phạm Quốc Chí Ce180289
*/
package org.example.repository;

import org.example.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import java.time.LocalDate;
import java.util.List;

public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetail.BookingDetailKey> {
    
    @Query("SELECT CASE WHEN COUNT(bd) > 0 THEN true ELSE false END FROM BookingDetail bd WHERE bd.id.roomId = :roomId")
    boolean existsByRoomId(@Param("roomId") Integer roomId);

    @Query("""
            SELECT CASE WHEN COUNT(bd) > 0 THEN true ELSE false END
            FROM BookingDetail bd
            JOIN BookingReservation br ON br.bookingReservationId = bd.id.bookingReservationId
            WHERE bd.id.roomId = :roomId
              AND br.bookingStatus = 1
              AND bd.startDate < :endDate
              AND bd.endDate > :startDate
            """)
    boolean existsActiveOverlap(
            @Param("roomId") Integer roomId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    List<BookingDetail> findByIdBookingReservationId(Integer bookingId);

    @Modifying
    @Query("DELETE FROM BookingDetail bd WHERE bd.id.bookingReservationId = :bookingId")
    void deleteByBookingId(@Param("bookingId") Integer bookingId);
}
