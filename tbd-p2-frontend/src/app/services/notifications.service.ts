import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  url: string = environment.API_URL + 'notifications';
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private notifications: Notification[] = [];
  notificationsUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  countNotifications(): Observable<number> {
    return this.http.get<number>(this.url + '/count', {
      headers: this.getHeaders(),
    });
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  fetchNotifications(): void {
    this.options.headers.set(
      'Authorization',
      localStorage.getItem('jwt') || ''
    );
    this.http
      .get<Notification[]>(this.url, {
        headers: this.getHeaders(),
      })
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.notificationsUpdated.emit();
      });
  }

  createNotification(notification: Notification): Observable<boolean> {
    return this.http.post<boolean>(this.url, notification, {
      headers: this.getHeaders(),
    });
  }

  markRead(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.url + '/' + id, null, {
      headers: this.getHeaders(),
    });
  }

  deleteNotification(id: number) {
    return this.http.delete(this.url + '/' + id, {
      headers: this.getHeaders(),
    });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
