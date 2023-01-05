package com.tbd.bank_backend.services;

import com.tbd.bank_backend.models.Notification;
import com.tbd.bank_backend.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

	@Autowired
	private NotificationRepository nRepo;

	public long countByUserName(String username) {
		return nRepo.countByUserUsernameAndStatusId(username, 1);
	}

	public boolean createNotification(Notification note) {
		return nRepo.save(note).getId() > 0;
	}

	public List<Notification> getNotificationsByUser(String username) {
		return nRepo.findAllNotificationsByUserUsername(username);
	}

	@Transactional
	public boolean markNotificationRead(int statusId, int notificationId) {
		return nRepo.updateStatusById(statusId, notificationId) > 0;
	}

	public Optional<Notification> findNotificationById(int id) {
		return nRepo.findById(id);
	}

	public void deleteNotifications(int id) {
		nRepo.deleteById(id);
	}
}
