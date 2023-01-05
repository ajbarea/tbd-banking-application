import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserDetails } from '../models/UserDetails';
import { environment as env } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersUrl = env.API_URL + 'users'; // URL to web api users collection

  constructor(private http: HttpClient) {}

  getUser(userName: string) {
    return this.http.get<UserDetails>(this.usersUrl + '/' + userName);
  }

  userExists(userName: string) {
    return this.http.get<{ result: boolean }>(this.usersUrl + '/' + userName, {
      headers: { 'content-type': 'application/json' },
      params: new HttpParams({ fromString: 'validate=true' }),
    });
  }

  registerUser(userForm: UserDetails): Observable<any> {
    const body = JSON.stringify(userForm);
    console.log(body);
    return this.http.post<{ result: boolean }>(this.usersUrl, userForm, {
      headers: { 'content-type': 'application/json' },
    });
  }

  updateUserdetails(userForm: UserDetails) {
    return this.http.put<{ result: boolean }>(
      this.usersUrl + '/' + userForm.username,
      userForm,
      {
        headers: { 'content-type': 'application/json' },
      }
    );
  }

  updateUserPassword(username: string, password: string) {
    return this.http.put<{ result: boolean }>(
      this.usersUrl + '/' + username + '/change-pswd',
      password,
      {
        headers: { 'content-type': 'application/json' },
      }
    );
  }
}
