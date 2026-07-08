import { IPendingUserDto } from "../dto/user/i-pending-user.dto";

export interface IUserService {
    getPendingUsers(): Promise<IPendingUserDto[]>;

    approveUser(
        userId: string,
    ): Promise<void>;
}