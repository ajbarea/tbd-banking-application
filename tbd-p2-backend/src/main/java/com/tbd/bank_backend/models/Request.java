package com.tbd.bank_backend.models;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "requests")
public class Request {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int id;
	double amount;
	@ManyToOne
	@JoinColumn(name = "recipient")
	User recipient;
	@ManyToOne
	@JoinColumn(name = "sender")
	Account sender;
	@ManyToOne
	@JoinColumn(name = "status")
	RequestStatus status;



}
