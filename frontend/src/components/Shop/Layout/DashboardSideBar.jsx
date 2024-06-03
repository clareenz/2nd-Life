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
import { BsInboxes } from "react-icons/bs";
import "./sidebar.css";
import { IoBagAddOutline } from "react-icons/io5";
import { BsTags } from "react-icons/bs";
import { LuCalendarPlus } from "react-icons/lu";
import { TbShoppingBagEdit } from "react-icons/tb";
import { GiPadlock } from "react-icons/gi";
import axios from "axios";
import { server } from "../../../server";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineUserDelete } from "react-icons/ai";

const { SubMenu } = Menu;

const DashboardSideBar = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("1");
  const navigate = useNavigate();

  const logoutHandler = async () => {
    axios
      .get(`${server}/shop/logout`, { withCredentials: true })
      .then((res) => {
        message.success(res.data.message);
        window.location.reload(true);
        navigate("/shop-login");
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  };

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
      case "/shop-password":
        setActiveKey("13");
        break;
      case "/shop-logout":
        setActiveKey("14");
        break;
      case "/shop-delete":
        setActiveKey("15");
        break;
      default:
        setActiveKey("1");
    }
  }, [location]);

  return (
    <div className="sidebar-container pt-[80px] z-10 ">
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
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          style={
            activeKey === "2"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<FaCartShopping />}
        >
          <Link to="/dashboard-orders">All Orders</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<FiPackage />} title="Products">
          <Menu.Item
            key="3"
            style={
              activeKey === "3"
                ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
                : {}
            }
            icon={<BsInboxes className="" />}
          >
            <Link to="/dashboard-products">All products</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            style={
              activeKey === "4"
                ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
                : {}
            }
            icon={<IoBagAddOutline className="" />}
          >
            <Link to="/dashboard-create-product">Add products</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<MdOutlineLocalOffer />} title="Events">
          <Menu.Item
            key="5"
            style={
              activeKey === "5"
                ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
                : {}
            }
            icon={<BsTags />}
          >
            <Link to="/dashboard-events">All Events</Link>
          </Menu.Item>
          <Menu.Item
            key="6"
            style={
              activeKey === "6"
                ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
                : {}
            }
            icon={<LuCalendarPlus />}
          >
            <Link to="/dashboard-create-event">Create Events</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="7"
          style={
            activeKey === "7"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<GrMoney />}
        >
          <Link to="/dashboard-withdraw-money">Withdraw Money</Link>
        </Menu.Item>
        <Menu.Item
          key="8"
          style={
            activeKey === "8"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<BiMessageSquareDetail />}
        >
          <Link to="/dashboard-messages">Shop Inbox</Link>
        </Menu.Item>
        <Menu.Item
          key="9"
          style={
            activeKey === "9"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<AiOutlineGift />}
        >
          <Link to="/dashboard-coupouns">Discount Codes</Link>
        </Menu.Item>
        <Menu.Item
          key="11"
          style={
            activeKey === "11"
              ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
              : {}
          }
          icon={<HiOutlineReceiptRefund />}
        >
          <Link to="/dashboard-refunds">Refunds</Link>
        </Menu.Item>
        <SubMenu key="sub3" icon={<CiSettings />} title="Settings">
          <Menu.Item
            key="12"
            style={
              activeKey === "12"
                ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
                : {}
            }
            icon={<TbShoppingBagEdit />}
          >
            <Link to="/settings">Edit Shop</Link>
          </Menu.Item>
          <Menu.Item
            key="13"
            style={
              activeKey === "13"
                ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
                : {}
            }
            icon={<GiPadlock />}
          >
            <Link to="/shop-password">Password</Link>
          </Menu.Item>
          <Menu.Item
            key="14"
            style={
              activeKey === "14"
                ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
                : {}
            }
            icon={<IoIosLogOut />}
          >
            <div className={` `} onClick={logoutHandler}>
              Log Out
            </div>
          </Menu.Item>
          <Menu.Item
            key="15"
            style={
              activeKey === "15"
                ? { backgroundColor: "#FFEAE8", color: "#FF8474" }
                : {}
            }
            icon={<AiOutlineUserDelete />}
          >
            <Link to="/shop-delete">Edit Shop</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default DashboardSideBar;
