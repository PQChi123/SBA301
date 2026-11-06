/*
* Phạm Quốc Chí Ce180289
*/
package org.example.repository;

import org.example.entity.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingReservationRepository extends JpaRepository<BookingReservation, Integer> {
    List<BookingReservation> findByCustomerIdOrderByBookingDateDesc(Integer customerId);
    boolean existsByCustomerId(Integer customerId);
}
