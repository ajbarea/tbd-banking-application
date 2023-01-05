package com.tbd.bank_backend.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "request_status")
public class RequestStatus {

	@Id
	int id;
	String status;
}
