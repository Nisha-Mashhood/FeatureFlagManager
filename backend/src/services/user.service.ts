import { inject, injectable } from "inversify";

import { TYPES } from "@/di/identifiers";

import { IUserRepository } from "@/interfaces/repositories/i-user-repository";
import { IUserService } from "@/interfaces/services/i-user-service";
import { IUser } from "@/interfaces/models/i-user";
import { IPendingUserDto } from "@/interfaces/dto/user/i-pending-user.dto";
import { STATUS_CODE } from "@/constants/status-codes";
import { USER_MESSAGES } from "@/constants/user-messages";
import { HttpError } from "@/errors/http-error";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  private mapPendingUser(user: IUser): IPendingUserDto {
    return {
      id: user._id!,
      name: user.name,
      email: user.email,
      organizationId: user.organizationId!,
    };
  }
  public async getPendingUsers(): Promise<IPendingUserDto[]> {
    const users = await this.userRepository.findPendingUsers();
    // console.log("Pending users :",users)
    return users.map((user) => this.mapPendingUser(user));
  }

  public async approveUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new HttpError(STATUS_CODE.NOT_FOUND, USER_MESSAGES.NOT_FOUND);
    }
    await this.userRepository.approveUser(userId);
  }
}
