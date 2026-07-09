import { Environment } from "@/constants/environment";

export interface IUpdateFeatureFlagDto {
    name?: string;

    description?: string;

    rolloutPercentage?: number;

    environment?: Environment;

    isEnabled?: boolean;
}