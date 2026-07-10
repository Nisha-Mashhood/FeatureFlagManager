import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Tag,
  Typography,
  message,
} from "antd";
import axios from "axios";

import { evaluateFeatureFlag } from "../services/feature-flag.service";

const { Title } = Typography;

interface Result {
  enabled: boolean;
  reason?: string;
}

interface FormValues {
  key: string;
}

const EvaluateFeature = () => {
  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<Result | null>(null);

  const onFinish = async (
    values: FormValues,
  ) => {
    try {
      setLoading(true);

      const response =
        await evaluateFeatureFlag(
          values.key,
        );

      setResult(response.data);
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error)
      ) {
        message.error(
          error.response?.data
            ?.message ??
            "Evaluation failed",
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      <Card
        title="Evaluate Feature Flag"
        style={{
          width: 500,
        }}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Feature Key"
            name="key"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="dark_mode" />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            block
          >
            Evaluate
          </Button>
        </Form>

        {result && (
          <div
            style={{
              marginTop: 30,
            }}
          >
            <Title level={4}>
              Result
            </Title>

            {result.enabled ? (
              <Tag color="green">
                ENABLED
              </Tag>
            ) : (
              <Tag color="red">
                DISABLED
              </Tag>
            )}

            {!result.enabled &&
              result.reason && (
                <p>
                  <strong>
                    Reason:
                  </strong>{" "}
                  {result.reason}
                </p>
              )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default EvaluateFeature;