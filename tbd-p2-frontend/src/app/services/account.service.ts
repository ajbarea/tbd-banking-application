import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Account } from '../models/Account';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: Account[] = [];
  accountsUpdated = new EventEmitter<void>();

  url: string = environment.API_URL + 'accounts';

  constructor(private http: HttpClient) { }

  createNewAccount(account: Account): Observable<boolean> {
    return this.http.post<boolean>(this.url, account, {
      headers: this.getHeaders(),
    });
  }

  fetchAccounts() {
    return this.accounts;
  }

  getAccounts(): void {
    this.http
      .get<Account[]>(this.url, {
        headers: this.getHeaders(),
      })
      .subscribe((accounts) => {
        this.accounts = accounts;
        this.accountsUpdated.emit();
      });
  }

  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.url}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  update(account: Account): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.url}/${account.id}/balance`,
      account,
      {
        headers: this.getHeaders(),
      }
    );
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
