import { Role } from "@/constants/roles";


export interface IJwtPayload {
    userId: string;
    role: Role;
}