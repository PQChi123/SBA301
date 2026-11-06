/*
* Phạm Quốc Chí Ce180289
*/
package org.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "BookingReservation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingReservationID")
    private Integer bookingReservationId;

    @Column(name = "BookingDate", nullable = false)
    private LocalDate bookingDate;

    @Column(name = "TotalPrice", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "CustomerID", nullable = false)
    private Integer customerId;

    @Column(name = "BookingStatus", nullable = false)
    private Integer bookingStatus = 1;
}
