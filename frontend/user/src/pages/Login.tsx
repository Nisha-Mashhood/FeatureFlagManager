import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth.service";
import axios from "axios";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    try {
      const response = await login(values);

      message.success(response.message);

      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Login failed");
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="User Login" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
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
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button htmlType="submit" type="primary" block>
            Login
          </Button>
          Don't have an account? 
          <Button type="link" onClick={() => navigate("/signup")}>
            Create Account
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
