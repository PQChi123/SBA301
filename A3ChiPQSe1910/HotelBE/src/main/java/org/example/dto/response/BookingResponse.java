package org.example.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Integer bookingReservationId;
    private Integer customerId;
    private LocalDate bookingDate;
    private BigDecimal totalPrice;
    private Integer bookingStatus;
    private List<BookingDetailResponse> details;
}
