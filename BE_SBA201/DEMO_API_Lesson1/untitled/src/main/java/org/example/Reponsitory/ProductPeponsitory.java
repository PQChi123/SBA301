package org.example.Reponsitory;

import org.example.Entities.ProductEntities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductPeponsitory extends JpaRepository<ProductEntities,Integer> {
}

