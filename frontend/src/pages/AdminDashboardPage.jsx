import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSidebar from "../components/Layout/AdminSidebar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
        <div className="xl:ml-[70px] lg:ml-[80px] md:ml-[90px] sm:mx-[100px] ml-[70px] mr-3 flex bg-[#f5f5f5]">
          <div className="w-[60px] 800px:w-[270px]">
            <AdminSidebar active={1} />
          </div>
          <AdminDashboardMain />
        </div>
      
    </div>
  );
};

export default AdminDashboardPage;
