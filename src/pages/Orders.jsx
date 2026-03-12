import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import api from "../api/axios";
import { getOrderDetails } from "../services/orderService";
import OrderDetailsModal from "../components/OrderDetailsModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await api.get("/orders/my-orders");
    setLoading(false);
    setOrders(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  const handleView = async (id) => {
    const data = await getOrderDetails(id);

    setSelectedOrder(data);

    setOpen(true);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Items",
      render: (_, record) => record.items.length,
    },
    {
      title: "Action",
      render: (_, record) => (
        <Button onClick={() => handleView(record._id)}>View</Button>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>Orders Listing</h2>
      </div>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
      <OrderDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        order={selectedOrder}
      />
    </>
  );
};

export default Orders;
