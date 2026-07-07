import { IOrganization } from "@/interfaces/models/i-organization";
import { IPaginatedResponse } from "@/interfaces/common/i-paginated-response";
import { IPaginationQuery } from "@/interfaces/common/i-pagination-query";
import { IOrganizationRepository } from "@/interfaces/repositories/i-organization-repository";
import { IOrganizationService } from "@/interfaces/services/i-organization-service";
import { HttpError } from "@/errors/http-error";
import { STATUS_CODE } from "@/constants/status-codes";
import { ORGANIZATION_MESSAGES } from "@/constants/organization-message";

export class OrganizationService implements IOrganizationService {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  public async createOrganization(
    organization: IOrganization,
  ): Promise<IOrganization> {
    const existingOrganization = await this.organizationRepository.findByName(
      organization.name,
    );

    if (existingOrganization) {
      throw new HttpError(
        STATUS_CODE.CONFLICT,
        ORGANIZATION_MESSAGES.ALREADY_EXISTS,
      );
    }

    return await this.organizationRepository.create(organization);
  }

  public async getOrganizationById(
    organizationId: string,
  ): Promise<IOrganization> {
    const organization =
      await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new HttpError(
        STATUS_CODE.NOT_FOUND,
        ORGANIZATION_MESSAGES.NOT_FOUND,
      );
    }

    return organization;
  }

  public async getOrganizations(
    query: IPaginationQuery,
  ): Promise<IPaginatedResponse<IOrganization>> {
    const organizations = await this.organizationRepository.findAll(query);

    const totalCount = await this.organizationRepository.count(query.search);

    return {
      data: organizations,
      currentPage: query.page,
      pageSize: query.limit,
      totalCount,
      totalPages: Math.ceil(totalCount / query.limit),
    };
  }
}
