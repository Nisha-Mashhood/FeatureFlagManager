import { inject, injectable } from "inversify";

import { TYPES } from "@/di/identifiers";

import { IFeatureFlagService } from "@/interfaces/services/i-feature-flag-service";

import { IFeatureFlagRepository } from "@/interfaces/repositories/i-feature-flag-repository";
import { IOrganizationRepository } from "@/interfaces/repositories/i-organization-repository";
import { IFeatureFlag } from "@/interfaces/models/i-feature-flag";
import { IFeatureFlagResponseDto } from "@/interfaces/dto/feature-flag/i-feature-flag-response.dto";
import { HttpError } from "@/errors/http-error";
import { STATUS_CODE } from "@/constants/status-codes";
import { ORGANIZATION_MESSAGES } from "@/constants/organization-message";
import { FEATURE_FLAG_MESSAGES } from "@/constants/faeture-flag-messages";
import { ICreateFeatureFlagDto } from "@/interfaces/dto/feature-flag/i-create-feature-flag.dto";
import { Types } from "mongoose";
import { IPaginationQuery } from "@/interfaces/common/i-pagination-query";
import { IPaginatedResponse } from "@/interfaces/common/i-paginated-response";
import { IUpdateFeatureFlagDto } from "@/interfaces/dto/feature-flag/i-update-feature-flag.dto";
import { IFeatureFlagEvaluationDto } from "@/interfaces/dto/feature-flag/i-feature-flag-evaluation.dto";
import { env } from "@/config/env";
import { FEATURE_FLAG_EVALUATION_REASON } from "@/constants/feature-flag-evaluation-mesages";

@injectable()
export class FeatureFlagService implements IFeatureFlagService {
  constructor(
    @inject(TYPES.FeatureFlagRepository)
    private readonly featureFlagRepository: IFeatureFlagRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  private mapToResponseDto(featureFlag: IFeatureFlag): IFeatureFlagResponseDto {
    return {
      id: featureFlag._id!,
      name: featureFlag.name,
      key: featureFlag.key,
      description: featureFlag.description,
      isEnabled: featureFlag.isEnabled,
      rolloutPercentage: featureFlag.rolloutPercentage,
      environment: featureFlag.environment,
    };
  }

  private async ensureOrganizationExists(
    organizationId: string,
  ): Promise<void> {
    const organization =
      await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new HttpError(
        STATUS_CODE.NOT_FOUND,
        ORGANIZATION_MESSAGES.NOT_FOUND,
      );
    }
  }

  private async ensureKeyIsUnique(
    organizationId: string,
    key: string,
  ): Promise<void> {
    const featureFlag = await this.featureFlagRepository.findByKey(
      organizationId,
      key,
    );

    if (featureFlag) {
      throw new HttpError(
        STATUS_CODE.CONFLICT,
        FEATURE_FLAG_MESSAGES.KEY_ALREADY_EXISTS,
      );
    }
  }

  public async createFeatureFlag(
    organizationId: string,
    createdBy: string,
    createFeatureFlagDto: ICreateFeatureFlagDto,
  ): Promise<IFeatureFlagResponseDto> {
    await this.ensureOrganizationExists(organizationId);

    await this.ensureKeyIsUnique(organizationId, createFeatureFlagDto.key);

    const featureFlag = await this.featureFlagRepository.create({
      ...createFeatureFlagDto,
      organizationId: new Types.ObjectId(organizationId),
      createdBy: new Types.ObjectId(createdBy),
    });

    return this.mapToResponseDto(featureFlag);
  }

  private async ensureFeatureFlagExists(
    featureFlagId: string,
  ): Promise<IFeatureFlag> {
    const featureFlag =
      await this.featureFlagRepository.findById(featureFlagId);

    if (!featureFlag) {
      throw new HttpError(
        STATUS_CODE.NOT_FOUND,
        FEATURE_FLAG_MESSAGES.NOT_FOUND,
      );
    }

    return featureFlag;
  }

  public async getFeatureFlags(
    organizationId: string,
    query: IPaginationQuery,
  ): Promise<IPaginatedResponse<IFeatureFlagResponseDto>> {
    const featureFlags = await this.featureFlagRepository.findAll(
      organizationId,
      query,
    );

    const totalCount = await this.featureFlagRepository.count(
      organizationId,
      query.search,
    );

    return {
      data: featureFlags.map((featureFlag) =>
        this.mapToResponseDto(featureFlag),
      ),

      currentPage: query.page,

      pageSize: query.limit,

      totalCount,

      totalPages: Math.ceil(totalCount / query.limit),
    };
  }

  public async getFeatureFlagById(
    featureFlagId: string,
  ): Promise<IFeatureFlagResponseDto> {
    const featureFlag = await this.ensureFeatureFlagExists(featureFlagId);

    return this.mapToResponseDto(featureFlag);
  }

  public async updateFeatureFlag(
    featureFlagId: string,
    updateFeatureFlagDto: IUpdateFeatureFlagDto,
  ): Promise<IFeatureFlagResponseDto> {
    await this.ensureFeatureFlagExists(featureFlagId);

    const updatedFeatureFlag = await this.featureFlagRepository.update(
      featureFlagId,
      updateFeatureFlagDto,
    );

    if (!updatedFeatureFlag) {
      throw new HttpError(
        STATUS_CODE.NOT_FOUND,
        FEATURE_FLAG_MESSAGES.NOT_FOUND,
      );
    }

    return this.mapToResponseDto(updatedFeatureFlag);
  }

  public async deleteFeatureFlag(featureFlagId: string): Promise<void> {
    await this.ensureFeatureFlagExists(featureFlagId);

    await this.featureFlagRepository.delete(featureFlagId);
  }

  private getUserBucket(userId: string): number {
    let hash = 0;

    for (const character of userId) {
      hash += character.charCodeAt(0);
    }

    return hash % 100;
  }

  public async evaluateFeatureFlag(
    organizationId: string,
    userId: string,
    key: string,
  ): Promise<IFeatureFlagEvaluationDto> {
    const featureFlag = await this.featureFlagRepository.findByKey(
      organizationId,
      key,
    );

    if (!featureFlag) {
      return {
        enabled: false,
        reason: FEATURE_FLAG_EVALUATION_REASON.FEATURE_NOT_FOUND,
      };
    }

    if (!featureFlag.isEnabled) {
      return {
        enabled: false,
        reason: FEATURE_FLAG_EVALUATION_REASON.FEATURE_DISABLED,
      };
    }

    if (featureFlag.environment !== env.NODE_ENV) {
      return {
        enabled: false,
        reason: FEATURE_FLAG_EVALUATION_REASON.ENVIRONMENT_MISMATCH,
      };
    }

    const bucket = this.getUserBucket(userId);

    if (bucket >= featureFlag.rolloutPercentage) {
      return {
        enabled: false,
        reason: FEATURE_FLAG_EVALUATION_REASON.ROLLOUT_EXCLUDED,
      };
    }

    return {
      enabled: true,
    };
  }
}
