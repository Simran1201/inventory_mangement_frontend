import { Layout, Menu, Button } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const adminMenu = [
    { key: "/admin", label: "Dashboard" },
    { key: "/admin/products", label: "Products" },
    { key: "/admin/orders", label: "Orders" },
    { key: "/admin/users", label: "Users" },
    { key: "/profile", label: "Profile" },
  ];

  const userMenu = [
    { key: "/products", label: "Products" },
    { key: "/orders", label: "My Orders" },
    { key: "/profile", label: "Profile" },
  ];

  const menuItems = role === "admin" ? adminMenu : userMenu;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ color: "white", padding: 16, fontSize: 18 }}>
          Inventory System
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={[location.pathname]}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#fff",
            alignItems: "center",
          }}
        >
          <h1></h1>

          <Button danger onClick={logout}>
            Logout
          </Button>
        </Header>

        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
