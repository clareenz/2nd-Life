import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { AiOutlineBell } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  const notificationMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/dashboard-notifications">Notification 1</Link>
      </Menu.Item>
      {/* Add more notification items as needed */}
    </Menu>
  );

  return (
    <div className="w-full h-[70px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img
            className="ml-[50px]"
            src="/tempSellerLogo.png" //logo
            alt="logo2"
            style={{ width: "130px", height: "auto", marginLeft: "10px" }}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Dropdown overlay={notificationMenu} placement="bottomRight">
            <div className="cursor-pointer">
              <AiOutlineBell color="black" size={20} className="mx-2" />
            </div>
          </Dropdown>
          <Link to="/dashboard-messages" className="hidden md:block">
            <BiMessageSquareDetail
              color="black"
              size={20}
              className="mx-2 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`$${seller.avatar?.url}`}
              alt=""
              className="ml-3 w-[34px] h-[35px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
