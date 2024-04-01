import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopDashboardPage = () => {
  return ( //container sa left side
        <div>
          <DashboardHeader />
          <div className="flex">
            <div className="w-[60px] 800px:w-[270px]">
              <DashboardSideBar active={1} />
            </div>
          </div>
        </div>
  );
};

export default ShopDashboardPage;