import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Layout/AdminSidebar";
import AllUsers from "../components/Admin/AllUsers";

const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>
        <div className=" justify-center w-full">
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
