/**
* ChiPQCe180289
*
**/
package org.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
* ChiPQCe180289
*
**/
@Data
public class CategoryRequest {
    @NotBlank
    @Size(max = 100)
    private String categoryName;

    @Size(max = 255)
    private String categoryDescription;

    @Positive
    private Integer parentCategoryId;

    @JsonProperty("isActive")
    private boolean active;
}
