import { NextFunction, Request, Response } from "express";

import { Role } from "@/constants/roles";
import { STATUS_CODE } from "@/constants/status-codes";
import { AUTH_MESSAGES } from "@/constants/auth-messages";

export const authorize =
    (...roles: Role[]) =>
    (
        req: Request,
        res: Response,
        next: NextFunction,
    ): void => {
        if (!req.user) {
            res.status(STATUS_CODE.UNAUTHORIZED).json({
                success: false,
                message: AUTH_MESSAGES.UNAUTHORIZED,
            });

            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(STATUS_CODE.FORBIDDEN).json({
                success: false,
                message: AUTH_MESSAGES.FORBIDDEN,
            });

            return;
        }

        next();
    };