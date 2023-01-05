package com.tbd.bank_backend.services;

import com.tbd.bank_backend.models.Account;
import com.tbd.bank_backend.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public List<Account> getAccountsById(String userName) {
        return accountRepository.findAllAccountsByUserUsername(userName);
    }

    public Optional<Account> getAccountById(UUID id) {
        return accountRepository.findById(id);
    }

    public Account saveAccount(Account account) {

        return accountRepository.save(account);
    }

    @Transactional
	public boolean updateBalance(UUID id, Account account) {
        return accountRepository.updateBalanceById(id, account.getBalance()) > 0;
	}
}