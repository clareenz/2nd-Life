import React from "react";
import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps.jsx";
import Checkout from "../components/Checkout/Checkout.jsx";
import {Footer2} from "../components/Layout/Footer";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer2 />
    </div>
  );
};

export default CheckoutPage;
