package org.example.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.RoomType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomTypeResponse {
    private Integer roomTypeId;
    private String roomTypeName;

    public static RoomTypeResponse from(RoomType roomType) {
        return new RoomTypeResponse(roomType.getRoomTypeId(), roomType.getRoomTypeName());
    }
}
