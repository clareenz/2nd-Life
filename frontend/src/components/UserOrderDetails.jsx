import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import {  useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import {  server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { AiOutlineMessage } from "react-icons/ai";
import { message } from 'antd';

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);


  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        message.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    } else {
      message.error("Please login to create a conversation");
    }
  };

  return (
    <div className="min-h-screen pt-[100px] pb-[50px] flex items-center justify-center">
      <div className="bg-white p-5 w-[75%] rounded-2xl shadow-lg">
        <div className="flex items-center justify-between w-full mb-6 p-4 bg-gradient-to-r from-[#FFF1F0] to-[#FFF1F0] rounded-2xl shadow">
          <div className="flex items-center py-3">
            <BsFillBagFill size={30} color="#FF8474" />
            <h1 className="pl-2 text-2xl sm:text-3xl text-black">
              Order Details
            </h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-6 border-b pb-4">
          <h5 className="text-gray-600">
            Order ID: <span>#{data?._id?.slice(0, 8)}</span>
          </h5>
          <h5 className="text-gray-600">
            Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>

        {data &&
          data?.cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start w-full mb-5 border p-3 rounded-lg shadow-sm"
            >
              <img
                src={`${item.images[0]?.url}`}
                alt=""
                className="w-20 h-20 rounded-lg shadow-md"
              />
              <div className="w-full sm:pl-3">
                <h5 className="text-lg sm:text-xl">{item.name}</h5>
                <h5 className="text-lg sm:text-xl text-gray-700">
                  ₱{item.discountPrice} x {item.qty}
                </h5>
              </div>
              {!item.isReviewed && data?.status === "Delivered" && (
                <div
                  className={` px-1 min-w-[150px] bg-006665 hover:bg-fe8373 h-8 flex items-center justify-center rounded-2xl cursor-pointer text-white mt-3 `}
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
                >
                  Write a review
                </div>
              )}
            </div>
          ))}

        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-md p-4">
              <div className="flex justify-end">
                <RxCross1
                  size={30}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                />
              </div>
              <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-4">
                Give a Review
              </h2>
              <div className="flex items-center mb-4">
                <img
                  src={`${selectedItem?.images[0]?.url}`}
                  alt=""
                  className="w-20 h-20 rounded-lg shadow-md"
                />
                <div className="pl-3">
                  <h5 className="text-lg sm:text-xl">{selectedItem?.name}</h5>
                  <h5 className="text-lg sm:text-xl">
                    ₱{selectedItem?.discountPrice} x {selectedItem?.qty}
                  </h5>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-lg sm:text-xl font-semibold">
                  Give a Rating <span className="text-red-500">*</span>
                </h5>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-lg sm:text-xl font-semibold">
                  Write a comment
                  <span className="ml-1 font-normal text-gray-500">
                    (optional)
                  </span>
                </label>
                <textarea
                  name="comment"
                  cols="20"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was your product? Write your expression about it!"
                  className="mt-2 w-full border p-2 outline-none rounded-lg shadow-sm"
                ></textarea>
              </div>
              <div
                className={`${styles.button} text-white text-xl sm:text-2xl`}
                onClick={rating > 1 ? reviewHandler : null}
              >
                Submit
              </div>
            </div>
          </div>
        )}

        <div className="w-full text-right border-t pt-3 mt-6">
          <h5 className="text-lg sm:text-xl">
            Total Price: ₱<strong>{data?.totalPrice}</strong>
          </h5>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 border-t pt-4">
          <div className="w-full sm:w-3/5 mb-6 sm:mb-0">
            <h4 className="text-xl sm:text-2xl font-semibold">
              Shipping Address:
            </h4>
            <h4 className="text-lg sm:text-xl mt-2">
              {data?.shippingAddress.city + " " + data?.shippingAddress.zipCode}
            </h4>
            <h4 className="text-lg sm:text-xl">
              {data?.shippingAddress.country}
            </h4>
            <h4 className="text-lg sm:text-xl">{data?.shippingAddress.city}</h4>
            <h4 className="text-lg sm:text-xl">{data?.user.phoneNumber}</h4>
          </div>
          <div className="w-full sm:w-2/5">
            <h4 className="text-xl sm:text-2xl">Payment Info:</h4>
            <h4 className="text-lg sm:text-xl mt-2">
              Status:{" "}
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid"}
            </h4>
            {/* {data?.status === "Delivered" && (
              // <div
              //   className={`${styles.button} text-white mt-3`}
              //   onClick={refundHandler}
              // >
              //   Give a Refund
              // </div>
            )} */}
          </div>
        </div>

        <div
          className={`${styles.button6} ml-2 !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
          onClick={handleMessageSubmit}
        >
          <span className="text-white text-[13px] mr-1">Message</span>
          <AiOutlineMessage className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;
