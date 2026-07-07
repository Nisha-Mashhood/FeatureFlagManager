import { Router } from "express";

import { dependencies } from "@/di/dependencies";
import { OrganizationValidator } from "@/validators/organization.validator";
import { validateRequest } from "@/middlewares/validation.middleware";

const organizationRouter = Router();

organizationRouter.post(
    "/",
     OrganizationValidator.createOrganization(),
        validateRequest,
    dependencies.organizationController.createOrganization.bind(
        dependencies.organizationController,
    ),
);

organizationRouter.get(
    "/",
    OrganizationValidator.getOrganizations(),
    validateRequest,
    dependencies.organizationController.getOrganizations.bind(
        dependencies.organizationController,
    ),
);

organizationRouter.get(
    "/:organizationId",
    OrganizationValidator.getOrganizationById(),
    validateRequest,
    dependencies.organizationController.getOrganizationById.bind(
        dependencies.organizationController,
    ),
);

export default organizationRouter;