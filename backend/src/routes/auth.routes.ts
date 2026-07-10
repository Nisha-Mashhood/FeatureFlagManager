import { Router } from "express";
import { validateRequest } from "@/middlewares/validation.middleware";
import { AuthValidator } from "@/validators/auth.validators";
import { IAuthController } from "@/interfaces/controllers/i-auth-controller";
import { TYPES } from "@/di/identifiers";
import { resolve } from "@/di/resolver";
import { authenticate } from "@/middlewares/auth.middleware";

const authRouter = Router();

const authController = resolve<IAuthController>(TYPES.AuthController);

authRouter.post(
  "/login",
  AuthValidator.login(),
  validateRequest,
  authController.login.bind(authController),
);

authRouter.post(
  "/signup",
  AuthValidator.signup(),
  validateRequest,
  authController.signupOrganizationAdmin.bind(authController),
);

authRouter.post(
  "/end-user/signup",
  AuthValidator.signup(),
  validateRequest,
  authController.signupEndUser.bind(authController),
);

authRouter.post("/logout", authController.logout.bind(authController));

authRouter.get("/me", authenticate, authController.me.bind(authController));

export default authRouter;
