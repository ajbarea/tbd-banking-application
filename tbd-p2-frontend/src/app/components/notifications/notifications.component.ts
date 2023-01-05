import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

import { Notification } from 'src/app/models/Notification';

import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  notifications: Notification[] = [];

  count$: Observable<number>;
  //count: number = 0;

  constructor(
    private nService: NotificationsService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.nService.fetchNotifications();
    this.notifications = this.nService.getNotifications();
    this.subscriptions.push(
      this.nService.notificationsUpdated.subscribe(() => {
        this.notifications = this.nService.getNotifications();
      })
    );
    this.count$ = this.nService.countNotifications();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  handleClick(notification: Notification): void {
    if (notification.status?.status == 'UNREAD') {
      this.subscriptions.push(
        this.nService
          .markRead(notification.id!)
          .subscribe(() => this.refreshNotifications())
      );
    }
  }

  handleDelete(notification: Notification): void {
    if (notification.request?.status?.id === 1) {
      this._snackbar.open('That Request is Still Pending!', 'close');
    } else {
      this.subscriptions.push(
        this.nService
          .deleteNotification(notification.id!)
          .subscribe(() => this.refreshNotifications())
      );
    }
  }

  refreshNotifications(): void {
    // this.subscriptions.push(
    //   this.nService
    //     .getNotifications()
    //     .pipe(takeUntil(this.destroySubject))
    //     .subscribe(
    //       (notifications) => (this.notifications = notifications || [])
    //     )
    // );

    // this.subscriptions.push(
    //   this.nService
    //     .countNotifications()
    //     .pipe(takeUntil(this.destroySubject))
    //     .subscribe((count) => (this.count = count || 0))
    // );
    this.nService.fetchNotifications();
    this.count$ = this.nService.countNotifications();
  }
}
