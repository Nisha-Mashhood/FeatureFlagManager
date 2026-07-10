import { useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Switch } from "antd";

import { FeatureFlag, FeatureFlagDto } from "../services/feature-flag.service";

interface Props {
  open: boolean;
  loading: boolean;
  initialValues?: FeatureFlag | null;
  onCancel: () => void;
  onSubmit: (values: FeatureFlagDto) => void;
}

const FeatureFlagForm = ({
  open,
  loading,
  initialValues,
  onCancel,
  onSubmit,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;

    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        key: initialValues.key,
        description: initialValues.description,
        environment: initialValues.environment,
        rolloutPercentage: initialValues.rolloutPercentage,
        isEnabled: initialValues.isEnabled,
      });
    } else {
      form.resetFields();

      form.setFieldsValue({
        environment: "development",
        rolloutPercentage: 100,
        isEnabled: true,
      });
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      open={open}
      title={initialValues ? "Edit Feature Flag" : "Create Feature Flag"}
      footer={null}
      destroyOnClose
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Key"
          name="key"
          rules={[
            {
              required: true,
              message: "Key is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Environment"
          name="environment"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value="development">Development</Select.Option>

            <Select.Option value="staging">Staging</Select.Option>

            <Select.Option value="production">Production</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Rollout Percentage"
          name="rolloutPercentage"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Enabled" name="isEnabled" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          {initialValues ? "Update" : "Create"}
        </Button>
      </Form>
    </Modal>
  );
};

export default FeatureFlagForm;
