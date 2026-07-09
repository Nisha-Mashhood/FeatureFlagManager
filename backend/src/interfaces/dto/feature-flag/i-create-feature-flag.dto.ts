import { Environment } from "@/constants/environment";

export interface ICreateFeatureFlagDto {
    name: string;

    key: string;

    description?: string;

    rolloutPercentage: number;

    environment: Environment;

    isEnabled: boolean;
}