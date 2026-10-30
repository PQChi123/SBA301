/**
* ChiPQCe180289
*
**/
package org.example.respository;

import org.example.entities.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
* ChiPQCe180289
*
**/
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Integer> {
    boolean existsByCreatedBy_AccountId(int accountId);
    List<NewsArticle> findByNewsStatusTrue();


    List<NewsArticle> findByCreatedBy_AccountId(int accountId);

    boolean existsByCategory_CategoryId(int  categoryId);
    List<NewsArticle> findByNewsTitleContainingIgnoreCase(String keyword);
}
