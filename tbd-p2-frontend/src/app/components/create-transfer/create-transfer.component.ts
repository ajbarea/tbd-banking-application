import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { Account } from 'src/app/models/Account';
import { Transaction } from 'src/app/models/Transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.scss'],
})
export class CreateTransferComponent implements OnInit {
  transferForm: FormGroup;
  accounts: Account[] = [];

  validateAmount(control: FormControl) {
    const sender = this.accounts.find(
      (account) => account.id === control.parent?.value.sender
    );
    const balance = sender ? sender.balance : 0;
    if (control.value > balance!) {
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
    private transactionService: TransactionsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      sender: ['', Validators.required],
      recipient: ['', Validators.required],
      amount: ['', [Validators.required, this.validateAmount.bind(this)]],
    });

    this.accountService.getAccounts();
    this.accounts = this.accountService.fetchAccounts();
  }

  get sender() {
    return this.transferForm.get('sender');
  }

  get recipient() {
    return this.transferForm.get('recipient');
  }

  get amount() {
    return this.transferForm.get('amount');
  }

  disableChosen(control: AbstractControl, accountId: string): boolean {
    if (control == this.sender) {
      return accountId == control.parent?.value.recipient;
    }
    return accountId == control.parent?.value.sender;
  }

  onSubmit() {
    const sender = this.accounts.find(
      (account) => account.id === this.sender?.value
    );
    const recipient = this.accounts.find(
      (account) => account.id === this.recipient?.value
    );
    const amount = this.amount?.value;
    if (sender && recipient && sender.id != recipient.id) {
      if (sender.balance! > amount) {
        const transactionFrom: Transaction = {
          account: { id: sender.id },
          amount: -amount,
          type: { id: 5 },
          status: { id: 2 },
          category: 'Transfer',
          description: `Transfer to ${recipient.name}`,
          merchantName: 'TBD Bank',
        };
        const transactionTo: Transaction = {
          account: { id: recipient.id },
          amount: amount,
          type: { id: 5 },
          status: { id: 2 },
          category: 'Transfer',
          description: `Transfer from ${sender.name}`,
          merchantName: 'TBD Bank',
        };

        const from$ = this.accountService.update({
          ...sender,
          balance: sender.balance! - amount,
        });
        const to$ = this.accountService.update({
          ...recipient,
          balance: recipient.balance! + amount,
        });

        forkJoin([from$, to$])
          .pipe(
            switchMap(([from, to]) => {
              const transactionFrom$ =
                this.transactionService.createTransaction(transactionFrom);
              const transactionTo$ =
                this.transactionService.createTransaction(transactionTo);
              return forkJoin([transactionFrom$, transactionTo$]);
            })
          )
          .subscribe((res) => {
            console.log(res);
            this.accountService.getAccounts();
            this._snackbar.open('Success!', 'close', {duration: 5000});
            this.router.navigate(['/accounts']);
          });
      }
    }
  }
}
