/*
* Phạm Quốc Chí Ce180289
*/
package org.example.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRoomRequest {
    @NotNull
    private Integer roomId;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;
}
