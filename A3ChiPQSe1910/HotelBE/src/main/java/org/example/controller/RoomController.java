/*
* Phạm Quốc Chí Ce180289
*/
package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.request.RoomRequest;
import org.example.dto.response.RoomResponse;
import org.example.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Xem danh sách phòng
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRooms(
            @RequestParam(required = false) String q,
            Authentication authentication) {
        List<RoomResponse> result = roomService.searchRooms(q);
        boolean staff = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_STAFF"));
        if (!staff) {
            result = result.stream().filter(room -> room.getRoomStatus() == 1).toList();
        }
        return ResponseEntity.ok(result);
    }

    // Xem chi tiết phòng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable("id") Integer id) {
        RoomResponse room = roomService.getRoomById(id);
        if (room == null) {
            return ResponseEntity.notFound().build(); // Trả về HTTP 404
        }
        return ResponseEntity.ok(room);
    }

    // Tạo phòng mới
    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<?> createRoom(@Valid @RequestBody RoomRequest request) {
        RoomResponse result = roomService.createRoom(request);
        if (result == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Tạo thất bại: Không tìm thấy loại phòng (RoomTypeID) chỉ định");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable("id") Integer id,
            @Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(roomService.updateRoom(id, request));
    }

    // Xóa / Vô hiệu hóa phòng
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<String> deleteRoom(@PathVariable("id") Integer id) {
        boolean isDeleted = roomService.deleteRoom(id);
        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Xóa thất bại: Không tìm thấy phòng có ID = " + id);
        }
        return ResponseEntity.ok("Xử lý xóa/chuyển trạng thái phòng thành công");
    }
}
