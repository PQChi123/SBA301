/*
* Phạm Quốc Chí Ce180289
*/
package org.example.service;

import org.example.dto.request.CustomerRequest;
import org.example.dto.response.CustomerResponse;
import org.example.entity.Customer;
import org.example.exception.NotFoundException;
import org.example.repository.BookingReservationRepository;
import org.example.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepository customers;
    private final BookingReservationRepository bookings;
    private final String staffEmail;

    public CustomerService(
            CustomerRepository customers,
            BookingReservationRepository bookings,
            @Value("${hotel.staff.email}") String staffEmail) {
        this.customers = customers;
        this.bookings = bookings;
        this.staffEmail = staffEmail;
    }

    public List<CustomerResponse> findAll(String query) {
        List<Customer> result = query == null || query.isBlank()
                ? customers.findAll()
                : customers.findByCustomerFullNameContainingIgnoreCaseOrEmailAddressContainingIgnoreCase(
                        query.trim(), query.trim());
        return result.stream().map(CustomerResponse::from).toList();
    }

    public CustomerResponse getById(Integer id) {
        return CustomerResponse.from(findCustomer(id));
    }

    public CustomerResponse getByEmail(String email) {
        Customer customer = customers.findByEmailAddressIgnoreCase(email);
        if (customer == null) {
            throw new NotFoundException("Không tìm thấy tài khoản khách hàng");
        }
        return CustomerResponse.from(customer);
    }

    @Transactional
    public CustomerResponse create(CustomerRequest request) {
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Mật khẩu là bắt buộc");
        }
        ensureEmailAvailable(request.getEmailAddress(), null);
        Customer customer = new Customer();
        apply(customer, request);
        customer.setPassword(request.getPassword());
        customer.setCustomerStatus(request.getCustomerStatus() == null ? 1 : request.getCustomerStatus());
        return CustomerResponse.from(customers.save(customer));
    }

    @Transactional
    public CustomerResponse update(Integer id, CustomerRequest request) {
        Customer customer = findCustomer(id);
        ensureEmailAvailable(request.getEmailAddress(), id);
        apply(customer, request);
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            customer.setPassword(request.getPassword());
        }
        if (request.getCustomerStatus() != null) {
            customer.setCustomerStatus(request.getCustomerStatus());
        }
        return CustomerResponse.from(customers.save(customer));
    }

    @Transactional
    public CustomerResponse updateProfile(String email, CustomerRequest request) {
        Customer customer = customers.findByEmailAddressIgnoreCase(email);
        if (customer == null) {
            throw new NotFoundException("Không tìm thấy tài khoản khách hàng");
        }
        if (request.getEmailAddress() != null && !request.getEmailAddress().equalsIgnoreCase(email)) {
            throw new IllegalArgumentException("Không thể thay đổi email đăng nhập qua cập nhật hồ sơ");
        }
        request.setEmailAddress(customer.getEmailAddress());
        apply(customer, request);
        return CustomerResponse.from(customers.save(customer));
    }

    @Transactional
    public void delete(Integer id) {
        Customer customer = findCustomer(id);
        if (bookings.existsByCustomerId(id)) {
            customer.setCustomerStatus(0);
            customers.save(customer);
            return;
        }
        customers.delete(customer);
    }

    private Customer findCustomer(Integer id) {
        return customers.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy khách hàng: " + id));
    }

    private void ensureEmailAvailable(String email, Integer excludedId) {
        if (staffEmail.equalsIgnoreCase(email.trim())) {
            throw new IllegalArgumentException("Email này được dành riêng cho tài khoản nhân viên");
        }
        Customer existing = customers.findByEmailAddressIgnoreCase(email);
        if (existing != null && !existing.getCustomerId().equals(excludedId)) {
            throw new IllegalArgumentException("Email đã được sử dụng");
        }
    }

    private void apply(Customer customer, CustomerRequest request) {
        customer.setCustomerFullName(request.getCustomerFullName().trim());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress().trim().toLowerCase());
        customer.setCustomerBirthday(request.getCustomerBirthday());
    }
}
