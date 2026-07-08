import { Role } from "@/constants/roles";

export interface IAuthUserDto {
    id: string;

    name: string;

    email: string;

    role: Role;

    organizationId?: string;
}