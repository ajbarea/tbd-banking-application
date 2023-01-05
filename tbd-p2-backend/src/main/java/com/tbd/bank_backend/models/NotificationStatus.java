package com.tbd.bank_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "notification_status")
public class NotificationStatus {

	@Id
	int id;
	String status;

}
