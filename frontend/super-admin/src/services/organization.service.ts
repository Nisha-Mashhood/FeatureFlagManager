import api from "../api/axios";

export interface Organization {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export interface OrganizationResponse {
    data: Organization[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

export const getOrganizations = async (
    page = 1,
    limit = 10,
    search = "",
) => {
    const response = await api.get("/organizations", {
        params: {
            page,
            limit,
            search,
        },
    });

    return response.data;
};

export const createOrganization = async (
    organization: {
        name: string;
        description: string;
    },
) => {
    const response = await api.post(
        "/organizations",
        organization,
    );

    return response.data;
};