package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {
    List<Account> findAllAccountsByUserUsername(String userName);

	@Modifying
	@Transactional
	@Query("UPDATE accounts a SET a.balance = :balance WHERE a.id = :id")
	int updateBalanceById(@Param("id") UUID id,@Param("balance") double balance);
}