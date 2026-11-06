package org.example.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    @Size(max = 100)
    private String customerFullName;

    @Size(max = 20)
    private String telephone;

    @NotBlank
    @Email
    @Size(max = 100)
    private String emailAddress;

    @NotBlank
    @Size(min = 8, max = 72)
    private String password;
}
