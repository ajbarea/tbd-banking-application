package com.tbd.bank_backend.controllers;


import com.tbd.bank_backend.models.Notification;
import com.tbd.bank_backend.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

	@Autowired
	private NotificationService nServe;

	@GetMapping
	public List<Notification> getNotifications(Principal principal) {
		return nServe.getNotificationsByUser(principal.getName());
	}

	@GetMapping("/count")
	public long count(Principal principal) {
		return nServe.countByUserName(principal.getName());
	}

	@PutMapping("/{id}")
	public boolean update(@PathVariable int id) {

		if(nServe.findNotificationById(id)
				.isPresent()) {
			return nServe.markNotificationRead(2, id);
		}
		return false;
	}

	@PostMapping
	public boolean create(@RequestBody Notification notification) {
		try {
			return nServe.createNotification(notification);
		} catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		nServe.deleteNotifications(id);
	}

}
