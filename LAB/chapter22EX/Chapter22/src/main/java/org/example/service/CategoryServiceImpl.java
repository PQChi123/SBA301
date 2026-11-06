package org.example.service;

import org.example.dto.CategoryRequest;
import org.example.dto.CategoryResponse;
import org.example.entities.Category;
import org.example.exception.BusinessConflictException;
import org.example.exception.ResourceNotFoundException;
import org.example.responsitory.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;

    // Constructor Injection
    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CategoryResponse> findAll(String keyword, Pageable pageable) {
        Page<Category> page = (keyword == null || keyword.isBlank())
                ? repository.findAll(pageable)
                : repository.findByNameContainingIgnoreCase(keyword, pageable);
        return page.map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getById(int id) {
        return toResponse(findEntity(id));
    }

    @Override
    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        if (repository.existsByNameIgnoreCase(request.categoryName())) {
            throw new BusinessConflictException("Category name already exists");
        }
        Category c = new Category();
        apply(c, request);
        return toResponse(repository.save(c));
    }

    @Override
    @Transactional
    public CategoryResponse update(int id, CategoryRequest request) {
        Category c = findEntity(id);
        apply(c, request);
        return toResponse(repository.save(c));
    }

    @Override
    @Transactional
    public void delete(int id) {
        Category c = findEntity(id);
        repository.delete(c);
    }

    private Category findEntity(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category " + id + " not found"));
    }

    private void apply(Category c, CategoryRequest r) {
        c.setName(r.categoryName().trim());
        c.setDescription(r.categoryDescription().trim());
        c.setParentCategoryID(r.parentCategoryId() != null ? r.parentCategoryId().toString() : null);
        c.setActive(r.active() == null ? Boolean.TRUE : r.active());
    }

    private CategoryResponse toResponse(Category c) {
        return new CategoryResponse(
                (short) c.getId(),
                c.getName(),
                c.getDescription(),
                c.getParentCategoryID() != null ? Short.parseShort(c.getParentCategoryID()) : null,
                c.isActive()
        );
    }
}
