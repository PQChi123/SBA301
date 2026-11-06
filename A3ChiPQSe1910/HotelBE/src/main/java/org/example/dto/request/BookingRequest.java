/*
* Phạm Quốc Chí Ce180289
*/
package org.example.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class BookingRequest {
    @NotEmpty
    private List<@Valid BookingRoomRequest> rooms;
}
