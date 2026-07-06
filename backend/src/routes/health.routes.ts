import { COMMON_MESSAGES } from "@/constants/api-messages";
import { STATUS_CODE } from "@/constants/status-codes";
import { Request, Response, Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_req: Request, res: Response) => {
    return res.status(STATUS_CODE.OK).json({
        success: true,
        message: COMMON_MESSAGES.API_RUNNING,
    });
});

export default healthRouter;