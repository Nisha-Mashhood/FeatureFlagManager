import { Router } from "express";

import { container } from "@/di/container";
import { TYPES } from "@/di/identifiers";

import { IUserController } from "@/interfaces/controllers/i-user-controller";

import { UserValidator } from "@/validators/user.validator";
import { validateRequest } from "@/middlewares/validation.middleware";
import { authenticate } from "@/middlewares/auth.middleware";
import { authorize } from "@/middlewares/authorize.middleware";
import { ROLE } from "@/constants/roles";

const userRouter = Router();

const userController =
    container.get<IUserController>(
        TYPES.UserController,
    );

userRouter.get(
    "/pending",
    authenticate,
    authorize(ROLE.SUPER_ADMIN),
    UserValidator.getPendingUsers(),
    validateRequest,
    userController.getPendingUsers.bind(userController),
);

userRouter.patch(
    "/:userId/approve",
    authenticate,
    authorize(ROLE.SUPER_ADMIN),
    UserValidator.approveUser(),
    validateRequest,
    userController.approveUser.bind(userController),
);

export default userRouter;