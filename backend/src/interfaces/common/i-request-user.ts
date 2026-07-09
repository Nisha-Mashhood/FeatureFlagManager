import { Role } from "@/constants/roles";

export interface IRequestUser {
    userId: string;
    role: Role;
    organizationId?: string;
}