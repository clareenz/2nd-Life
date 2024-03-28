import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-[80%] h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="flex items-center w-full p-4">
        <Link to="/dashboard" className="flex items-center w-full">
          <RxDashboard
            size={25}
            color={`${active === 1 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/dashboard-orders" className="flex items-center w-full">
          <FiShoppingBag
            size={25}
            color={`${active === 2 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/dashboard-products" className="flex items-center w-full">
          <FiPackage size={25} color={`${active === 3 ? "006665" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link
          to="/dashboard-create-product"
          className="flex items-center w-full"
        >
          <AiOutlineFolderAdd
            size={25}
            color={`${active === 4 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/dashboard-events" className="flex items-center w-full">
          <MdOutlineLocalOffer
            size={25}
            color={`${active === 5 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/dashboard-create-event" className="flex items-center w-full">
          <VscNewFile
            size={25}
            color={`${active === 6 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="flex items-center w-full"
        >
          <CiMoneyBill
            size={25}
            color={`${active === 7 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/dashboard-messages" className="flex items-center w-full">
          <BiMessageSquareDetail
            size={25}
            color={`${active === 8 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/dashboard-coupouns" className="flex items-center w-full">
          <AiOutlineGift
            size={25}
            color={`${active === 9 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/dashboard-refunds" className="flex items-center w-full">
          <HiOutlineReceiptRefund
            size={25}
            color={`${active === 10 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#FF8474]" : "text-[#555]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/dashboard-settings" className="flex items-center w-full">
          <CiSettings
            size={25}
            color={`${active === 11 ? "006665" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[#FF8474]" : "text-[#555]"
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
