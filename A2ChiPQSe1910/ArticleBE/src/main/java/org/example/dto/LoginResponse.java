/**
* ChiPQCe180289
*
**/
package org.example.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
* ChiPQCe180289
*
**/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private int accountId;
    private String accountName;
    private String accountEmail;
    private int accountRole;
    private String message;
}
