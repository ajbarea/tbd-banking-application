import { NotificationStatus } from "./NotificationStatus";
import { Request } from "./Request";
import { UserDetails } from "./UserDetails";

export interface Notification {
    id?: number;
    user?: UserDetails;
    request?:Request;
    status?: NotificationStatus;
}