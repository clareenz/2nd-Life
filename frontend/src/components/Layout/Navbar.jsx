import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#fe8373]"
                  : "text-black 800px:text-black"
              } pb-[30px] 800px:pb-0 font-[500] text-sm px-4 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

const Navbar2 = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#fe8373] bg-[#FFEAE8] rounded-lg border-white"
                  : "text-black 800px:text-black"
              } py-2 font-[500] text-sm px-4 cursor-pointer} border-[2px] border-white w-full hover:bg-[#F0F0F0] hover:rounded-lg `}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export  {Navbar, Navbar2};
