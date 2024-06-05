/* Footer part
 * start time: 6:42:08 (first vid)
 */

import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#DBDAD8] text-white ">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-9 sm:px-8 px-5 py-10 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center ">
          <img
            className=""
            src="2ndLifeBuy&Sell.png"
            alt="logo2"
            style={{ width: "250px", height: "auto" }}
          />
          <br />
          <p className="text-black">
            "where secondhand is the first choice"
          </p>{" "}
          {/* put the tagline of our website here */}
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", color: "black" }}
            />
            <AiFillTwitterCircle
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", color: "black" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", color: "black" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", color: "black" }}
            />
          </div>
        </ul>

        <div>
          <ul className="text-center sm:text-start pb-5">
            <h1 className="mb-1 font-semibold text-black">NAMS Tech</h1>
            {footerProductLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-gray-400 hover:text-[#FF8474] duration-300
                    text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-black">SUPPORT</h1>
            {footerSupportLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-gray-400 hover:text-[#FF8474] duration-300
                    text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-black">SCHOOL</h1>
            <h6 className="text-[#9CA3AF] text-[14px]">University of the Philippines Cebu</h6>
            <h6 className="text-[#9CA3AF] text-[14px]">Bachelor of Science in Computer Science</h6>
          </ul>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-black text-sm pb-8"
      >
        <span>© 2024 NAMS Tech. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex flex-row items-center justify-center w-full">
          <div className="flex space-x-2">
            <div>
              <img src="gcash.jpg" alt="" className="w-[50px] h-[30px]" />
            </div>
            <div>
              <img src="maya.jpg" alt="" className="w-[50px] h-[30px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

export { Footer };
