package org.example.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
            @Column(name = "CategoryId")
    int id;
@Column(name = "CategoryName")
    String name;
@Column(name = "CategoryDesciption")
    String description;
@Column(name = "ParentCategoryID")
    String parentCategoryID;
@Column(name = "IsActive")
    boolean isActive;


}
