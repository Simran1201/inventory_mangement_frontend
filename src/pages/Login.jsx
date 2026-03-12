import { Form, Input, Button, Card, message } from "antd";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {

      const res = await loginUser(values);

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.role);

      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }

    } catch (error) {
        console.log('error: ', error);
      message.error("Login failed");
    }
  };

  return (
    <Card title="Login" style={{ width: 400, margin: "100px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>

      </Form>
    </Card>
  );
};

export default Login;