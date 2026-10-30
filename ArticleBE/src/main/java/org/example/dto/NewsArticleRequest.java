/**
* ChiPQCe180289
*
**/
package org.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
* ChiPQCe180289
*
**/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticleRequest {
    @NotBlank
    @Size(max = 100)
    private String newsTitle;
    @NotBlank
    @Size(max = 200)
    private String headline;
    @NotBlank
    @Size(max = 500)
    private String newsContent;
    @NotBlank
    @Size(max = 100)
    private String newsSource;
    private Boolean newsStatus;
    @Positive
    private Integer categoryId;
    @Positive
    private Integer createdById;
    @Positive
    private Integer updatedById;
    private List<@Positive Integer> tagIds; // Danh sách ID các Tag được chọn
}
