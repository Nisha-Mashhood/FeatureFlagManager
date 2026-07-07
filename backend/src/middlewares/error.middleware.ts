import { NextFunction, Request, Response } from "express";

import { COMMON_MESSAGES } from "@/constants/api-messages";
import { STATUS_CODE } from "@/constants/status-codes";
import { HttpError } from "@/errors/http-error";
import { logger } from "@/utils/logger";

export const errorMiddleware = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): Response => {
    logger.error(error.message, error);

    if (error instanceof HttpError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: null,
        });
    }

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
    });
};