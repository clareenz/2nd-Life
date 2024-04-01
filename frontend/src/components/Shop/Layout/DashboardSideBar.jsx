import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm sticky top-0 left-0 z-10 border-r">
      {/* single item */}
      <div className="flex items-center w-full px-5 pt-6">
        <Link to="/dashboard" className="flex items-center w-full">
          <RiDashboardLine
            size={23}
            color={`${active === 1 ? "006665" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] font-Poppins ${
              active === 1 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full px-5 pt-5 font-Poppins">
        <Link to="/dashboard-orders" className="flex items-center w-full">
          <FiShoppingBag
            size={23}
            color={`${active === 2 ? "006665" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] ${
              active === 2 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full px-5 pt-5 font-Poppins">
        <Link to="/dashboard-products" className="flex items-center w-full">
          <FiPackage size={23} color={`${active === 3 || active === 4 ? "006665" : "gray"}`} />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] ${
              active === 3 || active === 4 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full px-5 pt-5 font-Poppins">
        <Link to="/dashboard-events" className="flex items-center w-full">
          <MdOutlineLocalOffer
            size={23}
            color={`${active === 5 || active === 6 ? "006665" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] ${
              active === 5 || active === 6 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full px-5 pt-5 font-Poppins">
        <Link
          to="/dashboard-withdraw-money"
          className="flex items-center w-full"
        >
          <GrMoney
            size={23}
            color={`${active === 7 ? "006665" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] ${
              active === 7 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full px-5 pt-5 font-Poppins">
        <Link to="/dashboard-messages" className="flex items-center w-full">
          <BiMessageSquareDetail
            size={23}
            color={`${active === 8 ? "006665" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] ${
              active === 8 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full px-5 pt-5 font-Poppins">
        <Link to="/dashboard-coupouns" className="flex items-center w-full">
          <AiOutlineGift
            size={23}
            color={`${active === 9 ? "006665" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] ${
              active === 9 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full px-5 pt-5 font-Poppins">
        <Link to="/dashboard-refunds" className="flex items-center w-full">
          <HiOutlineReceiptRefund
            size={23}
            color={`${active === 10 ? "006665" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] ${
              active === 10 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full px-5 pt-[240px] font-Poppins">
        <Link to="/dashboard-settings" className="flex items-center w-full">
          <CiSettings
            size={23}
            color={`${active === 11 ? "006665" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-4 text-[18px] font-[400] ${
              active === 11 ? "text-[#FF8474]" : "text-[gray]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
