package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestStatusRepository extends JpaRepository<RequestStatus, Integer> {
}
