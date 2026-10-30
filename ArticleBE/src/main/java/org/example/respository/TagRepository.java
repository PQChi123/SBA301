/**
* ChiPQCe180289
*
**/
package org.example.respository;

import org.example.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
* ChiPQCe180289
*
**/
public interface TagRepository extends JpaRepository<Tag, Integer> {
    List<Tag> findByTagNameContainingIgnoreCase(String tagName);
}
