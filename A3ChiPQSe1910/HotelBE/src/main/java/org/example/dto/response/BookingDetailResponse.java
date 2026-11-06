package org.example.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailResponse {
    private Integer roomId;
    private String roomNumber;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double actualPrice;
}
