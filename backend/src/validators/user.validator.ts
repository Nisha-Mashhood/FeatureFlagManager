import { VALIDATION_MESSAGES } from "@/constants/validation-messages";
import { param } from "express-validator";


export class UserValidator {
    public static getPendingUsers() {
    return [];
}

public static approveUser() {
    return [
        param("userId")
            .isMongoId()
            .withMessage(
                VALIDATION_MESSAGES.INVALID_USER_ID,
            ),
    ];
}
}