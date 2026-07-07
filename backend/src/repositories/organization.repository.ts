import { FilterQuery } from "mongoose";

import { IOrganization } from "@/interfaces/models/i-organization";
import { IOrganizationRepository } from "@/interfaces/repositories/i-organization-repository";
import { OrganizationModel } from "@/models/organization.model";
import { IPaginationQuery } from "@/interfaces/common/i-pagination-query";

export class OrganizationRepository implements IOrganizationRepository {
    private readonly organizationModel = OrganizationModel;

    public async create(
        organization: IOrganization,
    ): Promise<IOrganization> {
        const createdOrganization =
            await this.organizationModel.create(organization);

        return createdOrganization.toObject();
    }

    public async findById(
        organizationId: string,
    ): Promise<IOrganization | null> {
        return await this.organizationModel
            .findById(organizationId)
            .lean();
    }

    public async findByName(
        name: string,
    ): Promise<IOrganization | null> {
        return await this.organizationModel
            .findOne({ name })
            .lean();
    }

    public async findAll(
        query: IPaginationQuery,
    ): Promise<IOrganization[]> {
        const {
            page,
            limit,
            search,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = query;

        const filter: FilterQuery<IOrganization> = {};

        if (search?.trim()) {
            filter.name = {
                $regex: search.trim(),
                $options: "i",
            };
        }

        return await this.organizationModel
            .find(filter)
            .sort({
                [sortBy]: sortOrder === "asc" ? 1 : -1,
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
    }

    public async count(
        search?: string,
    ): Promise<number> {
        const filter: FilterQuery<IOrganization> = {};

        if (search?.trim()) {
            filter.name = {
                $regex: search.trim(),
                $options: "i",
            };
        }

        return await this.organizationModel.countDocuments(filter);
    }
}