import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Layout/AdminSidebar";
import AllSellers from "../components/Admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <div className="justify-center w-full">
          <AllSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
