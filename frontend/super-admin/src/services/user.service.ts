import api from "../api/axios";

export interface PendingUser {
    id: string;
    name: string;
    email: string;
    organizationId: string;
}

export const getPendingUsers = async () => {
    const response = await api.get(
        "/users/pending",
    );

    return response.data;
};

export const approveUser = async (
    userId: string,
) => {
    const response = await api.patch(
        `/users/${userId}/approve`,
    );

    return response.data;
};