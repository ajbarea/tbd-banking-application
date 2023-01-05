package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountTypeRepository extends JpaRepository<AccountType, Integer> {}
