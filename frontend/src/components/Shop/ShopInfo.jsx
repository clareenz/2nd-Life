import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { FaAddressCard, FaPhone } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";
import { MdRateReview } from "react-icons/md";
import { GiArrowCursor } from "react-icons/gi";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : ( //shop info left
        <div>
          <div className="w-full ">
            <div className="w-auto flex items-center justify-center">
              <img
                src={`${backend_url}${data.avatar}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full mt-10"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data.description}
            </p>
          </div>

          <div className="p-3">
            <div className="flex items-center">
              <FaAddressCard size={17} className="mr-2" />
              <h5 className="font-[600] mb-0">Address</h5>
            </div>
            <h4 className="text-[#000000a6] ml-6">{data.address}</h4>
          </div>

          <div className="p-3">
            <div className="flex items-center">
              <FaPhone size={17} className="mr-2" />
              <h5 className="font-[600]">Phone Number</h5>
            </div>
            <h4 className="text-[#000000a6] ml-6">{data.phoneNumber}</h4>
          </div>

          <div className="p-3">
            <div className="flex items-center">
              <BiSolidPackage size={17} className="mr-2" />
              <h5 className="font-[600]">Total Products</h5>
            </div>
            <h4 className="text-[#000000a6] ml-6">10</h4>
          </div>

          <div className="p-3">
            <div className="flex items-center">
              <MdRateReview size={17} className="mr-2" />
              <h5 className="font-[600]">Shop Ratings</h5>
            </div>
            <h4 className="text-[#000000b0] ml-6">4/5</h4>
          </div>

          <div className="p-3">
            <div className="flex items-center">
              <GiArrowCursor size={17} className="mr-2" />
              <h5 className="font-[600]">Joined On</h5>
            </div>
            <h4 className="text-[#000000b0] ml-6">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>

          {isOwner && (
            <div className="py-3 px-4">
 
              <div
                className={`${styles.button1} w-auto`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
