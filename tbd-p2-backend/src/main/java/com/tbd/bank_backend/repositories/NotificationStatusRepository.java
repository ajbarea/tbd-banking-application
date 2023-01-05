package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.NotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationStatusRepository extends JpaRepository<NotificationStatus, Integer> {
}
