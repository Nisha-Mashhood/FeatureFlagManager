import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "@/constants/status-codes";
import { COMMON_MESSAGES } from "@/constants/api-messages";

export const notFoundMiddleware = (
    _req: Request,
    res: Response,
    _next: NextFunction,
): Response => {
    return res.status(STATUS_CODE.NOT_FOUND).json({
        success: false,
        message: COMMON_MESSAGES.ROUTE_NOT_FOUND,
    });
};