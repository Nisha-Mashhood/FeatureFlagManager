import { body, param, query, ValidationChain } from "express-validator";

export class FeatureFlagValidator {
  public static createFeatureFlag(): ValidationChain[] {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Feature flag name is required.")
        .isLength({ min: 3, max: 50 })
        .withMessage("Feature flag name must be between 3 and 50 characters."),

      body("key")
        .trim()
        .notEmpty()
        .withMessage("Feature flag key is required.")
        .matches(/^[a-z0-9-_]+$/)
        .withMessage(
          "Feature flag key can only contain lowercase letters, numbers, underscore and hyphens.",
        ),

      body("rolloutPercentage")
        .isInt({
          min: 0,
          max: 100,
        })
        .withMessage("Rollout percentage must be between 0 and 100."),

      body("environment")
        .isIn(["development", "staging", "production"])
        .withMessage("Invalid environment."),

      body("isEnabled").isBoolean().withMessage("isEnabled must be a boolean."),
    ];
  }

  public static getFeatureFlags(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }),

      query("limit").optional().isInt({ min: 1 }),

      query("search").optional().isString(),

      query("sortBy").optional().isString(),

      query("sortOrder").optional().isIn(["asc", "desc"]),
    ];
  }

  public static getFeatureFlagById(): ValidationChain[] {
    return [
      param("featureFlagId")
        .isMongoId()
        .withMessage("Invalid feature flag id."),
    ];
  }

  public static updateFeatureFlag(): ValidationChain[] {
    return [
      param("featureFlagId")
        .isMongoId()
        .withMessage("Invalid feature flag id."),

      body("name").optional().trim().isLength({ min: 3, max: 50 }),

      body("description").optional().trim(),

      body("rolloutPercentage").optional().isInt({
        min: 0,
        max: 100,
      }),

      body("environment")
        .optional()
        .isIn(["development", "staging", "production"]),

      body("isEnabled").optional().isBoolean(),
    ];
  }

  public static deleteFeatureFlag(): ValidationChain[] {
    return [
      param("featureFlagId")
        .isMongoId()
        .withMessage("Invalid feature flag id."),
    ];
  }

  public static evaluateFeatureFlag(): ValidationChain[] {
    return [
      param("key")
        .trim()
        .notEmpty()
        .withMessage("Feature flag key is required."),
    ];
  }
}
