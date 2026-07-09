import { NextFunction, Request, Response } from "express";

export interface IFeatureFlagController {
  createFeatureFlag(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  getFeatureFlags(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  getFeatureFlagById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  updateFeatureFlag(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  deleteFeatureFlag(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  evaluateFeatureFlag(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
