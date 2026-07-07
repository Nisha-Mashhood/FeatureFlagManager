import { Response } from "express";

import { STATUS_CODE } from "@/constants/status-codes";
import { IApiResponse } from "@/interfaces/common/i-api-response";

export abstract class AbstractController {
    protected ok<T>(
        res: Response,
        data: T,
        message: string,
    ): Response<IApiResponse<T>> {
        return res.status(STATUS_CODE.OK).json({
            success: true,
            message,
            data,
        });
    }

    protected created<T>(
        res: Response,
        data: T,
        message: string,
    ): Response<IApiResponse<T>> {
        return res.status(STATUS_CODE.CREATED).json({
            success: true,
            message,
            data,
        });
    }

    protected noContent(
        res: Response,
    ): Response {
        return res.status(STATUS_CODE.NO_CONTENT).send();
    }
}