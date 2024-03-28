import React from "react";
import {Footer2} from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/lottieflow-success-01-000000-easey.json";

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
      <Lottie options={defaultOptions} width={40} height={40}/>
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful!
      </h5>
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
