import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopDashboardPage = () => {
  return (
        <div>
          <DashboardHeader />
          <div className="flex items-center justify-between">
            <div className="w-[60px] 800px:w-[270px]">
              <DashboardSideBar active={1} />
            </div>
          </div>
        </div>
  );
};

export default ShopDashboardPage;