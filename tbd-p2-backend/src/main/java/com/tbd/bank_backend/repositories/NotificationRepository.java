package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository  extends JpaRepository<Notification, Integer> {

	long countByUserUsernameAndStatusId(String userName, int id);


	List<Notification> findAllNotificationsByUserUsername(String username);

	@Modifying
	@Transactional
	@Query("UPDATE notifications n SET n.status.id = :statusId WHERE n.id = :id")
	int updateStatusById(@Param("statusId") int statusId,@Param("id") int id);
}
