import { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Space,
    Table,
    Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

import {
    createOrganization,
    getOrganizations,
    Organization,
} from "../services/organization.service";

const { Title } = Typography;

const Organizations = () => {
    const [organizations, setOrganizations] =
        useState<Organization[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [open, setOpen] =
        useState(false);

    const [form] = Form.useForm();

    const fetchOrganizations = async () => {
        try {
            setLoading(true);

            const response =
                await getOrganizations(
                    1,
                    50,
                );

            setOrganizations(
                response.data.data,
            );
        } catch (error: unknown) {
            if (
                axios.isAxiosError(error)
            ) {
                message.error(
                    error.response?.data
                        ?.message ??
                        "Failed to fetch organizations",
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
        fetchOrganizations();
    }, []);

    const onFinish = async (
        values: {
            name: string;
            description: string;
        },
    ) => {
        try {
            await createOrganization(
                values,
            );

            message.success(
                "Organization created successfully",
            );

            form.resetFields();

            setOpen(false);

            fetchOrganizations();
        } catch (error: unknown) {
            if (
                axios.isAxiosError(error)
            ) {
                message.error(
                    error.response?.data
                        ?.message ??
                        "Failed to create organization",
                );
            } else {
                message.error(
                    "Something went wrong",
                );
            }
        }
    };

    const columns: ColumnsType<Organization> =
        [
            {
                title: "Name",
                dataIndex: "name",
            },
            {
                title: "Description",
                dataIndex:
                    "description",
            },
            {
                title: "Created At",
                dataIndex:
                    "createdAt",
                render: (
                    value: string,
                ) =>
                    new Date(
                        value,
                    ).toLocaleDateString(),
            },
        ];

    return (
        <div
            style={{
                padding: 30,
            }}
        >
            <Space
                style={{
                    width: "100%",
                    justifyContent:
                        "space-between",
                    marginBottom: 20,
                }}
            >
                <Title level={3}>
                    Organizations
                </Title>

                <Button
                    type="primary"
                    onClick={() =>
                        setOpen(true)
                    }
                >
                    Create Organization
                </Button>
            </Space>

            <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={
                    organizations
                }
                pagination={false}
            />

            <Modal
                title="Create Organization"
                open={open}
                footer={null}
                onCancel={() =>
                    setOpen(false)
                }
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={
                        onFinish
                    }
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter organization name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter description",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={3}
                        />
                    </Form.Item>

                    <Button
                        htmlType="submit"
                        type="primary"
                        block
                    >
                        Create
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default Organizations;