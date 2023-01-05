package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

	Page<Transaction> findAllByAccountId(UUID accountId, Pageable pageable);
	Page<Transaction> findByAccountIdAndAmountGreaterThanEqual(UUID accountId, Pageable pageable, int amount);
	Page<Transaction> findByAccountIdAndAmountLessThan(UUID accountId, Pageable pageable, int amount);

}
