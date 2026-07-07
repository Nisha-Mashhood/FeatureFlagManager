import { IUser } from "@/interfaces/models/i-user";
import { IUserRepository } from "@/interfaces/repositories/i-user-repository";
import { UserModel } from "@/models/user.model";

export class UserRepository implements IUserRepository {
    private readonly userModel = UserModel;

    public async create(
        user: IUser,
    ): Promise<IUser> {
        const createdUser = await this.userModel.create(user);

        return createdUser.toObject();
    }

    public async findById(
        userId: string,
    ): Promise<IUser | null> {
        return await this.userModel
            .findById(userId)
            .lean();
    }

    public async findByEmail(
        email: string,
    ): Promise<IUser | null> {
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
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                user,
                {
                    new: true,
                    runValidators: true,
                },
            )
            .lean();
    }
}