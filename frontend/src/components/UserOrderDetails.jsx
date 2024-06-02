import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { AiOutlineMessage } from "react-icons/ai";
import { Button, Modal, Rate, message } from "antd";

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
            <h1 className="pl-2 text-2xl text-black sm:text-3xl">
              Order Details
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between w-full pb-4 mb-6 border-b sm:flex-row sm:items-center">
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
              className="flex flex-col items-start w-full p-3 mb-5 border rounded-lg shadow-sm sm:flex-row"
            >
              <img
                src={`${item.images[0]?.url}`}
                alt=""
                className="w-20 h-20 rounded-lg shadow-md"
              />
              <div className="w-full sm:pl-3">
                <h5 className="">{item.name}</h5>
                <h5 className="text-gray-700 ">
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
          <>
            <Modal visible={open} onCancel={() => setOpen(false)} footer={null}>
              <div className="pt-4">
                <div className="flex items-center mb-4">
                  <img
                    src={`${selectedItem?.images[0]?.url}`}
                    alt=""
                    className="w-20 h-20 rounded-lg shadow-md"
                  />
                  <div className="pl-3">
                    <h5 className="">{selectedItem?.name}</h5>
                    <h5 className="">
                      ₱{selectedItem?.discountPrice} x {selectedItem?.qty}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h5 className=" font-Poppins">
                  Give a Rating <span className="text-red-500">*</span>
                </h5>
                <Rate
                  value={rating}
                  onChange={(value) => setRating(value)}
                  character={({ index }) =>
                    rating >= index + 1 ? (
                      <AiFillStar color="rgb(246,186,0)" size={25} />
                    ) : (
                      <AiOutlineStar color="rgb(246,186,0)" size={25} />
                    )
                  }
                />
              </div>

              <div className="mb-4">
                <label className=" font-Poppins">
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
                  className="mt-2 w-full border p-2 outline-none rounded-lg shadow-sm  hover:border-[#006665] focus:border-[#006665]"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <input
                  type="submit"
                  value="Confirm"
                  className="!w-[100px] bg-fe8373 hover:bg-006665 flex items-center justify-center text-[#fff] h-8 rounded-2xl cursor-pointer text-[14px]"
                  onClick={rating > 1 ? reviewHandler : null}
                />
              </div>
            </Modal>
          </>
        )}

        <div className="w-full pt-3 mt-6 text-right border-t">
          <h5 className="">
            Total Price: ₱<strong>{data?.totalPrice}</strong>
          </h5>
        </div>

        <div className="flex flex-col justify-between pt-4 mt-6 border-t sm:flex-row">
          <div className="w-full mb-6 sm:w-3/5 sm:mb-0">
            <h4 className="text-xl font-semibold sm:text-2xl">
              Shipping Address:
            </h4>
            <h4 className="mt-2 ">
              {data?.shippingAddress.city + " " + data?.shippingAddress.zipCode}
            </h4>
            <h4 className="">
              {data?.shippingAddress.country}
            </h4>
            <h4 className="">{data?.shippingAddress.city}</h4>
            <h4 className="">{data?.user.phoneNumber}</h4>
          </div>
          <div className="w-full sm:w-2/5">
            <h4 className="text-[20px]">Payment Info:</h4>
            <h4 className="mt-2 ">
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
          className={`w-[150px] border border-006665  my-3  justify-center  cursor-pointer ml-2 !mt-6 rounded-3xl h-8 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
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
