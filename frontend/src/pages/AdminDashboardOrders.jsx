import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Layout/AdminSidebar";
import AllOrders from "../components/Admin/AllOrders";

const AdminDashboardOrders = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
