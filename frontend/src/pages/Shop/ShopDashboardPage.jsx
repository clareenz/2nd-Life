import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";

const ShopDashboardPage = () => {
  return (
        <>
          <DashboardHeader />
          <div className="xl:ml-[80px] lg:mx-[20px] sm:mx-10 flex bg-[#f5f5f5]">
            <div className="w-[235px]">
              <DashboardSideBar active={1} />
            </div>
            <DashboardHero />
          </div>
        </>
  );
};

export default ShopDashboardPage;