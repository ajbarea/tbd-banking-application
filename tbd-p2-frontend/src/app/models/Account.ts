import { AccountType } from './AccountType';
import { UserDetails } from './UserDetails';

export interface Account {
    id?: string;
    name?: string;
    user?: UserDetails;
    balance?: number;
    type?: AccountType;

}