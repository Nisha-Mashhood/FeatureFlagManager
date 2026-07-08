import { IOrganization } from "@/interfaces/models/i-organization";
import { IPaginationQuery } from "../common/i-pagination-query";

export interface IOrganizationRepository {
  create(organization: IOrganization): Promise<IOrganization>;

  findById(organizationId: string): Promise<IOrganization | null>;

  findByName(name: string): Promise<IOrganization | null>;

  findAll(query: IPaginationQuery): Promise<IOrganization[]>;

  count(search?: string): Promise<number>;
}
