import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  InputNumber,
  message,
  Tag,
  Descriptions,
} from "antd";

import { getProducts } from "../services/productService";
import { placeOrder } from "../services/orderService";
import { ProductDetailModal } from "../components/ProductDetailModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const openOrderModal = (product) => {
    if (product.stock === 0) {
      message.warning("Product is out of stock");
      return;
    }

    setSelectedProduct(product);
    setOpen(true);
  };

  const openDetailModal = (product) => {
    console.log("product: ", product);
    setDetailProduct(product);
    setDetailOpen(true);
  };

  const handleOrder = async () => {
    try {
      await placeOrder({
        items: [
          {
            product: selectedProduct._id,
            quantity,
          },
        ],
      });

      message.success("Order placed successfully");

      setOpen(false);

      fetchProducts();
    } catch (error) {
      console.log("error: ", error);
      message.error("Order failed");
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
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

        return <Tag color="green">Available</Tag>;
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => openDetailModal(record)}
          >
            View
          </Button>

          <Button
            type="primary"
            disabled={record.stock === 0}
            onClick={() => openOrderModal(record)}
          >
            Order
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
      </div>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleOrder}
        title="Place Order"
      >
        <p>{selectedProduct?.name}</p>

        <InputNumber
          min={1}
          value={quantity}
          onChange={(val) => setQuantity(val)}
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

export default ProductList;
