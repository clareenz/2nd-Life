import React from "react";
import Footer from "../../components/Layout/Footer";
import ShopPassword from "../../components/Shop/ShopPassword";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopPasswordPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={13} />
        </div>
        <ShopPassword />
      </div>
    </div>
  );
};

export default ShopPasswordPage;