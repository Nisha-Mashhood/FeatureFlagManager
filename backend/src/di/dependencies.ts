import { OrganizationController } from "@/controllers/organization.controller";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { OrganizationService } from "@/services/organization-service";


const organizationRepository = new OrganizationRepository();

const organizationService = new OrganizationService(
    organizationRepository,
);

const organizationController = new OrganizationController(
    organizationService,
);

export const dependencies = {
    organizationController,
};