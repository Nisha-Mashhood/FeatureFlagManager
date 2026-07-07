import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { STATUS_CODE } from "@/constants/status-codes";

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(STATUS_CODE.BAD_REQUEST).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array(),
        });

        return;
    }

    next();
};