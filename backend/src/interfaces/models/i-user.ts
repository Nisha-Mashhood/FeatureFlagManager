import { Role } from "@/constants/roles";

export interface IUser {
    _id?: string;

    name: string;

    email: string;

    password: string;

    role: Role;

    isApproved: boolean;

    organizationId?: string;

    createdAt?: Date;

    updatedAt?: Date;
}