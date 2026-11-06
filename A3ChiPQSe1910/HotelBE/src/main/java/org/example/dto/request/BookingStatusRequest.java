/*
* Phạm Quốc Chí Ce180289
*/
package org.example.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingStatusRequest {
    @NotNull
    @Min(0)
    @Max(3)
    private Integer bookingStatus;
}
