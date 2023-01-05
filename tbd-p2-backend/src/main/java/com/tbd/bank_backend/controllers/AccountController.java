package com.tbd.bank_backend.controllers;

import com.tbd.bank_backend.models.Account;
import com.tbd.bank_backend.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

	@Autowired
	private AccountService aServ;

	@GetMapping
	public List<Account> getAccounts(Principal principal) {
        return aServ.getAccountsById(principal.getName());
	}

    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable UUID id) {
        return aServ.getAccountById(id).get();
    }

    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return aServ.saveAccount(account);
    }

	@PutMapping("/{id}/balance")
	public boolean updateBalance(@PathVariable UUID id, @RequestBody Account account){
		return aServ.updateBalance(id, account);
	}

}
