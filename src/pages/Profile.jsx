import { Card, Button, Avatar, Descriptions, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCurrentUser } from "../services/userService";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return <Spin />;

  return (
    <Card style={{ maxWidth: 600 }} title="User Profile">
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar size={80} icon={<UserOutlined />} />
        <h2>{user?.name}</h2>
      </div>

      <Descriptions column={1} bordered>
        <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>

        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>

        <Descriptions.Item label="Role">{user?.role}</Descriptions.Item>

        <Descriptions.Item label="Joined">
          {new Date(user?.createdAt).toLocaleDateString()}
        </Descriptions.Item>
      </Descriptions>

      <Button danger type="primary" style={{ marginTop: 20 }} onClick={logout}>
        Logout
      </Button>
    </Card>
  );
};

export default Profile;
