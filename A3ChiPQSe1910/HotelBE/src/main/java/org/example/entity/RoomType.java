/*
* Phạm Quốc Chí Ce180289
*/
package org.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Entity
@Table(name = "RoomType")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomTypeID")
    private Integer roomTypeId;

    @Column(name = "RoomTypeName", nullable = false, length = 100)
    private String roomTypeName;

    @Column(name = "TypeDescription", length = 255)
    private String typeDescription;

    @Column(name = "TypeNote", length = 255)
    private String typeNote;

    // Mối quan hệ 1-N với RoomInformation (Một loại phòng chứa nhiều phòng)
    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoomInformation> roomInformations;
}
