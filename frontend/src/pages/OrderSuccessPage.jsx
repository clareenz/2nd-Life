import React from "react";
import { Footer2 } from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/lottieflow-success-01-000000-easey.json";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer2 />
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
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="items-center justify-center">
        <Lottie options={defaultOptions} width={70} height={70} />
        <div className="flex flex-col items-center">
          <div>
            <h5 className="text-center text-[25px] text-black">
              Your order is successful!
            </h5>
          </div>
          <div className="mt-2">
            <Link
              to="/"
              className="flex items-center text-[#006665] hover:underline"
            >
              <AiOutlineHome size={20} className="mr-2 text-[#006665]" />
              <span>Go back to homepage</span>
            </Link>
          </div>
          <span>or</span>
          <div className="mt-2">
            <Link
              to="/profile"
              className="flex items-center text-[#006665] hover:underline"
            >
              <IoBagCheckOutline size={20} className="mr-2 text-[#006665]" />
              <span>View Orders</span>
            </Link>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
