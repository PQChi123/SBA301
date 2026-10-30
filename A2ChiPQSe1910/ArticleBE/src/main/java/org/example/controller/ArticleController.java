
package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.NewsArticleRequest;
import org.example.entities.NewsArticle;
import org.example.service.NewsArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ChiPQCe180289
 *
 **/
@RestController
@RequestMapping("/news-articles")
public class ArticleController {
    private final NewsArticleService articleService;

    public ArticleController(NewsArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/active")
    public List<NewsArticle> getActiveNews() {
        return articleService.getActive();
    }

    @GetMapping
    public List<NewsArticle> getAllNews() {
        return articleService.getAll();
    }

    @GetMapping("/{id}")
    public NewsArticle getNewsById(@PathVariable("id") int id) {
        return articleService.getById(id);
    }

    @GetMapping("/search")
    public List<NewsArticle> searchNews(@RequestParam("keyword") String keyword) {
        return articleService.search(keyword);
    }

    @GetMapping("/history/{staffId}")
    public List<NewsArticle> getHistoryByStaff(@PathVariable("staffId") int staffId) {
        return articleService.getHistory(staffId);
    }

    @PostMapping
    public ResponseEntity<NewsArticle> createNews(@Valid @RequestBody NewsArticleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(articleService.create(request));
    }

    @PutMapping("/{id}")
    public NewsArticle updateNews(@PathVariable("id") int id, @Valid @RequestBody NewsArticleRequest request) {
        return articleService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable("id") int id) {
        articleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
