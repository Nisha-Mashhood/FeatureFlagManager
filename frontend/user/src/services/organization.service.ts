import api from "../api/axios";

export interface Organization {
    _id: string;
    name: string;
}

export const getOrganizations = async () => {
    const response = await api.get("/organizations", {
        params: {
            page: 1,
            limit: 100,
        },
    });

    return response.data;
};