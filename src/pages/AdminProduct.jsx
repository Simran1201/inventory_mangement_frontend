import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Tag,
} from "antd";

import { getProducts } from "../services/productService";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/adminProductService";
import { ProductDetailModal } from "../components/ProductDetailModal";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [form] = Form.useForm();
  const [stockOpen, setStockOpen] = useState(false);
  const [stockProduct, setStockProduct] = useState(null);
  const [stockQty, setStockQty] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setLoading(false);
    setProducts(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    setEditingProduct(product);

    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }

    setOpen(true);
  };
  const openDetailModal = (product) => {
    console.log("product: ", product);
    setDetailProduct(product);
    setDetailOpen(true);
  };
  const openStockModal = (product) => {
    setStockProduct(product);
    setStockQty(1);
    setStockOpen(true);
  };
  const handleAddStock = async () => {
    try {
      const updatedStock = stockProduct.stock + stockQty;

      await updateProduct(stockProduct._id, {
        ...stockProduct,
        stock: updatedStock,
      });

      message.success("Stock updated");

      setStockOpen(false);

      fetchProducts();
    } catch (error) {
      console.log("error: ", error);
      message.error("Failed to update stock");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingProduct) {
        const updatedStock = editingProduct.stock + (values.addStock || 0);

        const payload = {
          name: values.name,
          description: values.description,
          price: values.price,
          stock: updatedStock,
        };

        await updateProduct(editingProduct._id, payload);

        message.success("Product updated");
      } else {
        await createProduct(values);

        message.success("Product created");
      }

      setOpen(false);
      fetchProducts();
    } catch (error) {
      console.log("error: ", error);
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);

    message.success("Product deleted");

    fetchProducts();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stocks",
      dataIndex: "stock",
    },
    {
      title: "Alert",
      render: (_, record) => {
        if (record.stock === 0) {
          return <Tag color="red">Out of Stock</Tag>;
        }

        if (record.lowStock) {
          return <Tag color="orange">Low Stock</Tag>;
        }

        return <Tag color="green">Ok</Tag>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => openDetailModal(record)}
          >
            View
          </Button>

          <Button style={{ marginRight: 8 }} onClick={() => openModal(record)}>
            Edit
          </Button>

          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => openStockModal(record)}
          >
            Add Stock
          </Button>

          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
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
        <h2 style={{ margin: 0 }}>Product Listing</h2>

        <Button type="primary" onClick={() => openModal()}>
          Add Product
        </Button>
      </div>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          {editingProduct && (
            <Form.Item label="Current Stock">
              <InputNumber
                value={editingProduct?.stock}
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}

          {editingProduct ? (
            <Form.Item label="Add More Stock" name="addStock">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          ) : (
            <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        open={stockOpen}
        title={`Add Stock - ${stockProduct?.name}`}
        onCancel={() => setStockOpen(false)}
        onOk={handleAddStock}
      >
        <p>Current Stock: {stockProduct?.stock}</p>

        <InputNumber
          min={1}
          value={stockQty}
          style={{ width: "100%" }}
          onChange={(val) => setStockQty(val)}
        />
      </Modal>
      <ProductDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        product={detailProduct}
      />
    </>
  );
};

export default AdminProduct;
