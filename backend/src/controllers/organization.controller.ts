import { NextFunction, Request, Response } from "express";
import { AbstractController } from "@/controllers/abstract-controller";
import { IOrganizationController } from "@/interfaces/controllers/i-organization-controller";
import { IOrganizationService } from "@/interfaces/services/i-organization-service";
import { ORGANIZATION_MESSAGES } from "@/constants/organization-message";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/identifiers";

@injectable()
export class OrganizationController
    extends AbstractController
    implements IOrganizationController {

    constructor(
        @inject(TYPES.OrganizationService)
        private readonly organizationService: IOrganizationService,
    ) {
        super();
    }

    public async createOrganization(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const organization =
                await this.organizationService.createOrganization(req.body);

            this.created(
                res,
                organization,
                ORGANIZATION_MESSAGES.CREATED,
            );
        } catch (error) {
            next(error);
        }
    }

    public async getOrganizationById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const organizationId = String(req.params.organizationId);
        try {
            const organization =
                await this.organizationService.getOrganizationById(
                    organizationId,
                );

            this.ok(
                res,
                organization,
                ORGANIZATION_MESSAGES.DETAILS_FETCHED,
            );
        } catch (error) {
            next(error);
        }
    }

    public async getOrganizations(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const paginationQuery = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: req.query.search as string | undefined,
            sortBy: req.query.sortBy as string | undefined,
            sortOrder:
                (req.query.sortOrder as "asc" | "desc") ?? "desc",
        };
        try {
            const organizations = await this.organizationService.getOrganizations(paginationQuery,);

            this.ok(
                res,
                organizations,
                ORGANIZATION_MESSAGES.FETCHED,
            );
        } catch (error) {
            next(error);
        }
    }
}