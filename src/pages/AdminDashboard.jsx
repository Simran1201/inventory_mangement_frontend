import { useEffect, useState } from "react";
import { Row, Col, Card, Table, Tag } from "antd";

import { getDashboardStats } from "../services/dashboardService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  const fetchStats = async () => {
    const data = await getDashboardStats();

    setStats(data);
    setOrders(data.recentOrders);
    setLowStock(data.lowStockProducts);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "_id",
    },
    {
      title: "User",
      render: (_, record) => record.user?.name,
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
    },
  ];

  const lowStockColumns = [
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Alert",
      render: () => <Tag color="red">Low Stock</Tag>,
    },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>Dashboard</h2>
      </div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card title="Total Users">
            <h2>{stats.totalUsers}</h2>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Total Products">
            <h2>{stats.totalProducts}</h2>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Total Orders">
            <h2>{stats.totalOrders}</h2>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Total Stock">
            <h2>{stats.totalStock}</h2>
          </Card>
        </Col>
      </Row>

      {/* Low Stock Products */}

      <Card title="Low Stock Products" style={{ marginBottom: 20 }}>
        <Table
          dataSource={lowStock}
          columns={lowStockColumns}
          rowKey="_id"
          pagination={false}
        />
      </Card>

      {/* Recent Orders */}

      <Card title="Recent Orders">
        <Table dataSource={orders} columns={orderColumns} rowKey="_id" />
      </Card>
    </div>
  );
};

export default AdminDashboard;
