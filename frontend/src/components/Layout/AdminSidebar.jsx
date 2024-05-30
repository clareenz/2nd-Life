import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import "../Shop/Layout/sidebar.css";
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdEventAvailable } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";

const AdminSidebar = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("1"); // Define setActiveKey
  const { SubMenu } = Menu;

  useEffect(() => {
    switch (location.pathname) {
      case "/admin/dashboard":
        setActiveKey("1");
        break;
      case "/admin-orders":
        setActiveKey("2");
        break;
      case "/admin-sellers":
        setActiveKey("3");
        break;
      case "/admin-users":
        setActiveKey("4");
        break;
      case "/admin-products":
        setActiveKey("5");
        break;
      case "/admin-events":
        setActiveKey("6");
        break;

      case "/admin-withdraw-request":
        setActiveKey("7");
        break;
      case "/profile":
        setActiveKey("8");
        break;

      default:
        setActiveKey("1");
    }
  }, [location]);

  return (
    <div className="sidebar-container pt-[80px] z-10">
      <Menu
        mode="inline"
        selectedKeys={[activeKey.toString()]}
        theme="light"
        style={{
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Menu.Item
          key="1"
          style={
            activeKey === "1"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<RiDashboardLine />}
        >
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.Item
          key="2"
          style={
            activeKey === "2"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<FiShoppingBag />}
        >
          <Link to="/admin-orders">All Orders</Link>
        </Menu.Item>

        <Menu.Item
          key="3"
          style={
            activeKey === "3"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<AiOutlineShop />}
        >
          <Link to="/admin-sellers">All Sellers</Link>
        </Menu.Item>

        <Menu.Item
          key="4"
          style={
            activeKey === "4"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<HiOutlineUsers />}
        >
          <Link to="/admin-users">All Users</Link>
        </Menu.Item>

        <Menu.Item
          key="5"
          style={
            activeKey === "5"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<BiSolidShoppingBags />}
        >
          <Link to="/admin-products">All Products</Link>
        </Menu.Item>

        <Menu.Item
          key="6"
          style={
            activeKey === "6"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<MdEventAvailable />}
        >
          <Link to="/admin-events">All Events</Link>
        </Menu.Item>

        <Menu.Item
          key="7"
          style={
            activeKey === "7"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<GrMoney />}
        >
          <Link to="/admin-withdraw-request">Withdraw Request</Link>
        </Menu.Item>

        <Menu.Item
          key="8"
          style={
            activeKey === "8"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<GrConfigure />}
        >
          <Link to="/profile">Settings</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminSidebar;
