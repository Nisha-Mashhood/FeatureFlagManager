import { IPaginationQuery } from "@/interfaces/common/i-pagination-query";
import { IFeatureFlag } from "@/interfaces/models/i-feature-flag";

export interface IFeatureFlagRepository {
    create(
        featureFlag: IFeatureFlag,
    ): Promise<IFeatureFlag>;

    findById(
        featureFlagId: string,
    ): Promise<IFeatureFlag | null>;

    findByKey(
        organizationId: string,
        key: string,
    ): Promise<IFeatureFlag | null>;

    findAll(
        organizationId: string,
        query: IPaginationQuery,
    ): Promise<IFeatureFlag[]>;

    count(
        organizationId: string,
        search?: string,
    ): Promise<number>;

    update(
        featureFlagId: string,
        featureFlag: Partial<IFeatureFlag>,
    ): Promise<IFeatureFlag | null>;

    delete(
        featureFlagId: string,
    ): Promise<void>;
}