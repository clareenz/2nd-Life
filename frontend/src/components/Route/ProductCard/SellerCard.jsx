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

const SellerCard = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

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
      <div
        className="w-full h-[200px] bg-white rounded-lg shadow-sm px-3 relative cursor-pointer flex flex-row"
      >
        <div className="flex items-center pt-1">
          <div className="pr-8">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex flex-row">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div className="">
                    <h5 className={`${styles.shop_name}`}>{data.shop.name} </h5>
                    <h5 className="text-[13px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
        <div
          className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-9  `}
          onClick={handleMessageSubmit}
        >
          <span className="flex items-center text-white">
            Message <AiOutlineMessage className="ml-1" />
          </span>
        </div>
      </div>
    </>
  );
};

export default SellerCard;
