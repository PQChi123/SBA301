/**
* ChiPQCe180289
*
**/
package org.example.service;

import org.example.dto.NewsArticleRequest;
import org.example.entities.Category;
import org.example.entities.NewsArticle;
import org.example.entities.SystemAccount;
import org.example.entities.Tag;
import org.example.respository.CategoryRepository;
import org.example.respository.NewsArticleRepository;
import org.example.respository.SystemAccountRepository;
import org.example.respository.TagRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

/**
* ChiPQCe180289
*
**/
@Service
public class NewsArticleService {
    private final NewsArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final SystemAccountRepository accountRepository;
    private final TagRepository tagRepository;

    public NewsArticleService(NewsArticleRepository articleRepository, CategoryRepository categoryRepository,
                              SystemAccountRepository accountRepository, TagRepository tagRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.accountRepository = accountRepository;
        this.tagRepository = tagRepository;
    }

    public List<NewsArticle> getActive() {
        return articleRepository.findByNewsStatusTrue();
    }

    public List<NewsArticle> getAll() {
        return articleRepository.findAll();
    }

    public NewsArticle getById(int id) {
        return findArticle(id);
    }

    public List<NewsArticle> search(String keyword) {
        return articleRepository.findByNewsTitleContainingIgnoreCase(keyword);
    }

    public List<NewsArticle> getHistory(int staffId) {
        return articleRepository.findByCreatedBy_AccountId(staffId);
    }

    public NewsArticle create(NewsArticleRequest request) {
        NewsArticle article = new NewsArticle();
        article.setCreatedDate(new Date());
        article.setNewsStatus(request.getNewsStatus() == null || request.getNewsStatus());
        article.setCategory(findCategory(request.getCategoryId()));
        article.setCreatedBy(findAccount(request.getCreatedById()));
        applyRequest(article, request);
        return articleRepository.save(article);
    }

    public NewsArticle update(int id, NewsArticleRequest request) {
        NewsArticle article = findArticle(id);
        if (request.getCategoryId() != null) {
            article.setCategory(findCategory(request.getCategoryId()));
        }
        if (request.getUpdatedById() != null) {
            article.setUpdatedBy(findAccount(request.getUpdatedById()));
        }
        applyRequest(article, request);
        article.setModifiedDate(new Date());
        return articleRepository.save(article);
    }

    public void delete(int id) {
        findArticle(id);
        articleRepository.deleteById(id);
    }

    private void applyRequest(NewsArticle article, NewsArticleRequest request) {
        article.setNewsTitle(request.getNewsTitle());
        article.setHeadline(request.getHeadline());
        article.setNewsContent(request.getNewsContent());
        article.setNewsSource(request.getNewsSource());
        if (request.getNewsStatus() != null) {
            article.setNewsStatus(request.getNewsStatus());
        }
        if (request.getTagIds() != null) {
            List<Tag> tags = tagRepository.findAllById(request.getTagIds());
            if (tags.size() != request.getTagIds().stream().distinct().count()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Một hoặc nhiều Tag không tồn tại.");
            }
            article.setTags(tags);
        }
    }

    private NewsArticle findArticle(int id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy bài viết."));
    }

    private Category findCategory(Integer id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "categoryId là bắt buộc.");
        }
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category không tồn tại."));
    }

    private SystemAccount findAccount(Integer id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "createdById là bắt buộc.");
        }
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Tài khoản người dùng không tồn tại."));
    }
}
