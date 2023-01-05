import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { Account } from 'src/app/models/Account';
import { Request } from 'src/app/models/Request';
import { Transaction } from 'src/app/models/Transaction';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RequestsService } from 'src/app/services/requests.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  request: Request;
  accounts: Account[] = [];
  isAccept: boolean = false;
  requestForm: FormGroup;

  constructor(
    private rServe: RequestsService,
    private aServe: AccountService,
    private tServe: TransactionsService,
    private nServe: NotificationsService,
    private authServe: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.rServe.getRequest(Number(id)).subscribe((request) => {
          if ( this.authServe.getLoggedInUser() == request.recipient?.username) {
            this.request = request;
          } else {
            this.router.navigate(['/']);
            this._snackbar.open("That's not yours!", 'close', {duration: 5000});
          }
        });
      }
    });
    this.aServe.getAccounts();
    this.requestForm = this.fb.group({
      account: ['', Validators.required],
    });
  }

  abs(amount: number) {
    return Math.abs(amount);
  }

  onAccept() {
    this.isAccept = true;
    this.accounts = this.aServe.fetchAccounts();
  }

  onDeny() {
    this.rServe.updateRequest(this.request).subscribe(() => {
      this.nServe.fetchNotifications();
      this.router.navigate(['/accounts']);
    });
  }

  onSubmit() {
    console.log(this.requestForm.value);

    const account = this.accounts.find(
      (account) => account.id == this.requestForm.value.account
    );
    console.log({
      ...account,
      balance: account!.balance! + this.request.amount!,
    });

    const request$ = this.rServe.updateRequest(this.request);
    const to$ = this.aServe.update({
      ...account,
      balance: account!.balance! + this.request.amount!,
    });

    const fromAccount = this.request.sender;
    console.log({
      ...fromAccount,
      balance: fromAccount!.balance! - this.request.amount!,
    });

    const from$ = this.aServe.update({
      ...fromAccount,
      balance: fromAccount!.balance! - this.request.amount!,
    });

    const transactionFrom: Transaction = {
      account: { id: fromAccount!.id },
      amount: -this.request!.amount!,
      type: { id: 5 },
      status: { id: 2 },
      category: 'Transfer',
      description: `Transfer from ${account!.user!.username!}`,
      merchantName: 'TBD Bank',
    };

    console.log(transactionFrom);
    const transactionTo: Transaction = {
      account: { id: account!.id },
      amount: this.request!.amount!,
      type: { id: 5 },
      status: { id: 2 },
      category: 'Transfer',
      description: `Transfer to ${fromAccount!.user!.username}`,
      merchantName: 'TBD Bank',
    };
    console.log(transactionTo);

    forkJoin([request$, from$, to$])
      .pipe(
        switchMap(([request, from, to]) => {
          const transactionFrom$ =
            this.tServe.createTransaction(transactionFrom);
          const transactionTo$ = this.tServe.createTransaction(transactionTo);
          return forkJoin([transactionFrom$, transactionTo$]);
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.aServe.getAccounts();
        this.nServe.fetchNotifications();
        this._snackbar.open('Success!', 'close', {duration: 5000});
        this.router.navigate(['/accounts']);
      });
  }
}
