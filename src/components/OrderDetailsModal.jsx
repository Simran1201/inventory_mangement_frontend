import { Modal, Table } from "antd";

const OrderDetailsModal = ({ open, onClose, order }) => {
  const columns = [
    {
      title: "Product",
      render: (_, record) => record.product?.name,
    },
    {
      title: "Price",
      render: (_, record) => record.product?.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Subtotal",
      render: (_, record) => record.quantity * record.product?.price,
    },
  ];

  return (
    <Modal
      title="Order Details"
      open={open}
      footer={null}
      onCancel={onClose}
      width={700}
    >
      <p>
        <b>Order ID:</b> {order?._id}
      </p>

      {order?.user && (
        <p>
          <b>User:</b> {order.user.name}
        </p>
      )}

      <Table
        dataSource={order?.items}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      <h3 style={{ marginTop: 20 }}>Total: ${order?.totalPrice}</h3>
    </Modal>
  );
};

export default OrderDetailsModal;
