import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "@/constants/status-codes";
import { AUTH_MESSAGES } from "@/constants/auth-messages";

import { JwtUtil } from "@/utils/jwt.util";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            res.status(STATUS_CODE.UNAUTHORIZED).json({
                success: false,
                message: AUTH_MESSAGES.UNAUTHORIZED,
            });

            return;
        }

        const payload =
            JwtUtil.verifyAccessToken(token);

        req.user = payload;

        next();
    } catch {
        res.status(STATUS_CODE.UNAUTHORIZED).json({
            success: false,
            message: AUTH_MESSAGES.UNAUTHORIZED,
        });
    }
};