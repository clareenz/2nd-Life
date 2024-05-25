import { Dropdown } from "antd";
import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";

const AdminHeader = () => {
    const {user} = useSelector ((state) => state.user);

  return (
    <div className="w-full h-[70px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            className="ml-[50px]"
            src="/adminlogo.png" //logo
            alt="logo2"
            style={{ width: "130px", height: "auto", marginLeft: "10px" }}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* <Dropdown overlay={notificationMenu} placement="bottomRight">
            <div className="cursor-pointer">
              <AiOutlineBell color="black" size={20} className="mx-2" />
            </div>
          </Dropdown> */}
          <Link to="/dashboard-messages" className="hidden md:block">
            <BiMessageSquareDetail
              color="black"
              size={20}
              className="mx-2 cursor-pointer"
            />
          </Link>
            <img
              src={`${backend_url}${user?.avatar}`}
              alt=""
              className="ml-3 w-[34px] h-[35px] rounded-full object-cover"
            />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
