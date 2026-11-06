package org.example.dto;


public record CategoryResponse(
        int categoryId,
        String categoryName,
        String categoryDescription,
        Short parentCategoryId,
        Boolean active
) {}