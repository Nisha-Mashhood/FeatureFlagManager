import { Response } from "express";

import { STATUS_CODE } from "@/constants/status-codes";
import { IApiResponse } from "@/interfaces/common/i-api-response";

export abstract class AbstractController {

    protected ok<T>(
        res: Response,
        message: string,
        data?: T
    ): Response<IApiResponse<T>> {

        return res.status(STATUS_CODE.OK).json({
            success: true,
            message,
            data
        });
    }

    protected created<T>(
        res: Response,
        message: string,
        data?: T
    ): Response<IApiResponse<T>> {

        return res.status(STATUS_CODE.CREATED).json({
            success: true,
            message,
            data
        });
    }
}