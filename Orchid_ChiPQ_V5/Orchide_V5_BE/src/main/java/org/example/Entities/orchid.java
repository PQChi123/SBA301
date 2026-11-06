package org.example.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "Orchid")
// Tạo getter và setter, Tạo constructor default và có tham số.



// Tạo getter và setter, Tạo constructor default và có tham số.
@Data
@NoArgsConstructor
@AllArgsConstructor

public class orchid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="OrchidID")
    private int id;
    @Column(name = "OrchidName")
    private String name;
 @Column(name = "IsNatural", columnDefinition = "bit default 0")
 private boolean natural;
    @Column(name = "OrchidDescription")
    private String description;
@Column (name = "OrchidCategory")
    private String category;
@Column( name = "IsAttractive",columnDefinition = "bit default 0")
    private boolean attractive;
@Column (name ="OrchidURL")
    private String url;


}
