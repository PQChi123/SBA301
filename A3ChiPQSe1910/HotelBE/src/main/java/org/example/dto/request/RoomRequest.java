/*
* Phạm Quốc Chí Ce180289
*/
package org.example.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {
    @NotBlank(message = "Số phòng không được trống")
    private String roomNumber;

    private String roomDetailDescription;

    @NotNull
    @Min(value = 1, message = "Sức chứa tối thiểu là 1")
    private Integer roomMaxCapacity;

    @NotNull
    private Integer roomTypeId;

    @Min(value = 0, message = "Trạng thái phòng chỉ nhận 0 hoặc 1")
    @Max(value = 1, message = "Trạng thái phòng chỉ nhận 0 hoặc 1")
    private Integer roomStatus;

    @NotNull
    @Min(value = 0, message = "Giá phòng phải lớn hơn hoặc bằng 0")
    private BigDecimal roomPricePerDay;
}
