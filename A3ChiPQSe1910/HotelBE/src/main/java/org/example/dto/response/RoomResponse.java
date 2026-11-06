package org.example.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponse {
    private Integer roomId;
    private String roomNumber;
    private String roomDetailDescription;
    private Integer roomMaxCapacity;
    private String roomTypeName; // Chỉ lấy tên loại phòng thay vì lấy cả Entity
    private Integer roomStatus;
    private BigDecimal roomPricePerDay;
}
