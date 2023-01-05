import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Account } from 'src/app/models/Account';
import { AccountType } from 'src/app/models/AccountType';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  types: AccountType[] = [
    { id: 1, type: 'Checking' },
    { id: 2, type: 'Savings' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private aServe: AccountService,
    private authServe: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      balance: ['', [Validators.required, Validators.min(100)]],
      type: ['', Validators.required],
    });
  }

  onSubmit() {
    const account: Account = {
      name: this.accountForm.value.name,
      balance: this.accountForm.value.balance,
      type: this.accountForm.value.type,
      user: {username: this.authServe.getLoggedInUser() || '', email: '', password: ''}
    };

    this.aServe
      .createNewAccount(account)
      .subscribe(() => {
        this.aServe.fetchAccounts();
        this.aServe.getAccounts();
        this.router.navigate(['/accounts']);

      });
  }
}
