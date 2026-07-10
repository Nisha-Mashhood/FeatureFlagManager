import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { signup } from "../services/auth.service";
import {
  getOrganizations,
  Organization,
} from "../services/organization.service";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  organizationId: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const fetchOrganizations = async () => {
    try {
      const response = await getOrganizations();
    //   console.log("Full Response:", response);
    //   console.log("Response Data:", response.data);
    //   console.log("Organizations:", response.data.data);

      setOrganizations(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const onFinish = async (values: SignupForm) => {
    try {
        console.log("Form Submitted");
    console.log(values);
      const response = await signup(values);

      message.success(response.message);

      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Signup failed");
      } else {
        message.error("Something went wrong");
      }
    }
  };

  console.log("Organizations State:", organizations);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title="Organization Admin Signup"
        style={{
          width: 450,
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            key='name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            key='email'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            key='password'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Organization"
            name="organizationId"
            key= 'organizationid'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Organization">
              {organizations.map((organization) => (
                <Select.Option key={organization._id} value={organization._id}>
                  {organization.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button htmlType="submit" type="primary" block>
            Register
          </Button>

          <Button type="link" block onClick={() => navigate("/")}>
            Already have an account? Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
