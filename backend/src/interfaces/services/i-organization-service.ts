import { IPaginatedResponse } from "@/interfaces/common/i-paginated-response";
import { IPaginationQuery } from "@/interfaces/common/i-pagination-query";
import { IOrganization } from "@/interfaces/models/i-organization";

export interface IOrganizationService {
    createOrganization(
        organization: IOrganization,
    ): Promise<IOrganization>;

    getOrganizationById(
        organizationId: string,
    ): Promise<IOrganization>;

    getOrganizations(
        query: IPaginationQuery,
    ): Promise<IPaginatedResponse<IOrganization>>;
}