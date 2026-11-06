package org.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CustomerID")
    private Integer customerId;

    @Column(name = "CustomerFullName", nullable = false, length = 100)
    private String customerFullName;

    @Column(name = "Telephone", length = 20)
    private String telephone;

    @Column(name = "EmailAddress", nullable = false, unique = true, length = 100)
    private String emailAddress;

    @Column(name = "CustomerBirthday")
    private LocalDate customerBirthday;

    @Column(name = "CustomerStatus", nullable = false)
    private Integer customerStatus = 1;

    @Column(name = "Password", nullable = false)
    private String password;
}
