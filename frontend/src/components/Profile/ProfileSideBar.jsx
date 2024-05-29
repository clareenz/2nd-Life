/* The Profile Sidebar stuff
 * start time: 1:43:45 (2nd vid)
 */

import React from "react";
import {
  AiOutlineKey,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";

const ProfileSideBar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  };

  return (
    <div className="pt-[90px]">
      <div className="xl:w-[250px] lg:w-[250px] bg-white shadow rounded-2xl p-4 pt-8">
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(1)}
        >
          <RxPerson size={20} color={active === 1 ? "006665" : ""} />
          <span
            className={`pl-3 ${
              active === 1 ? "text-[#FE8373]" : ""
            } 800px:block hidden`}
          >
            Profile
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(2)}
        >
          <HiOutlineShoppingBag
            size={20}
            color={active === 2 ? "006665" : ""}
          />
          <span
            className={`pl-3 ${
              active === 2 ? "text-[#FE8373]" : ""
            } 800px:block hidden`}
          >
            Orders
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(4) || navigate("/inbox")}
        >
          <AiOutlineMessage size={20} color={active === 4 ? "006665" : ""} />
          <span
            className={`pl-3 ${
              active === 4 ? "text-[#FE8373]" : ""
            } 800px:block hidden`}
          >
            Inbox
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(5)}
        >
          <MdOutlineTrackChanges
            size={20}
            color={active === 5 ? "006665" : ""}
          />
          <span
            className={`pl-3 ${
              active === 5 ? "text-[#FE8373]" : ""
            } 800px:block hidden`}
          >
            Track Order
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(6)}
        >
          <AiOutlineKey size={20} color={active === 6 ? "006665" : ""} />
          <span
            className={`pl-3 ${
              active === 6 ? "text-[#FE8373]" : ""
            } 800px:block hidden`}
          >
            Password
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(7)}
        >
          <TbAddressBook size={20} color={active === 7 ? "006665" : ""} />
          <span
            className={`pl-3 ${
              active === 7 ? "text-[#FE8373]" : ""
            } 800px:block hidden`}
          >
            Address
          </span>
        </div>

        {user && user?.role === "Admin" && (
          <Link to="/admin/dashboard">
            {" "}
            <div
              className="flex items-center cursor-pointer w-full mb-8"
              onClick={() => setActive(9)}
            >
              <MdOutlineAdminPanelSettings
                size={20}
                color={active === 9 ? "006665" : ""}
              />
              <span
                className={`pl-3 ${
                  active === 9 ? "text-[#FE8373]" : ""
                } 800px:block hidden`}
              >
                Admin Dashboard
              </span>
            </div>
          </Link>
        )}

        <div
          className="single_item flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(8) || logoutHandler()}
        >
          <AiOutlineLogout size={20} color={active === 8 ? "006665" : ""} />
          <span
            className={`pl-3 ${
              active === 8 ? "text-[#FE8373]" : ""
            } 800px:block hidden`}
          >
            Log Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
