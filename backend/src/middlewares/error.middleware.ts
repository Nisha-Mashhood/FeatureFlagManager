import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "@/constants/status-codes";
import { COMMON_MESSAGES } from "@/constants/api-messages";
import { logger } from "@/utils/logger";

export const errorMiddleware = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): Response => {
    logger.error(error.message, error);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
    });
};