import { Account } from "./Account";
import { TransactionStatus } from "./TransactionStatus";
import { TransactionType } from "./TransactionType";

export interface Transaction {
    id?: number;
    account?: Account;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    category: string;
    description: string;
    date?: number;
    merchantName: string;
}