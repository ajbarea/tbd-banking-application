package com.tbd.bank_backend.services;

import com.tbd.bank_backend.models.Transaction;
import com.tbd.bank_backend.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;


	public Page<Transaction> getAllTransactions(UUID accountId, int page, int size, String filter) {
		PageRequest pr = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
		return switch(filter) {
			case "Income" -> transactionRepository.findByAccountIdAndAmountGreaterThanEqual(accountId, pr, 0);
			case "Expenses" -> transactionRepository.findByAccountIdAndAmountLessThan(accountId, pr, 0);
			default -> transactionRepository.findAllByAccountId(accountId, pr);
		};

	}


	public Transaction saveTransaction(Transaction transaction) {

		transaction.setDate(LocalDate.now());

		return transactionRepository.save(transaction);
	}


	public Optional<Transaction> getTransactionById(int id) {
		return transactionRepository.findById(id);
	}
}
