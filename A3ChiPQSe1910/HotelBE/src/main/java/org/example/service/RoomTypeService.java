/*
* Phạm Quốc Chí Ce180289
*/
package org.example.service;

import org.example.dto.response.RoomTypeResponse;
import org.example.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {
    private final RoomTypeRepository roomTypes;

    public RoomTypeService(RoomTypeRepository roomTypes) {
        this.roomTypes = roomTypes;
    }

    public List<RoomTypeResponse> findAll() {
        return roomTypes.findAll().stream().map(RoomTypeResponse::from).toList();
    }
}
