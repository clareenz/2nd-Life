import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { BiShoppingBag } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";

const { SubMenu } = Menu;

const DashboardSideBar = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("1"); // Define setActiveKey

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setActiveKey("1");
        break;
      case "/dashboard-orders":
        setActiveKey("2");
        break;
      case "/dashboard-products":
        setActiveKey("3");
        break;
      case "/dashboard-create-product":
        setActiveKey("4");
        break;
      case "/dashboard-events":
        setActiveKey("5");
        break;
      case "/dashboard-create-event":
        setActiveKey("6");
        break;
      case "/dashboard-withdraw-money":
        setActiveKey("7");
        break;
      case "/dashboard-messages":
        setActiveKey("8");
        break;
      case "/dashboard-coupouns":
        setActiveKey("9");
        break;
      case "/dashboard-create-coupouns":
        setActiveKey("10");
        break;
      case "/dashboard-refunds":
        setActiveKey("11");
        break;
      case "/settings":
        setActiveKey("12");
        break;
      case "/settings":
        setActiveKey("13");
        break;
      default:
        setActiveKey("1");
    }
  }, [location]);

  return (
    <div
      style={{ height: "100vh", position: "fixed" }}
      className="w-[60px] 800px:w-[250px] z-10 submenu-container"
    >
      <Menu
        mode="inline"
        selectedKeys={[activeKey.toString()]}
        theme="light"
        style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto", scrollbarWidth: "none", }}
      >
        <Menu.Item key="1" icon={<RiDashboardLine />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FiShoppingBag />}>
          <Link to="/dashboard-orders">All Orders</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<FiPackage />} title="Products">
          <Menu.Item key="3" icon={<FaCartShopping />}>
            <Link to="/dashboard-products">All products</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BiShoppingBag />}>
            <Link to="/dashboard-create-product">Add products</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<MdOutlineLocalOffer />} title="Events">
          <Menu.Item key="5">
            <Link to="/dashboard-events">All Events</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/dashboard-create-event">Create Events</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="7" icon={<GrMoney />}>
          <Link to="/dashboard-withdraw-money">Withdraw Money</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<BiMessageSquareDetail />}>
          <Link to="/dashboard-messages">Shop Inbox</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<AiOutlineGift />}>
          <Link to="/dashboard-coupouns">Discount Codes</Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<HiOutlineReceiptRefund />}>
          <Link to="/dashboard-refunds">Refunds</Link>
        </Menu.Item>
        <SubMenu key="sub3" icon={<CiSettings/>} title="Settings" style={{ marginTop: "270px" }} >
          <Menu.Item key="12">
            <Link to="/settings">Shop</Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link to="/shop-password">Password</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default DashboardSideBar;
