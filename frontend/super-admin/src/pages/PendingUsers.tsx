import { useEffect, useState } from "react";

import {
    Button,
    message,
    Table,
    Typography,
} from "antd";

import axios from "axios";

import {
    approveUser,
    getPendingUsers,
    PendingUser,
} from "../services/user.service";

const { Title } = Typography;

const PendingUsers = () => {
    const [users, setUsers] =
        useState<PendingUser[]>([]);

    const [loading, setLoading] =
        useState(false);

    const fetchPendingUsers =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getPendingUsers();
                    console.log("Pending users",response);

                setUsers(
                    response.data,
                );
            } catch (error: unknown) {
                if (
                    axios.isAxiosError(
                        error,
                    )
                ) {
                    message.error(
                        error.response
                            ?.data
                            ?.message ??
                            "Failed to fetch pending users",
                    );
                } else {
                    message.error(
                        "Something went wrong",
                    );
                }
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove =
        async (
            userId: string,
        ) => {
            try {
                await approveUser(
                    userId,
                );

                message.success(
                    "User approved successfully",
                );

                fetchPendingUsers();
            } catch (
                error: unknown
            ) {
                if (
                    axios.isAxiosError(
                        error,
                    )
                ) {
                    message.error(
                        error.response
                            ?.data
                            ?.message ??
                            "Approval failed",
                    );
                } else {
                    message.error(
                        "Something went wrong",
                    );
                }
            }
        };

    return (
        <div
            style={{
                padding: 30,
            }}
        >
            <Title level={3}>
                Pending Users
            </Title>

            <Table
                rowKey="id"
                loading={loading}
                dataSource={users}
                columns={[
                    {
                        title: "Name",
                        dataIndex:
                            "name",
                    },
                    {
                        title: "Email",
                        dataIndex:
                            "email",
                    },
                    {
                        title:
                            "Organization",
                        dataIndex:
                            "organizationId",
                    },
                    {
                        title:
                            "Action",
                        render: (
                            record: PendingUser,
                        ) => (
                            <Button
                                type="primary"
                                onClick={() =>
                                    handleApprove(
                                        record.id,
                                    )
                                }
                            >
                                Approve
                            </Button>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default PendingUsers;