
package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.AccountRequest;
import org.example.dto.AccountResponse;
import org.example.dto.LoginRequest;
import org.example.dto.LoginResponse;
import org.example.dto.ProfileUpdateRequest;
import org.example.entities.SystemAccount;
import org.example.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
* ChiPQCe180289
*
**/
@RestController
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        SystemAccount account = accountService.authenticate(request.getEmail(), request.getPassword())
                .orElse(null);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Email hoặc mật khẩu không chính xác!");
        }

        return ResponseEntity.ok(new LoginResponse(account.getAccountId(), account.getAccountName(),
                account.getAccountEmail(), account.getAccountRole(), "Đăng nhập thành công!"));
    }

    @GetMapping
    public List<AccountResponse> getAllAccounts  (@RequestParam(name = "name", required = false) String name) {
        return accountService.getAll(name);
    }

    @GetMapping("/{id}")
    public AccountResponse getAccountById(@PathVariable("id") int id) {
        return accountService.getById(id);
    }

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@Valid @RequestBody AccountRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accountService.create(request));
    }

    @PutMapping("/{id}")
    public AccountResponse updateAccount(@PathVariable("id") int id, @Valid @RequestBody AccountRequest request) {
        return accountService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable("id") int id) {
        accountService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/profile")
    public AccountResponse getProfile(@PathVariable("id") int id) {
        return accountService.getById(id);
    }

    @PutMapping("/{id}/profile")
    public AccountResponse updateProfile(@PathVariable("id") int id, @Valid @RequestBody ProfileUpdateRequest request) {
        return accountService.updateProfile(id, request);
    }
}
