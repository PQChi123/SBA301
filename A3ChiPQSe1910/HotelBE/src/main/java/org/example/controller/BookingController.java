/*
* Phạm Quốc Chí Ce180289
*/
package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.request.BookingRequest;
import org.example.dto.request.BookingStatusRequest;
import org.example.dto.response.BookingResponse;
import org.example.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(Authentication authentication, @Valid @RequestBody BookingRequest request) {
        return bookingService.create(authentication.getName(), request);
    }

    @GetMapping("/mine")
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<BookingResponse> mine(Authentication authentication) {
        return bookingService.findMine(authentication.getName());
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('CUSTOMER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelMine(@PathVariable Integer id, Authentication authentication) {
        bookingService.cancelMine(id, authentication.getName());
    }

    @GetMapping
    @PreAuthorize("hasRole('STAFF')")
    public List<BookingResponse> all() {
        return bookingService.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'CUSTOMER')")
    public BookingResponse get(@PathVariable Integer id, Authentication authentication) {
        boolean staff = authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_STAFF"));
        return bookingService.get(id, authentication.getName(), staff);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('STAFF')")
    public BookingResponse updateStatus(
            @PathVariable Integer id,
            @Valid @RequestBody BookingStatusRequest request) {
        return bookingService.updateStatus(id, request.getBookingStatus());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        bookingService.delete(id);
    }
}
