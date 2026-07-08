import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

import { TYPES } from "@/di/identifiers";
import { AbstractController } from "@/controllers/abstract-controller";

import { IUserController } from "@/interfaces/controllers/i-user-controller";
import { IUserService } from "@/interfaces/services/i-user-service";

import { USER_MESSAGES } from "@/constants/user-messages";

@injectable()
export class UserController
    extends AbstractController
    implements IUserController
{
    constructor(
        @inject(TYPES.UserService)
        private readonly userService: IUserService,
    ) {
        super();
    }

    public async getPendingUsers(
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const users =
                await this.userService.getPendingUsers();

            this.ok(
                res,
                users,
                USER_MESSAGES.PENDING_FETCHED,
            );
        } catch (error) {
            next(error);
        }
    }

    public async approveUser(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const userId = String(req.params.userId);
        try {
            await this.userService.approveUser(
                userId,
            );

            this.ok(
                res,
                undefined,
                USER_MESSAGES.APPROVED,
            );
        } catch (error) {
            next(error);
        }
    }
}