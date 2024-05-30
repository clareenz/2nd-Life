import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import UserOrderDetails from "../components/UserOrderDetails";

const OrderDetailsPage = () => {
  return (
    <div>
      <Header />
      <div className="">
        <UserOrderDetails />
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
