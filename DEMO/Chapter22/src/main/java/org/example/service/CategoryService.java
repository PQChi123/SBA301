package org.example.service;


import org.example.dto.CategoryRequest;
import org.example.dto.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
    Page<CategoryResponse> findAll(String keyword, Pageable pageable);
    CategoryResponse getById(int id);
    CategoryResponse create(CategoryRequest request);
    CategoryResponse update(int id, CategoryRequest request);
    void delete(int id);
}