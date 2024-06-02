import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { AiOutlineBell } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import moment from "moment";
import axios from "axios";
import { message } from "antd";
import { backend_url, server } from "../../../server";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${server}/notification/get-notifications/${seller?._id}`
        );
        setNotifications(response.data.notifications);
        setUnreadNotifications(response.data.unreadNotifications);
        console.log("not ig" + response.data.notifications);
        message.success(response.data.success);
      } catch (error) {
        message.error(error.response.data.message);
      }

      console.log(notifications);
    };

    fetchNotifications();
  }, [seller]); // Add userId to the dependency array

  const notificationMenu = (
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item
          key={notification?._id}
          onClick={() => markAsRead(notification?._id)}
          style={{
            backgroundColor:
              notification.status === "unread" ? "#e6f7ff" : "white",
          }}
        >
          {notification?.type === "message" ? (
            <Link to={`/dashboard-messages?${notification?._id}`}>
              <div>
                <div>{notification?.message}</div>
                <div style={{ fontSize: "small", color: "gray" }}>
                  {moment(notification?.createdAt).fromNow()}
                </div>
              </div>
            </Link>
          ) : (
            <div>
              <div>{notification?.message}</div>
              <div style={{ fontSize: "small", color: "gray" }}>
                {moment(notification?.createdAt).fromNow()}
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`${server}/notification/read/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, status: "read" }
            : notification
        )
      );
      message.success("Notification marked as read");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

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
            <div className="relative cursor-pointer">
              <AiOutlineBell color="#000" size={27} fill="text-black" />
              <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-3.5 h-3.5 top right p-0 m-0 text-black font-mono text-[10.5px] leading-tight text-center">
                {unreadNotifications && unreadNotifications.length}
              </span>
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
              src={`${seller.avatar?.url}`}
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
