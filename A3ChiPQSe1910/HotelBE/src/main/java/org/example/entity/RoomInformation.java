/*
* Phạm Quốc Chí Ce180289
*/
package org.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "RoomInformation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomID")
    private Integer roomId;

    @Column(name = "RoomNumber", nullable = false, length = 50)
    private String roomNumber;

    @Column(name = "RoomDetailDescription", length = 255)
    private String roomDetailDescription;

    @Column(name = "RoomMaxCapacity", nullable = false)
    private Integer roomMaxCapacity;

    @Column(name = "RoomStatus", nullable = false)
    private Integer roomStatus = 1; // 1: Active/Available, 0: Disabled

    @Column(name = "RoomPricePerDay", nullable = false, precision = 10, scale = 2)
    private BigDecimal roomPricePerDay;

    // Mối quan hệ N-1 với RoomType (Nhiều phòng thuộc về 1 Loại phòng)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "RoomTypeID", nullable = false)
    private RoomType roomType;
}
