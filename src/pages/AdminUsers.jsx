import { useEffect, useState } from "react";
import { Table, Button, Tag, message } from "antd";

import { getUsers, deleteUser } from "../services/userService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);

    message.success("User deleted");

    fetchUsers();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      render: (_, record) =>
        record.role === "admin" ? (
          <Tag color="blue">Admin</Tag>
        ) : (
          <Tag>User</Tag>
        ),
    },
    {
      title: "Joined",
      render: (_, record) => new Date(record.createdAt).toLocaleDateString(),
    },
    {
      title: "Action",
      render: (_, record) =>
        record.role !== "admin" && (
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
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
        <h2 style={{ margin: 0 }}>User Listing</h2>
      </div>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
      ;
    </>
  );
};

export default AdminUsers;
