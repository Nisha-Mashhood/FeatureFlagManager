import { NextFunction, Request, Response } from "express";

export interface IUserController {
    getPendingUsers(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    approveUser(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;
}