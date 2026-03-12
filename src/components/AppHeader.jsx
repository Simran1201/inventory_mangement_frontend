import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", padding: 10 }}
    >
      <h3>Inventory System</h3>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default AppHeader;
