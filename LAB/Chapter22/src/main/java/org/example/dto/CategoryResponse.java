package org.example.dto;


public record CategoryResponse(
        Short categoryId,
        String categoryName,
        String categoryDescription,
        Short parentCategoryId,
        Boolean active
) {}