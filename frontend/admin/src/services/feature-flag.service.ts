import api from "../api/axios";

export interface FeatureFlag {
    id: string;
    name: string;
    key: string;
    description?: string;
    environment: string;
    rolloutPercentage: number;
    isEnabled: boolean;
}

export interface FeatureFlagDto {
    name: string;
    key: string;
    description?: string;
    environment: string;
    rolloutPercentage: number;
    isEnabled: boolean;
}

export const getFeatureFlags = async () => {
    const response = await api.get("/feature-flags", {
        params: {
            page: 1,
            limit: 100,
        },
    });

    return response.data;
};

export const createFeatureFlag = async (
    data: FeatureFlagDto,
) => {
    const response = await api.post(
        "/feature-flags",
        data,
    );

    return response.data;
};

export const getFeatureFlagById = async (
    id: string,
) => {
    const response = await api.get(
        `/feature-flags/${id}`,
    );

    return response.data;
};

export const updateFeatureFlag = async (
    id: string,
    data: FeatureFlagDto,
) => {
    const response = await api.patch(
        `/feature-flags/${id}`,
        data,
    );

    return response.data;
};

export const deleteFeatureFlag = async (
    id: string,
) => {
    const response = await api.delete(
        `/feature-flags/${id}`,
    );

    return response.data;
};