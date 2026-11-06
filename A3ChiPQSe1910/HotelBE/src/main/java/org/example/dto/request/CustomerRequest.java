package org.example.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CustomerRequest {
    @NotBlank
    @Size(max = 100)
    private String customerFullName;

    @Size(max = 20)
    private String telephone;

    @NotBlank
    @Email
    @Size(max = 100)
    private String emailAddress;

    @Past
    private LocalDate customerBirthday;

    private Integer customerStatus;

    @Size(min = 8, max = 72)
    private String password;
}
