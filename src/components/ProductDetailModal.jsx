import { Descriptions, Modal, Tag } from "antd";

export const ProductDetailModal = ({ open, onClose, product }) => {
  return (
    <Modal open={open} footer={null} onCancel={onClose} title="Product Details">
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Name">{product?.name}</Descriptions.Item>

        <Descriptions.Item label="Description">
          {product?.description || "No description"}
        </Descriptions.Item>

        <Descriptions.Item label="Price">${product?.price}</Descriptions.Item>

        <Descriptions.Item label="Stock">{product?.stock}</Descriptions.Item>

        <Descriptions.Item label="Status">
          {product?.lowStock ? (
            <Tag color="red">Low Stock</Tag>
          ) : (
            <Tag color="green">Available</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};
