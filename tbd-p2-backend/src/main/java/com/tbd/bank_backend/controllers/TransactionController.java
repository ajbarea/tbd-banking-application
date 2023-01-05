package com.tbd.bank_backend.controllers;

import com.tbd.bank_backend.models.Account;
import com.tbd.bank_backend.models.Transaction;
import com.tbd.bank_backend.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

	@Autowired
	private TransactionService tServ;

	@GetMapping("/{id}")
	public Page<Transaction> getTransactions(@PathVariable(name = "id") UUID accountId, @RequestParam(defaultValue = "0") int page,
	                                         @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "potatoes") String filter) {
		return tServ.getAllTransactions(accountId, page, size, filter);
	}

	@GetMapping("/transaction/{id}")
	public Transaction getTransactionById(@PathVariable(name = "id") int id){
		return tServ.getTransactionById(id).get();
	}

	@PostMapping
	public Transaction createTransaction(@RequestBody Transaction transaction) {
		return tServ.saveTransaction(transaction);
	}

}
