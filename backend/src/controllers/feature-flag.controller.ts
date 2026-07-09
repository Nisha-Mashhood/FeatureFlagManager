import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { TYPES } from "@/di/identifiers";

import { AbstractController } from "@/controllers/abstract-controller";

import { IFeatureFlagController } from "@/interfaces/controllers/i-feature-flag-controller";
import { IFeatureFlagService } from "@/interfaces/services/i-feature-flag-service";
import { IPaginationQuery } from "@/interfaces/common/i-pagination-query";

import { FEATURE_FLAG_MESSAGES } from "@/constants/faeture-flag-messages";

@injectable()
export class FeatureFlagController
  extends AbstractController
  implements IFeatureFlagController
{
  constructor(
    @inject(TYPES.FeatureFlagService)
    private readonly featureFlagService: IFeatureFlagService,
  ) {
    super();
  }

  public async createFeatureFlag(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const organizationId = String(req.user?.organizationId);

      const createdBy = req.user!.userId;

      const featureFlag = await this.featureFlagService.createFeatureFlag(
        organizationId,
        createdBy,
        req.body,
      );

      this.created(res, featureFlag, FEATURE_FLAG_MESSAGES.CREATED);
    } catch (error) {
      next(error);
    }
  }

  public async getFeatureFlags(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const organizationId = String(req.user?.organizationId);

      const paginationQuery: IPaginationQuery = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search as string | undefined,
        sortBy: req.query.sortBy as string | undefined,
        sortOrder: (req.query.sortOrder as "asc" | "desc") ?? "desc",
      };

      const featureFlags = await this.featureFlagService.getFeatureFlags(
        organizationId,
        paginationQuery,
      );

      this.ok(res, featureFlags, FEATURE_FLAG_MESSAGES.FETCHED);
    } catch (error) {
      next(error);
    }
  }

  public async getFeatureFlagById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const featureFlag = await this.featureFlagService.getFeatureFlagById(
        String(req.params.featureFlagId),
      );

      this.ok(res, featureFlag, FEATURE_FLAG_MESSAGES.DETAILS_FETCHED);
    } catch (error) {
      next(error);
    }
  }

  public async updateFeatureFlag(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const featureFlag = await this.featureFlagService.updateFeatureFlag(
        String(req.params.featureFlagId),
        req.body,
      );

      this.ok(res, featureFlag, FEATURE_FLAG_MESSAGES.UPDATED);
    } catch (error) {
      next(error);
    }
  }

  public async deleteFeatureFlag(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.featureFlagService.deleteFeatureFlag(
        String(req.params.featureFlagId),
      );

      this.ok(res, undefined, FEATURE_FLAG_MESSAGES.DELETED);
    } catch (error) {
      next(error);
    }
  }

  public async evaluateFeatureFlag(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const organizationId = req.user!.organizationId!;

      const result = await this.featureFlagService.evaluateFeatureFlag(
        organizationId,
        req.user!.userId,
        String(req.params.key),
      );

      this.ok(res, result, "Feature evaluated successfully.");
    } catch (error) {
      next(error);
    }
  }
}
