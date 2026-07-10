import { Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { logout } from "../services/auth.service";

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();

      message.success(response.message);

      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(
          error.response?.data?.message ??
            "Logout failed",
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
        padding: 40,
      }}
    >
      <Card>
        <Title level={2}>
          End User Dashboard
        </Title>

        <Paragraph>
          Welcome to the Feature Flag Evaluation Portal.
        </Paragraph>

        <Button
          type="primary"
          onClick={() =>
            navigate("/evaluate")
          }
          style={{
            marginRight: 10,
          }}
        >
          Evaluate Feature
        </Button>

        <Button
          danger
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default Dashboard;