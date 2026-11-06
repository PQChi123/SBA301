/*
* Phạm Quốc Chí Ce180289
*/
package org.example.controller;

import org.example.dto.response.RoomTypeResponse;
import org.example.service.RoomTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {
    private final RoomTypeService roomTypeService;

    public RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping
    public List<RoomTypeResponse> getAll() {
        return roomTypeService.findAll();
    }
}
