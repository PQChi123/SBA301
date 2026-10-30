/**
* ChiPQCe180289
*
**/
package org.example.service;

import org.example.dto.AccountRequest;
import org.example.dto.AccountResponse;
import org.example.dto.ProfileUpdateRequest;
import org.example.entities.SystemAccount;
import org.example.respository.NewsArticleRepository;
import org.example.respository.SystemAccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

/**
* ChiPQCe180289
*
**/
@Service
public class AccountService {
    private final SystemAccountRepository accountRepository;
    private final NewsArticleRepository newsArticleRepository;

    public AccountService(SystemAccountRepository accountRepository, NewsArticleRepository newsArticleRepository) {
        this.accountRepository = accountRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    public Optional<SystemAccount> authenticate(String email, String password) {
        return accountRepository.findByAccountEmail(email)
                .filter(account -> account.getAccountPassword().equals(password));
    }

    public List<AccountResponse> getAll(String name) {
        List<SystemAccount> accounts = name == null || name.isBlank()
                ? accountRepository.findAll()
                : accountRepository.findByAccountNameContainingIgnoreCase(name);
        return accounts.stream().map(this::toResponse).toList();
    }

    public AccountResponse getById(int id) {
        return toResponse(findAccount(id));
    }

    public AccountResponse create(AccountRequest request) {
        if (request.getAccountPassword() == null || request.getAccountPassword().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu là bắt buộc khi tạo tài khoản.");
        }
        if (accountRepository.findByAccountEmail(request.getAccountEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email này đã tồn tại trong hệ thống.");
        }
        SystemAccount account = new SystemAccount();
        account.setAccountName(request.getAccountName());
        account.setAccountEmail(request.getAccountEmail());
        account.setAccountRole(request.getAccountRole());
        account.setAccountPassword(request.getAccountPassword());
        return toResponse(accountRepository.save(account));
    }

    public AccountResponse update(int id, AccountRequest request) {
        SystemAccount account = findAccount(id);
        if (accountRepository.existsByAccountEmailAndAccountIdNot(request.getAccountEmail(), id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email này đã tồn tại trong hệ thống.");
        }
        account.setAccountName(request.getAccountName());
        account.setAccountEmail(request.getAccountEmail());
        account.setAccountRole(request.getAccountRole());
        if (request.getAccountPassword() != null && !request.getAccountPassword().isBlank()) {
            account.setAccountPassword(request.getAccountPassword());
        }
        return toResponse(accountRepository.save(account));
    }

    public void delete(int id) {
        findAccount(id);
        if (newsArticleRepository.existsByCreatedBy_AccountId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Không thể xóa tài khoản đã tạo bài viết.");
        }
        accountRepository.deleteById(id);
    }

    public AccountResponse updateProfile(int id, ProfileUpdateRequest request) {
        SystemAccount account = findAccount(id);
        if (accountRepository.existsByAccountEmailAndAccountIdNot(request.getAccountEmail(), id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email này đã tồn tại trong hệ thống.");
        }
        account.setAccountName(request.getAccountName());
        account.setAccountEmail(request.getAccountEmail());
        if (request.getAccountPassword() != null && !request.getAccountPassword().isBlank()) {
            account.setAccountPassword(request.getAccountPassword());
        }
        return toResponse(accountRepository.save(account));
    }

    private SystemAccount findAccount(int id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản."));
    }

    private AccountResponse toResponse(SystemAccount account) {
        return new AccountResponse(account.getAccountId(), account.getAccountName(),
                account.getAccountEmail(), account.getAccountRole());
    }
}
