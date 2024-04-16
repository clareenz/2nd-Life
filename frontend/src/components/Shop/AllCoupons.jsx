import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd"; // Import Ant Design components
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { message } from "antd";

const { Option } = Select;

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [isCreateHovered, setIsCreateHovered] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        message.success("Coupon code deleted successfully!");
        setCoupons(coupons.filter((coupon) => coupon._id !== id)); // Update state after deletion
      })
      .catch((error) => {
        message.error("Failed to delete coupon code!");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        message.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const columns = [
    { title: "Id", dataIndex: "id", key: "id", maxWidth: 100, align: "center" },
    {
      title: "Coupon Code",
      dataIndex: "name",
      key: "name",
      maxWidth: 100,
      align: "center",
    },
    {
      title: "Value",
      dataIndex: "price",
      key: "price",
      minWidth: 100,
      align: "center",
    },
    {
      title: "",
      key: "action",
      minWidth: 100,
      align: "center",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.id)}>
          <AiOutlineDelete size={15} />
        </Button>
      ),
    },
  ];

  const data = coupons.map((item) => ({
    id: item._id,
    name: item.name,
    price: `${item.value} %`,
    sold: 10,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white rounded-xl shadow-md">
          <div className="w-full flex justify-between">
            <h1 className="text-2xl px-4 py-3">Coupons</h1>
            <div
              className={`${styles.button6} m-5 bg-[#FF8474] text-white hover:bg-[#FC9A8E]`}
              onClick={() => setOpen(true)}
            >
              <span className=" p-1 text-sm">Create Coupon Code</span>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
            />
          </div>
          <Modal
            title="Create Coupon Code"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
          >
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="mb-3">
                <label>
                  <span className="text-red-500">*</span>Name
                </label>
                <Input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your coupon code name..."
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>
                  <span className="text-red-500">*</span> Discount Percentage
                </label>
                <Input
                  type="text"
                  name="value"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter your coupon code value..."
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>Min Amount</label>
                <Input
                  type="number"
                  name="value"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="Enter your coupon code min amount..."
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>Max Amount</label>
                <Input
                  type="number"
                  name="value"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="Enter your coupon code max amount..."
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>Selected Product</label>
                <Select
                  className="custom-select rounded-2xl w-full"
                  value={selectedProducts}
                  onChange={(value) => setSelectedProducts(value)}
                  placeholder="Choose a selected product"
                >
                  {products &&
                    products.map((product) => (
                      <Option value={product.name} key={product.name}>
                        {product.name}
                      </Option>
                    ))}
                </Select>
              </div>
              <Button
                className="rounded-2xl"
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: isCreateHovered ? "#077773" : "#006665",
                  borderColor: isCreateHovered ? "#077773" : "#006665",
                  transition: "background-color 0.3s, border-color 0.3s",
                }}
                onMouseEnter={() => setIsCreateHovered(true)}
                onMouseLeave={() => setIsCreateHovered(false)}
              >
                Create
              </Button>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AllCoupons;
