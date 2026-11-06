package org.example.service;

import org.example.dto.request.LoginRequest;
import org.example.dto.request.RegisterRequest;
import org.example.dto.response.CustomerResponse;
import org.example.dto.response.JwtResponse;
import org.example.entity.Customer;
import org.example.repository.CustomerRepository;
import org.example.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final CustomerRepository customerRepository;
    private final JwtService jwtService;
    private final String staffEmail;

    public AuthService(
            AuthenticationManager authenticationManager,
            CustomerRepository customerRepository,
            JwtService jwtService,
            @Value("${hotel.staff.email}") String staffEmail) {
        this.authenticationManager = authenticationManager;
        this.customerRepository = customerRepository;
        this.jwtService = jwtService;
        this.staffEmail = staffEmail;
    }

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        String email = authentication.getName();
        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(authority -> authority.startsWith("ROLE_"))
                .map(authority -> authority.substring(5))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Authenticated account has no role"));
        Customer customer = customerRepository.findByEmailAddressIgnoreCase(email);
        return new JwtResponse(
                jwtService.generateToken(email),
                customer == null ? null : customer.getCustomerId(),
                email,
                role);
    }

    @Transactional
    public JwtResponse register(RegisterRequest request) {
        if (staffEmail.equalsIgnoreCase(request.getEmailAddress().trim())) {
            throw new IllegalArgumentException("Email này được dành riêng cho tài khoản nhân viên");
        }
        if (customerRepository.existsByEmailAddressIgnoreCase(request.getEmailAddress())) {
            throw new IllegalArgumentException("Email đã được sử dụng");
        }
        Customer customer = new Customer();
        customer.setCustomerFullName(request.getCustomerFullName().trim());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress().trim().toLowerCase());
        customer.setPassword(request.getPassword());
        customer.setCustomerStatus(1);
        Customer saved = customerRepository.save(customer);
        return new JwtResponse(
                jwtService.generateToken(saved.getEmailAddress()),
                saved.getCustomerId(),
                saved.getEmailAddress(),
                "CUSTOMER");
    }
}
