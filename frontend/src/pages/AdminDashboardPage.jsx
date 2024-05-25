import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSidebar from "../components/Layout/AdminSidebar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
        <div className="flex">
          <div className="w-[60px] 800px:w-[270px]">
            <AdminSidebar active={1} />
          </div>
          <AdminDashboardMain />
        </div>
      
    </div>
  );
};

export default AdminDashboardPage;
