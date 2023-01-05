package com.tbd.bank_backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "transactions")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	@ManyToOne
	@JoinColumn(name = "account_id")
	Account account;
	@Column(nullable = false)
	double amount;
	@ManyToOne
	@JoinColumn(name = "type")
	TransactionType type;
	@ManyToOne
	@JoinColumn(name = "status")
	TransactionStatus status;
	String category;
	String description;
	LocalDate date;
	String merchantName;
}
