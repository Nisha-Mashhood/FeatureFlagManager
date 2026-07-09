import { injectable } from "inversify";
import { FilterQuery } from "mongoose";

import { FeatureFlagModel } from "@/models/feature-flag.model";

import { IFeatureFlag } from "@/interfaces/models/i-feature-flag";
import { IFeatureFlagRepository } from "@/interfaces/repositories/i-feature-flag-repository";
import { IPaginationQuery } from "@/interfaces/common/i-pagination-query";

@injectable()
export class FeatureFlagRepository
    implements IFeatureFlagRepository
{
    private readonly featureFlagModel = FeatureFlagModel;

    public async create(
        featureFlag: IFeatureFlag,
    ): Promise<IFeatureFlag> {
        const createdFeatureFlag =
            await this.featureFlagModel.create(featureFlag);

        return createdFeatureFlag.toObject();
    }

    public async findById(
        featureFlagId: string,
    ): Promise<IFeatureFlag | null> {
        return await this.featureFlagModel
            .findById(featureFlagId)
            .lean();
    }

    public async findByKey(
        organizationId: string,
        key: string,
    ): Promise<IFeatureFlag | null> {
        return await this.featureFlagModel
            .findOne({
                organizationId,
                key: key.toLowerCase().trim(),
            })
            .lean();
    }

    public async findAll(
        organizationId: string,
        query: IPaginationQuery,
    ): Promise<IFeatureFlag[]> {
        const {
            page,
            limit,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = query;

        const filter = this.buildFilter(
            organizationId,
            query.search,
        );

        return await this.featureFlagModel
            .find(filter)
            .sort({
                [sortBy]:
                    sortOrder === "asc" ? 1 : -1,
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
    }

    public async count(
        organizationId: string,
        search?: string,
    ): Promise<number> {
        const filter = this.buildFilter(
            organizationId,
            search,
        );

        return await this.featureFlagModel.countDocuments(
            filter,
        );
    }

    public async update(
        featureFlagId: string,
        featureFlag: Partial<IFeatureFlag>,
    ): Promise<IFeatureFlag | null> {
        if (featureFlag.key) {
            featureFlag.key =
                featureFlag.key.toLowerCase().trim();
        }

        return await this.featureFlagModel
            .findByIdAndUpdate(
                featureFlagId,
                featureFlag,
                {
                    new: true,
                    runValidators: true,
                },
            )
            .lean();
    }

    public async delete(
        featureFlagId: string,
    ): Promise<void> {
        await this.featureFlagModel.findByIdAndDelete(
            featureFlagId,
        );
    }

    private buildFilter(
        organizationId: string,
        search?: string,
    ): FilterQuery<IFeatureFlag> {
        const filter: FilterQuery<IFeatureFlag> = {
            organizationId,
        };

        if (search?.trim()) {
            filter.$or = [
                {
                    name: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
                {
                    key: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
            ];
        }

        return filter;
    }
}