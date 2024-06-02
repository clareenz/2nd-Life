/* The inside of Best Deals
start: 5:20:57 (first vid) */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import { server } from "../../../server";
import { AiOutlineMessage } from "react-icons/ai";
import { SlUserFollow } from "react-icons/sl";

export const SellerCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [averageRating,setAverageRating] = useState()

  useEffect(() => {
    console.log('useEffect running with data:', data);

    const fetchNotifications = async () => {
      try {
        if (data && data._id) {
          console.log('Fetching reviews for product ID:', data._id);
          const response = await axios.get(`${server}/product/reviews-shop/${data.shop?._id}`);
          console.log('Response received:', response.data);
          setAverageRating(response.data.overallAverageRating);
          message.success(response.success);
        } else {
          console.log('Product ID not available');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        message.error(error.message);
      }
    };

    fetchNotifications();
  }, [data]); // Add data to the dependency array


  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
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

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );


  return (
    <>
      <div className="max-w-[260px] min-w-[150px] max-h-[130px] p-2 bg-white rounded-lg shadow px-3 cursor-pointer">
        <div className="flex flex-col">
          <div className="flex flex-row pt-2.5 pb-6">
            <div>
              <Link
                to={`/shop/preview/${data.shop._id}`}
                className="flex flex-row items-center"
              >
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover mr-3"
                />
              </Link>
            </div>
            <div className="text-black marquee">
              <Link
                to={`/shop/preview/${data.shop._id}`}
                className={`${styles.shop_name}`}
              >
                {data.shop.name}
              </Link>
              <h5 className="text-[13px] mt-1">({averageRating}/5) Ratings</h5>
            </div>
          </div>
          <div className="flex flex-row justify-center space-x-1 ">
            <div
              className={`w-[80px] px-1  bg-006665 hover:bg-fe8373 justify-center cursor-pointer rounded-3xl !h-7 flex items-center`}
              onClick={handleMessageSubmit}
            >
              <span className="text-white text-[13px] mr-1">Message</span>
              <AiOutlineMessage size={13} className="text-white" />
            </div>
            <div
              className={`w-[80px] px-1 bg-006665 hover:bg-fe8373 justify-center cursor-pointer rounded-3xl !h-7 flex items-center`}
            >
              <span className="text-white text-[13px] mr-1">Follow</span>
              <SlUserFollow size={13} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SellerCard2 = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [averageRating,setAverageRating] = useState()

  useEffect(() => {
    console.log('useEffect running with data:', data);

    const fetchNotifications = async () => {
      try {
        if (data && data._id) {
          console.log('Fetching reviews for product ID:', data._id);
          const response = await axios.get(`${server}/product/reviews-shop/${data.shop?._id}`);
          console.log('Response received:', response.data);
          setAverageRating(response.data.overallAverageRating);
          message.success(response.success);
        } else {
          console.log('Product ID not available');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        message.error(error.message);
      }
    };

    fetchNotifications();
  }, [data]); // Add data to the dependency array
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
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

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

    

  return (
    <>
      <div className="max-w-full max-h-[100px] bg-white rounded-lg shadow px-2 py-1 relative cursor-pointer">
        <div className="flex items-center justify-between h-full">
          <div className="p-3">
            <div className="flex flex-row">
              <div>
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className="flex flex-row items-center"
                >
                  <img
                    src={`${backend_url}${data?.shop?.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover mr-3"
                  />
                </Link>
              </div>
                  <div className="marquee">
                    <Link
                      to={`/shop/preview/${data.shop._id}`}
                      className={`${styles.shop_name}`}
                    >
                      {data.shop.name}
                    </Link>
                    <h5 className="text-[13px] mt-1">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div
              className={`w-[80px]  bg-006665 hover:bg-fe8373 justify-center cursor-pointer rounded-3xl !h-6 flex items-center`}
              onClick={handleMessageSubmit}
            >
              <span className="text-white text-[13px] mr-1">Message</span>
              <AiOutlineMessage size={13} className="text-white" />
            </div>
            <div
              className={`w-[80px]  bg-006665 hover:bg-fe8373 justify-center cursor-pointer rounded-3xl !h-6 flex items-center`}
            >
              <span className="text-white text-[13px] mr-1">Follow</span>
              <SlUserFollow size={13} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default { SellerCard, SellerCard2 };
