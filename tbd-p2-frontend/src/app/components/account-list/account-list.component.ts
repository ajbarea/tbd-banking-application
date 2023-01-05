import { Component, OnInit } from '@angular/core';

import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/Account';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { UserDetails } from 'src/app/models/UserDetails';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  user$: Observable<UserDetails>;

  constructor(
    private service: AccountService,
    private authService: AuthService,
    private uService: UsersService
  ) {}

  ngOnInit(): void {
    this.service.getAccounts();
    this.accounts = this.service.fetchAccounts();

    this.user$ = this.uService.getUser(
      this.authService.getLoggedInUser() || ''
    );

    this.service.accountsUpdated.subscribe(() => {
      this.accounts = this.service.fetchAccounts();
    });
  }
}
