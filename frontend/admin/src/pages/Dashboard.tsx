import { Button, Card, message, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import axios from "axios";

const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();

      message.success(response.message);

      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Logout failed");
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 80,
      }}
    >
      <Card style={{ width: 500, margin: "80px auto" }}>
        <Title level={3}>Organization Dashboard</Title>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button
            type="primary"
            block
            onClick={() => navigate("/feature-flags")}
          >
            Feature Flags
          </Button>

          <Button danger block onClick={handleLogout}>
            Logout
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Dashboard;
