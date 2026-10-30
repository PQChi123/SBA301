/**
* ChiPQCe180289
*
**/
package org.example.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
* ChiPQCe180289
*
**/
@Entity
@Table(name = "NewsArticle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsArticleID")
    private int newsArticleId;
    @Column(name = "NewsTitle", nullable = false, length = 100)
    private String newsTitle;
    @Column(name = "Headline", nullable = false, length = 200)
    private String headline;
    @Column(name = "CreatedDate", nullable = false)
    private Date createdDate;
    @Column(name = "NewsContent", nullable = false, length = 500)
    private String newsContent;
    @Column(name = "NewsSource", nullable = false, length = 100)
    private String newsSource;
    @Column(name = "NewsStatus", nullable = false)
    private boolean newsStatus;
    @Column(name = "ModifiedDate", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifiedDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CategoryID", nullable = false) // Tên cột khóa ngoại trong DB
    private Category category;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CreatedByID", nullable = false)
    private SystemAccount createdBy;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UpdatedByID", nullable = true)
    private SystemAccount updatedBy;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "NewsTag",
            joinColumns = @JoinColumn(name = "NewsArticleID"),
            inverseJoinColumns = @JoinColumn(name = "TagID")
    )
    private List<Tag> tags;
}
