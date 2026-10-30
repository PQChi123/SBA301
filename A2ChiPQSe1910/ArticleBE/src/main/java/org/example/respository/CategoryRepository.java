/**
* ChiPQCe180289
*
**/
package org.example.respository;

import org.example.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
* ChiPQCe180289
*
**/
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByCategoryNameContainingIgnoreCase(String categoryName);

}
