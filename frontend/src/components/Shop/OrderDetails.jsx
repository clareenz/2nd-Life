import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import styles from "../../styles/styles";
import { message } from "antd";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        message.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        message.success("Order updated!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen pt-[50px] pb-[50px] flex items-center justify-center">
      <div className={`bg-white p-5 w-[75%] rounded-2xl shadow-lg`}>
        <div className="flex items-center justify-between w-full mb-6 p-4 bg-gradient-to-r from-[#FFF1F0] to-[#FFF1F0] rounded-2xl shadow">
          <div className="flex items-center py-3">
            <BsFillBagFill size={30} color="FF8474" />
            <h1 className="pl-2 text-2xl sm:text-3xl text-black">
              Order Details
            </h1>
          </div>
          <div className="">
            <Link to="/dashboard-orders">
              <div
                className={`w-[130px] pt-0.5 hover:bg-fe8373 h-8 flex  justify-center rounded-2xl cursor-pointer  text-[#fff] bg-[#006665] text-[16px]`}
              >
                Order List
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full border-b ">
          <h5 className="text-gray-600">
            Order ID: <span>#{data?._id?.slice(0, 8)}</span>
          </h5>
          <h5 className="text-gray-600">
            Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>

        {/* order items */}
        <br />
        <br />
        {data &&
          data?.cart.map((item, index) => (
            <div className="flex flex-col sm:flex-row items-start w-full mb-5 border p-3 rounded-lg shadow-sm">
              <img
                src={`${item.images[0]?.url}`}
                alt=""
                className="w-20 h-20 rounded-lg shadow-md"
              />
              <div className="w-full sm:pl-3">
                <h5 className="">{item.name}</h5>
                <h5 className=" text-gray-700">
                  ₱{item.discountPrice} x {item.qty}
                </h5>
              </div>
            </div>
          ))}

        <div className="w-full text-right border-t pt-3 mt-6">
          <h5 className="">
            Total Price: <strong>₱{data?.totalPrice}</strong>
          </h5>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 border-t pt-4">
          <div className="w-full sm:w-3/5 mb-6 sm:mb-0">
            <h4 className="text-xl sm:text-2xl font-semibold">
              Shipping Address:
            </h4>
            <h4 className="pt-3">
              {data?.shippingAddress.country +
                " " +
                data?.shippingAddress.city +
                " " +
                data?.shippingAddress.zipCode}
            </h4>
            <h4 className="">{data?.shippingAddress.country}</h4>
            <h4 className="">{data?.shippingAddress.city}</h4>
            <h4 className="">{data?.user?.phoneNumber}</h4>
          </div>
          <div className="w-full 800px:w-[40%]">
            <h4 className=" text-[20px]">Payment Info:</h4>
            <h4>
              Status:{" "}
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid"}
            </h4>
          </div>
        </div>
        <br />
        <br />
        <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
        {data?.status !== "Processing refund" &&
          data?.status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] px-3 border h-[30px] rounded-full custom-select1 hover:border-[#006665] focus:border-[#006665]"
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}
        {/* {data?.status === "Processing refund" ||
        data?.status === "Refund Success" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : null} */}

        <div className="pt-3 items-center">
          <div
            className={` w-[200px] pt-1 hover:bg-fe8373 h-8 flex  justify-center rounded-2xl cursor-pointer  text-[#fff] bg-[#006665] text-[16px]`}
            onClick={
              data?.status !== "Processing refund"
                ? orderUpdateHandler
                : refundOrderUpdateHandler
            }
          >
            Update Status
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
