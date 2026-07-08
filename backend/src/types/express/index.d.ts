import { IRequestUser } from "@/interfaces/common/i-request-user";

declare global {
    namespace Express {
        interface Request {
            user?: IRequestUser;
        }
    }
}

export {};