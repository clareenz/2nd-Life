import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Input, InputNumber } from "antd";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct, updateProduct } from "../../redux/actions/product";
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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleEdit = (record) => {
    setEditedProduct({ ...record, productId: record.id });
    setEditedProductName(record.name);
    setEditedProductPrice(record.price);
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
    await dispatch(updateProduct(updatedProduct.productId, updatedProduct));
    setEditModalVisible(false);
    dispatch(getAllProductsShop(seller._id));
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleDelete = async (id) => {
    setDeleteModalVisible(true);
    setProductIdToDelete(id);
  };

  const handleDeleteConfirmed = async () => {
    await dispatch(deleteProduct(productIdToDelete));
    dispatch(getAllProductsShop(seller._id));
    setDeleteModalVisible(false);
  };

  const handleDeleteCanceled = () => {
    setDeleteModalVisible(false);
  };

  const columns = [
    { title: "Product Id", dataIndex: "id", key: "id", width: 150, align: "center" },
    { title: "Name", dataIndex: "name", key: "name", width: 180, align: "center" },
    { title: "Price", dataIndex: "price", key: "price", width: 100, align: "center" },
    { title: "Stock", dataIndex: "stock", key: "stock", width: 80, align: "center" },
    { title: "Status", dataIndex: "sold", key: "sold", width: 130, align: "center" },
    {
      title: "Action",
      key: "action",
      width: 200,
      align: "center",
      render: (text, record) => (
        <>
          <Link to={`/product/${record.id}`} style={{ marginRight: 8 }}>
            <Button icon={<AiOutlineEye />} size={15} />
          </Link>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            <AiOutlineEdit size={15} />
          </Button>
          <Button onClick={() => handleDelete(record.id)}>
            <AiOutlineDelete size={15} />
          </Button>
        </>
      ),
    },
  ];

  const data = products
    ? products.map((item) => ({
        id: item._id,
        name: item.name,
        price: `Php ${item.discountPrice}`,
        stock: item.stock,
        sold: "in-stock", // Change this to the actual sold out quantity property
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
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Price">Price</label>
              <Input
                type="number"
                value={editedProductPrice}
                onChange={(e) => setEditedProductPrice(e.target.value)}
                placeholder="Product Price"
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Stock">Stock</label>
              <Input
                type="number"
                value={editedProductStock}
                onChange={(e) => setEditedProductStock(e.target.value)}
                placeholder="Product Stock"
                style={{ width: "100%" }}
              />
            </div>
          </Modal>
          <Modal
            title="Confirm Deletion"
            visible={deleteModalVisible}
            onOk={handleDeleteConfirmed}
            onCancel={handleDeleteCanceled}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className: "custom-ok-button-class rounded-2xl",
              style: { backgroundColor: "#006665", color: "#fff" }, // Add this style
            }}
            cancelButtonProps={{
              className: "custom-cancel-button-class rounded-2xl",
            }}
          >
            <p>Are you sure you want to delete this product?</p>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AllProducts;
