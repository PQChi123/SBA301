/*
* Phạm Quốc Chí Ce180289
*/
package org.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "BookingDetail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetail {
    @EmbeddedId
    private BookingDetailKey id;

    @Column(name = "StartDate", nullable = false)
    private LocalDate startDate;

    @Column(name = "EndDate", nullable = false)
    private LocalDate endDate;

    @Column(name = "ActualPrice", nullable = false)
    private Double actualPrice;

    // Helper methods
    public Integer getBookingReservationId() {
        return id != null ? id.getBookingReservationId() : null;
    }

    public Integer getRoomId() {
        return id != null ? id.getRoomId() : null;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookingDetailKey implements Serializable {
        @Column(name = "BookingReservationID")
        private Integer bookingReservationId;

        @Column(name = "RoomID")
        private Integer roomId;
    }
}
