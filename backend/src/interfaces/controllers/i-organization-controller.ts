import { Request, Response, NextFunction } from "express";

export interface IOrganizationController {
    createOrganization(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    getOrganizationById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    getOrganizations(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;
}