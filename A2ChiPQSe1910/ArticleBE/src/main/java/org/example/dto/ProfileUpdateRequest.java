/**
* ChiPQCe180289
*
**/
package org.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
* ChiPQCe180289
*
**/
@Data
public class ProfileUpdateRequest {
    @NotBlank
    @Size(max = 100)
    private String accountName;

    @NotBlank
    @Email
    @Size(max = 100)
    private String accountEmail;

    @Pattern(regexp = "^$|^.{6,100}$")
    private String accountPassword;
}
