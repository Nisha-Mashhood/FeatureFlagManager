import { Router } from "express";
import { OrganizationValidator } from "@/validators/organization.validator";
import { validateRequest } from "@/middlewares/validation.middleware";
import { IOrganizationController } from "@/interfaces/controllers/i-organization-controller";
import { TYPES } from "@/di/identifiers";
import { resolve } from "@/di/resolver";
import { authenticate } from "@/middlewares/auth.middleware";
import { authorize } from "@/middlewares/authorize.middleware";
import { ROLE } from "@/constants/roles";

const organizationRouter = Router();

const organizationController =
    resolve<IOrganizationController>(
        TYPES.OrganizationController,
    );

organizationRouter.post(
    "/",
    authenticate,
    authorize(ROLE.SUPER_ADMIN),
     OrganizationValidator.createOrganization(),
        validateRequest,
    organizationController.createOrganization.bind(
        organizationController,
    ),
);

organizationRouter.get(
    "/",
    OrganizationValidator.getOrganizations(),
    validateRequest,
    organizationController.getOrganizations.bind(
        organizationController,
    ),
);

organizationRouter.get(
    "/:organizationId",
    OrganizationValidator.getOrganizationById(),
    validateRequest,
    organizationController.getOrganizationById.bind(
        organizationController,
    ),
);

export default organizationRouter;