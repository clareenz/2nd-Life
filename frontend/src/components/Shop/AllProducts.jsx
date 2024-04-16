import { Button, Input, InputNumber, Modal, Table } from "antd"; // Import Ant Design components
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getAllProductsShop,
  updateProduct,
} from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState(0);
  const [editedProductStock, setEditedProductStock] = useState(0);

  const handleEdit = (record) => {
    setEditedProduct({ ...record, productId: record.id });
    setEditedProductName(record.name);
    setEditedProductPrice(record.discountPrice);
    setEditedProductStock(record.stock);
    setEditModalVisible(true);
  };

  const handleEditModalOk = async () => {
    const updatedProduct = {
      ...editedProduct,
      name: editedProductName,
      price: editedProductPrice,
      stock: editedProductStock,
    };
    await dispatch(updateProduct(updatedProduct.productId, updatedProduct)); // Wait for the update operation to complete
    setEditModalVisible(false);
    // Fetch the updated product list again after the update operation is completed
    dispatch(getAllProductsShop(seller._id));
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      title: "Product Id",
      dataIndex: "id",
      key: "id",
      width: 150,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 80,
      align: "center",
    },
    {
      title: "Sold out",
      dataIndex: "sold",
      key: "sold",
      width: 130,
      align: "center",
    },
    {
      title: "Preview",
      key: "Preview",
      width: 100,
      align: "center",
      render: (text, record) => (
        <Link to={`/product/${record.id}`}>
          <Button icon={<AiOutlineEye />} size={15} />
        </Link>
      ),
    },
    {
      title: "Edit",
      key: "Edit",
      width: 120,
      align: "center",
      render: (text, record) => (
        <Button onClick={() => handleEdit(record)}>
          <AiOutlineEdit size={15} />
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "Delete",
      width: 120,
      align: "center",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.id)}>
          <AiOutlineDelete size={15} />
        </Button>
      ),
    },
  ];

  // Check if products array is defined before mapping over it
  const data = products
    ? products.map((item) => ({
        id: item._id,
        name: item.name,
        price: "Php " + item.discountPrice,
        stock: item.stock,
        sold: 10,
      }))
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white rounded-xl shadow-md">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            style={{ scrollbarWidth: "none", overflowX: "auto" }}
          />
          <Modal
            title="Edit Product"
            visible={editModalVisible}
            onOk={handleEditModalOk}
            onCancel={handleEditModalCancel}
            okText="Save Changes"
            cancelText="Cancel"
            okButtonProps={{
              className: "custom-ok-button-class rounded-2xl",
            }}
            cancelButtonProps={{
              className: "custom-cancel-button-class rounded-2xl",
            }}
          >
            <div>
              <label htmlFor="productName">Product Name</label>
              <Input
                value={editedProductName}
                onChange={(e) => setEditedProductName(e.target.value)}
                placeholder="Product Name"
                className="custom-input rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Price">Price</label>
              <Input
                type="number"
                value={editedProductPrice}
                onChange={(e) => setEditedProductPrice(e.target.value)}
                placeholder="Product Price"
                style={{ width: "100%" }} // Adjust the width of the input number
                className="custom-input rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Stock">Stock</label>
              <Input
                type="number"
                value={editedProductStock}
                onChange={(e) => setEditedProductStock(e.target.value)}
                placeholder="Product Stock"
                style={{ width: "100%" }} // Adjust the width of the input number
                className="custom-input rounded-2xl"
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AllProducts;
