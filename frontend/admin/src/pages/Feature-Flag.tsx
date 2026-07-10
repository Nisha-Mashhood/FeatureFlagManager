import { useEffect, useState } from "react";
import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import axios from "axios";

import FeatureFlagForm from "../components/FeatureFlagForm";

import {
  FeatureFlag,
  FeatureFlagDto,
  createFeatureFlag,
  deleteFeatureFlag,
  getFeatureFlags,
  updateFeatureFlag,
} from "../services/feature-flag.service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

const FeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [selectedFeatureFlag, setSelectedFeatureFlag] =
    useState<FeatureFlag | null>(null);

  const fetchFeatureFlags = async () => {
    try {
      setLoading(true);

      const response = await getFeatureFlags();

      setFeatureFlags(response.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(
          error.response?.data?.message ?? "Failed to fetch feature flags",
        );
      } else {
        message.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatureFlags();
  }, []);

  const handleSubmit = async (values: FeatureFlagDto) => {
    try {
      setSubmitLoading(true);

      if (selectedFeatureFlag) {
        const response = await updateFeatureFlag(
          selectedFeatureFlag.id,
          values,
        );

        message.success(response.message);
      } else {
        const response = await createFeatureFlag(values);

        message.success(response.message);
      }

      setSelectedFeatureFlag(null);
      setOpen(false);

      fetchFeatureFlags();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Operation failed");
      } else {
        message.error("Something went wrong");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteFeatureFlag(id);

      message.success(response.message);

      fetchFeatureFlags();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Delete failed");
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <div
      style={{
        padding: 30,
      }}
    >
      <Title level={3}>Feature Flags</Title>

      <Button
        type="primary"
        style={{
          marginBottom: 20,
        }}
        onClick={() => {
          setSelectedFeatureFlag(null);

          setOpen(true);
        }}
      >
        Create Feature Flag
      </Button>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={featureFlags}
        columns={[
          {
            title: "#",
            render: (_value, _record, index) => index + 1,
          },
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Key",
            dataIndex: "key",
          },
          {
            title: "Environment",
            dataIndex: "environment",
            render: (environment: string) => {
              const color =
                environment === "production"
                  ? "green"
                  : environment === "staging"
                    ? "orange"
                    : "blue";

              return <Tag color={color}>{environment.toUpperCase()}</Tag>;
            },
          },
          {
            title: "Rollout %",
            dataIndex: "rolloutPercentage",
          },
          {
            title: "Enabled",
            dataIndex: "isEnabled",
            render: (value: boolean) =>
              value ? (
                <Tag color="green">Enabled</Tag>
              ) : (
                <Tag color="red">Disabled</Tag>
              ),
          },
          {
            title: "Actions",
            render: (record: FeatureFlag) => (
              <Space>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setSelectedFeatureFlag(record);

                    setOpen(true);
                  }}
                >
                  Edit
                </Button>

                <Popconfirm
                  title="Delete Feature Flag?"
                  description="Are you sure you want to delete this feature flag?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <FeatureFlagForm
        open={open}
        loading={submitLoading}
        initialValues={selectedFeatureFlag}
        onCancel={() => {
          setSelectedFeatureFlag(null);
          setOpen(false);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FeatureFlags;
