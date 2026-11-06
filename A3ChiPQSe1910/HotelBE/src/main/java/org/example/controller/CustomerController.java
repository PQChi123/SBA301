package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.request.CustomerRequest;
import org.example.dto.response.CustomerResponse;
import org.example.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('CUSTOMER')")
    public CustomerResponse profile(Authentication authentication) {
        return customerService.getByEmail(authentication.getName());
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('CUSTOMER')")
    public CustomerResponse updateProfile(Authentication authentication, @Valid @RequestBody CustomerRequest request) {
        return customerService.updateProfile(authentication.getName(), request);
    }

    @GetMapping
    @PreAuthorize("hasRole('STAFF')")
    public List<CustomerResponse> getAll(@RequestParam(required = false) String q) {
        return customerService.findAll(q);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public CustomerResponse getById(@PathVariable Integer id) {
        return customerService.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerResponse create(@Valid @RequestBody CustomerRequest request) {
        return customerService.create(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public CustomerResponse update(@PathVariable Integer id, @Valid @RequestBody CustomerRequest request) {
        return customerService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        customerService.delete(id);
    }
}
