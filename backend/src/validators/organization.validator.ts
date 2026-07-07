import { VALIDATION_MESSAGES } from "@/constants/validation-messages";
import { body, param, query } from "express-validator";

export class OrganizationValidator {
    public static createOrganization() {
        return [
            body("name")
                .trim()
                .notEmpty()
                .withMessage("Organization name is required.")
                .bail()
                .isLength({ min: 3, max: 50 })
                .withMessage(
                    VALIDATION_MESSAGES.ORGANIZATION_NAME_LENGTH,
                ),
        ];
    }

    public static getOrganizationById() {
        return [
            param("organizationId")
                .isMongoId()
                .withMessage(VALIDATION_MESSAGES.INVALID_ORGANIZATION_ID),
        ];
    }

    public static getOrganizations() {
        return [
            query("page")
                .optional()
                .isInt({ min: 1 })
                .withMessage(VALIDATION_MESSAGES.INVALID_PAGE),

            query("limit")
                .optional()
                .isInt({ min: 1, max: 100 })
                .withMessage(
                    VALIDATION_MESSAGES.INVALID_LIMIT,
                ),

            query("sortOrder")
                .optional()
                .isIn(["asc", "desc"])
                .withMessage(
                    VALIDATION_MESSAGES.INVALID_SORT_ORDER,
                ),
        ];
    }
}