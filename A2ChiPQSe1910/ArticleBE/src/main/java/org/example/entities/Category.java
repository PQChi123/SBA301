/**
* ChiPQCe180289
*
**/
package org.example.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
* ChiPQCe180289
*
**/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private int categoryId;
    @Column(name = "CategoryName", nullable = false, length = 100)
    private String categoryName; // Tên danh mục -> BẮT BUỘC (nullable = false)

    @Column(name = "CategoryDescription", nullable = true, length = 255)
    private String categoryDescription; // Mô tả -> CÓ THỂ ĐỂ TRỐNG (nullable = true)

    @Column(name = "IsActive", nullable = false)
    private boolean IsActive;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ParentCategoryID", nullable = true)
    private Category parentCategory;

}
