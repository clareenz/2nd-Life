import React, { useEffect } from "react";
import { Button, Table } from "antd"; // Import Ant Design components
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
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
          <Button icon={<AiOutlineEye />} size="small" />
        </Link>
      ),
    },
    {
      title: "Delete",
      key: "Delete",
      width: 120,
      align: "center",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.id)}>
          <AiOutlineDelete size={20} />
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
        </div>
      )}
    </>
  );
};

export default AllProducts;
