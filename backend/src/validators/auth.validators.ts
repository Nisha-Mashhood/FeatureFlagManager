import { body } from "express-validator";

import { VALIDATION_MESSAGES } from "@/constants/validation-messages";

export class AuthValidator {
    public static login() {
        return [
            body("email")
                .trim()
                .notEmpty()
                .withMessage(
                    VALIDATION_MESSAGES.EMAIL_REQUIRED,
                )
                .bail()
                .isEmail()
                .withMessage(
                    VALIDATION_MESSAGES.INVALID_EMAIL,
                ),

            body("password")
                .notEmpty()
                .withMessage(
                    VALIDATION_MESSAGES.PASSWORD_REQUIRED,
                ),
        ];
    }

    public static signup() {
        return [
            body("name")
                .trim()
                .notEmpty()
                .withMessage(
                    VALIDATION_MESSAGES.NAME_REQUIRED,
                )
                .bail()
                .isLength({ min: 3, max: 50 })
                .withMessage(
                    VALIDATION_MESSAGES.NAME_LENGTH,
                ),

            body("email")
                .trim()
                .notEmpty()
                .withMessage(
                    VALIDATION_MESSAGES.EMAIL_REQUIRED,
                )
                .bail()
                .isEmail()
                .withMessage(
                    VALIDATION_MESSAGES.INVALID_EMAIL,
                ),

            body("password")
                .notEmpty()
                .withMessage(
                    VALIDATION_MESSAGES.PASSWORD_REQUIRED,
                )
                .bail()
                .isLength({ min: 8 })
                .withMessage(
                    VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH,
                ),

            body("organizationId")
                .notEmpty()
                .withMessage(
                    VALIDATION_MESSAGES.ORGANIZATION_ID_REQUIRED,
                )
                .bail()
                .isMongoId()
                .withMessage(
                    VALIDATION_MESSAGES.INVALID_ORGANIZATION_ID,
                ),
        ];
    }
}