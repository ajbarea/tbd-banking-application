package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.TransactionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionStatusRepository extends JpaRepository<TransactionStatus, Integer> {
}
