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
      <div className="md:flex md:justify-between md:items-start sm:px-12 px-4 bg-black py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> to us to get news,{" "}
          <br />
          events, and amazing offers!
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-500
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#FF8474] hover:bg-[#006665] duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-9 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            className=""
            src="/2ndlife%20logo%20word.png"
            alt="logo2"
            style={{ width: "140px", height: "auto" }}
          />
          <br />
          <p className="text-black">Discover the magic of yesteryears at prices that fit today's budget.</p>{" "}
          {/* put the tagline of our website here */}
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", color: "black"}}
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
          <h1 className="mb-1 font-semibold text-black">COMPANY</h1>
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
          <h1 className="mb-1 font-semibold text-black">SHOP</h1>
          {footercompanyLinks.map((link) => (
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

const Footer2 = () => {
  return (
    <div className="bg-[#DBDAD8] text-white">
      <div className="md:flex md:justify-between md:items-start sm:px-12 px-4 bg-black py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> to us to get news,{" "}
          <br />
          events, and amazing offers!
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-500
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#FF8474] hover:bg-[#006665] duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-9 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            className=""
            src="/2ndlife%20logo%20word.png"
            alt="logo2"
            style={{ width: "140px", height: "auto" }}
          />
          <br />
          <p className="text-black">Discover the magic of yesteryears at prices that fit today's budget.</p>{" "}
          {/* put the tagline of our website here */}
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", color: "black"}}
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
          <h1 className="mb-1 font-semibold text-black">COMPANY</h1>
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
          <h1 className="mb-1 font-semibold text-black">SHOP</h1>
          {footercompanyLinks.map((link) => (
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

export {Footer, Footer2};
