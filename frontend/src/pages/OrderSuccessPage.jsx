import { Footer } from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/lottieflow-success-01-000000-easey.json";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../server";

const OrderSuccessPage = () => {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(user);
    updateOrders(user?._id);
  }, []);

  const updateOrders = async (userId) => {
    try {
      const response = await axios.put(
        `${server}/order/update-orders-user/${userId}`
      );
      console.log(response.data.orders);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="p-4">
      <div className=" min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
          <Lottie options={defaultOptions} width={100} height={100} />
          <h1 className="text-3xl font-semibold text-[#006665] mb-6">
            Order Successful!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Link
              to="/"
              className="flex items-center px-4 py-2 bg-[#FF8474] text-white rounded-full shadow hover:bg-[#006665]"
            >
              <AiOutlineHome size={20} className="mr-2" />
              <span>Go back to homepage</span>
            </Link>
            <span className="text-gray-600">or</span>
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 bg-[#FF8474] text-white rounded-full shadow hover:bg-[#006665]"
            >
              <IoBagCheckOutline size={20} className="mr-2" />
              <span>View Orders</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
