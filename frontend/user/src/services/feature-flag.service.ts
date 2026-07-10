import api from "../api/axios";

export const evaluateFeatureFlag = async (
    key: string,
) => {
    const response = await api.get(
        `/feature-flags/evaluate/${key}`,
    );

    return response.data;
};