import { Environment } from "@/constants/environment";

export interface IFeatureFlagResponseDto {
    id: string;

    name: string;

    key: string;

    description?: string;

    isEnabled: boolean;

    rolloutPercentage: number;

    environment: Environment;
}