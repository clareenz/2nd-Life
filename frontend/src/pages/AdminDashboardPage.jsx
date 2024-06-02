import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSidebar from "../components/Layout/AdminSidebar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={1} />
        </div>
        <div className=" justify-center w-full">
          <AdminDashboardMain />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
