import { Router } from "express";
import { validateRequest } from "@/middlewares/validation.middleware";
import { AuthValidator } from "@/validators/auth.validators";
import { IAuthController } from "@/interfaces/controllers/i-auth-controller";
import { TYPES } from "@/di/identifiers";
import { resolve } from "@/di/resolver";

const authRouter = Router();

const authController =
    resolve<IAuthController>(
        TYPES.AuthController,
    );

authRouter.post(
    "/login",
    AuthValidator.login(),
    validateRequest,
    authController.login.bind(
        authController,
    ),
);

authRouter.post(
    "/signup",
    AuthValidator.signup(),
    validateRequest,
    authController.signup.bind(
        authController,
    ),
);

export default authRouter;