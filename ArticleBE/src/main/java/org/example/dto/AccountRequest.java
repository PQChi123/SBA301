
package org.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * ChiPQCe180289
 *
 **/
@Data
public class AccountRequest {
    @NotBlank
    @Size(max = 100)
    private String accountName;

    @NotBlank
    @Email
    @Size(max = 100)
    private String accountEmail;

    @Min(1)
    @Max(2)
    private int accountRole;

    @Pattern(regexp = "^$|^.{6,100}$")
    private String accountPassword;
}
