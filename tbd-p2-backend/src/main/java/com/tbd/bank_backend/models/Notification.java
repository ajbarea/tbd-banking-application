package com.tbd.bank_backend.models;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "notifications")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int id;
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name="request_id")
	Request request;
	@ManyToOne
	@JoinColumn(name = "status_id")
	NotificationStatus status;
}
