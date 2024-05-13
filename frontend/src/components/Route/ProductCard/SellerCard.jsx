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

export const SellerCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

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

  return (
    <>
      <div className="w-[80%] h-[150px] bg-white rounded-lg shadow px-3 relative cursor-pointer">
        <div className="flex items-center pt-2.5">
          <div className="p-3">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex flex-row">
                <div>
                  <img
                    src={`${backend_url}${data?.shop?.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </div>
                <div className="px-1">
                  <h5 className={`${styles.shop_name}`}>{data.shop.name} </h5>
                </div>
              </div>
            </Link>
            <div className="flex flex-row justify-between">
              <div>
                <h5 className="text-[13px] mt-5 mr-7">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
              <div
                className={`${styles.button} mt-4 rounded-3xl !h-7`}
                onClick={handleMessageSubmit}
              >
                <span className="flex items-center text-white text-[13px]">
                  Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>
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

  return (
    <>
      <div className="w-full h-[100px] bg-white rounded-lg shadow px-3 pb-2 relative cursor-pointer">
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
                    className="w-[50px] h-[50px] rounded-full mr-3"
                  />
                </Link>
              </div>
              <div>
                <div>
                  <div>
                    <Link
                      to={`/shop/preview/${data.shop._id}`}
                      className={`${styles.shop_name}`}
                    >
                      {data.shop.name}
                    </Link>
                    <h5 className="text-[13px] mt-1">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.button} rounded-3xl !h-7 flex items-center`}
            onClick={handleMessageSubmit}
          >
            <span className="text-white text-[13px] mr-1">Message</span>
            <AiOutlineMessage className="text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default { SellerCard, SellerCard2 };
