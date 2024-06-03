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
    <div className="bg-[#DBDAD8] text-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-9 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            className=""
            src="/2ndlife%20logo%20word.png"
            alt="logo2"
            style={{ width: "140px", height: "auto" }}
          />
          <br />
          <p className="text-black">
            Discover the magic of yesteryears at prices that fit today's budget.
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

        <ul className="text-center sm:text-start">
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
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-black text-sm pb-8"
      >
        <span>© 2024 NAMS Tech. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;

export { Footer };
