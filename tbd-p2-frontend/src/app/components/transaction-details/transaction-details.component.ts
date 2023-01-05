import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  transaction: Transaction;

  constructor(
    private transactionService: TransactionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.transactionService
        .getTransactionById(Number(params.get('id')))
        .subscribe((transaction) => {
          this.transaction = transaction
        });
    });
  }
}
