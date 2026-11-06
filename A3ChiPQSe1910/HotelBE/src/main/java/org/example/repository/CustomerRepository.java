/*
* Phạm Quốc Chí Ce180289
*/
package org.example.repository;

import org.example.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByEmailAddress(String emailAddress);
    Customer findByEmailAddressIgnoreCase(String emailAddress);
    boolean existsByEmailAddressIgnoreCase(String emailAddress);
    List<Customer> findByCustomerFullNameContainingIgnoreCaseOrEmailAddressContainingIgnoreCase(
            String name, String email);
}
