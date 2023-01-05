package com.tbd.bank_backend.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "accounts")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	UUID id;
	String name;
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	double balance;
	@ManyToOne
	@JoinColumn(name = "type_id")
	AccountType type;

}
