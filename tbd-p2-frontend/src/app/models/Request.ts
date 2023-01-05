import { Account } from "./Account";
import { RequestStatus } from "./RequestStatus";
import { UserDetails } from "./UserDetails";

export interface Request {
    id?:number;
    amount?:number;
    status?:RequestStatus;
    recipient?:UserDetails;
    sender?: Account;
}