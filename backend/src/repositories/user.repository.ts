import { ROLE } from "@/constants/roles";
import { IUser } from "@/interfaces/models/i-user";
import { IUserRepository } from "@/interfaces/repositories/i-user-repository";
import { UserModel } from "@/models/user.model";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
  private readonly userModel = UserModel;

  public async create(user: IUser): Promise<IUser> {
    user.email = user.email.toLowerCase().trim();
    const createdUser = await this.userModel.create(user);

    return createdUser.toObject();
  }

  public async findById(userId: string): Promise<IUser | null> {
    return await this.userModel.findById(userId).lean();
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel
      .findOne({
        email: email.toLowerCase().trim(),
      })
      .lean();
  }

  public async update(
    userId: string,
    user: Partial<IUser>,
  ): Promise<IUser | null> {
    if (user.email) {
      user.email = user.email.toLowerCase().trim();
    }
    return await this.userModel
      .findByIdAndUpdate(userId, user, {
        new: true,
        runValidators: true,
      })
      .lean();
  }

  public async findPendingUsers(): Promise<IUser[]> {
    return await this.userModel
      .find({
        role: ROLE.ORGANIZATION_ADMIN,
        isApproved: false,
      })
      .lean();
  }

  public async approveUser(userId: string): Promise<IUser | null> {
    return await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          isApproved: true,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .lean();
  }
}
