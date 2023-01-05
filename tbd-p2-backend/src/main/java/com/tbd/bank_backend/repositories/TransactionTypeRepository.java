package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionTypeRepository extends JpaRepository<TransactionType, Integer> { }
