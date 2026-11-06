package org.example.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.Customer;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
    private Integer customerId;
    private String customerFullName;
    private String telephone;
    private String emailAddress;
    private LocalDate customerBirthday;
    private Integer customerStatus;

    public static CustomerResponse from(Customer customer) {
        return new CustomerResponse(
                customer.getCustomerId(),
                customer.getCustomerFullName(),
                customer.getTelephone(),
                customer.getEmailAddress(),
                customer.getCustomerBirthday(),
                customer.getCustomerStatus());
    }
}
