import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Request } from '../models/Request';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  url: string = environment.API_URL + 'requests';
  requests: Request[] = [];

  constructor(private http: HttpClient) {}

  getRequest(id: number): Observable<Request> {
    return this.http.get<Request>(this.url + '/' + id, {
      headers: this.getHeaders(),
    });
  }

  createRequest(request: Request): Observable<number> {
    return this.http.post<number>(this.url, request, {
      headers: this.getHeaders(),
    });
  }

  updateRequest(request: Request): Observable<boolean> {
    return this.http.put<boolean>(this.url + '/' + request.id, request, {
      headers: this.getHeaders(),
    });
  }

  deleteRequest(id: number): void {
    this.http.delete(this.url + '/' + id, {
      headers: this.getHeaders(),
    });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
