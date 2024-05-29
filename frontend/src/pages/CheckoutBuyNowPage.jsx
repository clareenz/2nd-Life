import React from "react";
import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import CheckoutBuyNow from "../components/Checkout/CheckoutBuyNow";
import {Footer2} from "../components/Layout/Footer";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <CheckoutBuyNow />
      <br />
      <br />
      <Footer2 />
    </div>
  );
};

export default CheckoutPage;
