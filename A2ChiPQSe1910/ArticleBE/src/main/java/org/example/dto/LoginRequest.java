/**
* ChiPQCe180289
*
**/
package org.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
* ChiPQCe180289
*
**/
@Data
@AllArgsConstructor// tạo constructor có tham số vs như
@NoArgsConstructor// tạo constructor không tham số
public class LoginRequest {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
}
