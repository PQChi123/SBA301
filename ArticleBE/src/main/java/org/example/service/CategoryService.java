/**
* ChiPQCe180289
*
**/
package org.example.service;

import org.example.dto.CategoryRequest;
import org.example.entities.Category;
import org.example.respository.CategoryRepository;
import org.example.respository.NewsArticleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
* ChiPQCe180289
*
**/
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final NewsArticleRepository newsArticleRepository;

    public CategoryService(CategoryRepository categoryRepository, NewsArticleRepository newsArticleRepository) {
        this.categoryRepository = categoryRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public List<Category> search(String name) {
        return categoryRepository.findByCategoryNameContainingIgnoreCase(name);
    }

    public Category getById(int id) {
        return findCategory(id);
    }

    public Category create(CategoryRequest request) {
        Category category = new Category();
        applyRequest(category, request);
        return categoryRepository.save(category);
    }

    public Category update(int id, CategoryRequest request) {
        Category category = findCategory(id);
        applyRequest(category, request);
        return categoryRepository.save(category);
    }

    public void delete(int id) {
        findCategory(id);
        if (newsArticleRepository.existsByCategory_CategoryId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Không thể xóa danh mục đã có bài viết.");
        }
        categoryRepository.deleteById(id);
    }

    private void applyRequest(Category category, CategoryRequest request) {
        category.setCategoryName(request.getCategoryName());
        category.setCategoryDescription(request.getCategoryDescription());
        category.setIsActive(request.isActive());
        if (request.getParentCategoryId() == null) {
            category.setParentCategory(null);
        } else {
            if (request.getParentCategoryId().equals(category.getCategoryId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Danh mục không thể là danh mục cha của chính nó.");
            }
            category.setParentCategory(findCategory(request.getParentCategoryId()));
        }
    }

    private Category findCategory(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy danh mục."));
    }
}
