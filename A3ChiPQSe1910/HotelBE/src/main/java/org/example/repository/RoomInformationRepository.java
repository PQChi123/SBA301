package org.example.repository;

import org.example.entity.RoomInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomInformationRepository extends JpaRepository<RoomInformation, Integer> {
    boolean existsByRoomNumber(String roomNumber);
    List<RoomInformation> findByRoomNumberContainingIgnoreCaseOrRoomDetailDescriptionContainingIgnoreCase(
            String roomNumber, String description);
}
