import { Router } from "express";

import { container } from "@/di/container";
import { TYPES } from "@/di/identifiers";

import { authenticate } from "@/middlewares/auth.middleware";
import { authorize } from "@/middlewares/authorize.middleware";
import { validateRequest } from "@/middlewares/validation.middleware";

import { ROLE } from "@/constants/roles";

import { IFeatureFlagController } from "@/interfaces/controllers/i-feature-flag-controller";

import { FeatureFlagValidator } from "@/validators/feature-flag.validator";

const featureFlagRouter = Router();

const featureFlagController = container.get<IFeatureFlagController>(
  TYPES.FeatureFlagController,
);

featureFlagRouter.post(
  "/",
  authenticate,
  authorize(ROLE.ORGANIZATION_ADMIN),
  FeatureFlagValidator.createFeatureFlag(),
  validateRequest,
  featureFlagController.createFeatureFlag.bind(featureFlagController),
);

featureFlagRouter.get(
  "/",
  authenticate,
  authorize(ROLE.ORGANIZATION_ADMIN),
  FeatureFlagValidator.getFeatureFlags(),
  validateRequest,
  featureFlagController.getFeatureFlags.bind(featureFlagController),
);

featureFlagRouter.get(
  "/evaluate/:key",
  authenticate,
  authorize(ROLE.END_USER),
  FeatureFlagValidator.evaluateFeatureFlag(),
  validateRequest,
  featureFlagController.evaluateFeatureFlag.bind(featureFlagController),
);

featureFlagRouter.get(
  "/:featureFlagId",
  authenticate,
  authorize(ROLE.ORGANIZATION_ADMIN),
  FeatureFlagValidator.getFeatureFlagById(),
  validateRequest,
  featureFlagController.getFeatureFlagById.bind(featureFlagController),
);

featureFlagRouter.patch(
  "/:featureFlagId",
  authenticate,
  authorize(ROLE.ORGANIZATION_ADMIN),
  FeatureFlagValidator.updateFeatureFlag(),
  validateRequest,
  featureFlagController.updateFeatureFlag.bind(featureFlagController),
);

featureFlagRouter.delete(
  "/:featureFlagId",
  authenticate,
  authorize(ROLE.ORGANIZATION_ADMIN),
  FeatureFlagValidator.deleteFeatureFlag(),
  validateRequest,
  featureFlagController.deleteFeatureFlag.bind(featureFlagController),
);

export default featureFlagRouter;
