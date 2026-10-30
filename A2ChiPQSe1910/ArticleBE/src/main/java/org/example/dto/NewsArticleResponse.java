/**
* ChiPQCe180289
*
**/
package org.example.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entities.Category;
import org.example.entities.SystemAccount;
import org.example.entities.Tag;

import java.util.Date;
import java.util.List;

/**
* ChiPQCe180289
*
**/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticleResponse {
    private Integer newsArticleId;
    private String newsTitle;
    private String headline;
    private Date createdDate;
    private String newsContent;
    private String newsSource;
    private Boolean newsStatus;
    private Date modifiedDate;
    private Category category;
    private SystemAccount createdBy;
    private SystemAccount updatedBy;
    private List<Tag> tags;
}
