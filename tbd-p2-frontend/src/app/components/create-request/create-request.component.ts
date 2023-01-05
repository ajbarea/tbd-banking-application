import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Account } from 'src/app/models/Account';
import { Notification } from 'src/app/models/Notification';
import { Request } from 'src/app/models/Request';

import { AccountService } from 'src/app/services/account.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})
export class CreateRequestComponent implements OnInit {
  requestForm: FormGroup;
  accounts: Account[] = [];
  success: string;
  errors: string[] = [];

  validateAmount(control: FormControl) {
    const sender = this.accounts.find(
      (account) => account.id === control.parent?.value.sender
    );
    const balance = sender ? sender.balance : 0;
    if (control.parent?.value.type == 'send' && control.value > balance!) {
      return {
        amountTooHigh: true,
      };
    }

    if (control.value < 0) {
      return {
        amountLessThanZero: true,
      };
    }
    return null;
  }

  constructor(
    private accountService: AccountService,
    private requestService: RequestsService,
    private notificationService: NotificationsService,
    private _snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      sender: ['', Validators.required],
      type: ['', Validators.required],
      recipient: ['', Validators.required],
      amount: ['', [Validators.required, this.validateAmount.bind(this)]],
    });

    this.accountService.getAccounts();
    this.accounts = this.accountService.fetchAccounts();
  }

  get sender() {
    return this.requestForm.get('sender');
  }

  get recipient() {
    return this.requestForm.get('recipient');
  }

  get type() {
    return this.requestForm.get('type');
  }

  get amount() {
    return this.requestForm.get('amount');
  }

  onSubmit() {
    console.log(this.requestForm.value);
    const sender = this.accounts.find(
      (account) => account.id === this.sender?.value
    );
    const type = this.type?.value;
    const amount = type == 'send' ? this.amount?.value : -this.amount?.value;
    const recipient = {
      username: this.recipient?.value,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    const request: Request = {
      amount: amount,
      status: { id: 1 },
      recipient: recipient,
      sender: sender
    };
    const notification: Notification = {
      user: recipient,
      status: { id: 1 },
    };

    this.requestService.createRequest(request).subscribe((reqId) => {
      if (reqId > 0) {
        notification.request = {id: reqId};
        this.notificationService
          .createNotification(notification)
          .subscribe((bool) => {
            if (bool) {
              this._snackbar.open('Success!', 'close', {duration: 5000});
              this.router.navigate(['/accounts'])
            } else {
              this.errors.push('error creating notification!');
            }
          });
      } else {
        this.errors.push('error creating request!');
      }
    });
  }
}
