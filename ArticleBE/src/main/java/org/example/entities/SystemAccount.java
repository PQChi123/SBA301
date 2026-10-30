/**
* ChiPQCe180289
*
**/
package org.example.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
* ChiPQCe180289
*
**/
@Entity
@Table(name = "SystemAccount")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID")
    private int accountId;

    @Column(name = "AccountName", nullable = false, length = 100)
    private String accountName;

    @Column(name = "AccountEmail", nullable = false, unique = true, length = 100)
    private String accountEmail;

    @Column(name = "AccountRole", nullable = false)
    private int accountRole;

    @Column(name = "AccountPassword", nullable = false, length = 100)
    @JsonIgnore
    private String accountPassword;
}
