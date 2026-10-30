/**
* ChiPQCe180289
*
**/
package org.example.respository;

import org.example.entities.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

/**
* ChiPQCe180289
*
**/
public interface  SystemAccountRepository extends JpaRepository<SystemAccount, Integer> {
    Optional<SystemAccount> findByAccountEmail(String accountEmail);
    List<SystemAccount> findByAccountNameContainingIgnoreCase(String accountName);
    boolean existsByAccountEmailAndAccountIdNot(String accountEmail, int accountId);
}
