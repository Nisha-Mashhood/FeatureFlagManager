import { IPaginatedResponse } from "@/interfaces/common/i-paginated-response";
import { IPaginationQuery } from "@/interfaces/common/i-pagination-query";

import { ICreateFeatureFlagDto } from "@/interfaces/dto/feature-flag/i-create-feature-flag.dto";
import { IUpdateFeatureFlagDto } from "@/interfaces/dto/feature-flag/i-update-feature-flag.dto";
import { IFeatureFlagResponseDto } from "@/interfaces/dto/feature-flag/i-feature-flag-response.dto";
import { IFeatureFlagEvaluationDto } from "@/interfaces/dto/feature-flag/i-feature-flag-evaluation.dto";

export interface IFeatureFlagService {
    createFeatureFlag(
        organizationId: string,
        createdBy: string,
        createFeatureFlagDto: ICreateFeatureFlagDto,
    ): Promise<IFeatureFlagResponseDto>;

    getFeatureFlags(
        organizationId: string,
        query: IPaginationQuery,
    ): Promise<
        IPaginatedResponse<IFeatureFlagResponseDto>
    >;

    getFeatureFlagById(
        featureFlagId: string,
    ): Promise<IFeatureFlagResponseDto>;

    updateFeatureFlag(
        featureFlagId: string,
        updateFeatureFlagDto: IUpdateFeatureFlagDto,
    ): Promise<IFeatureFlagResponseDto>;

    deleteFeatureFlag(
        featureFlagId: string,
    ): Promise<void>;

    evaluateFeatureFlag(
    organizationId: string,
    userId: string,
    key: string,
): Promise<IFeatureFlagEvaluationDto>;

}