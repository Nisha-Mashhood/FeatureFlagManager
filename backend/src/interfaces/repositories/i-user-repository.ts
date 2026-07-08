import { IUser } from "@/interfaces/models/i-user";

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;

  findById(userId: string): Promise<IUser | null>;

  findByEmail(email: string): Promise<IUser | null>;

  update(userId: string, user: Partial<IUser>): Promise<IUser | null>;

  findPendingUsers(): Promise<IUser[]>;

  approveUser(userId: string): Promise<IUser | null>;
}
