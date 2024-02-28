/* The inside of the events feature in the homepage
start time: 6:17:43 (first vid)
 */

import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";

const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2 mb-12`}>
      <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus at
          eveniet numquam dicta expedita architecto tempore non quod excepturi
          fugit, quo, earum distinctio, dignissimos accusamus officiis dolorum
          commodi consectetur possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus at
          eveniet numquam dicta expedita architecto tempore non quod excepturi
          fugit, quo, earum distinctio, dignissimos accusamus officiis dolorum
          commodi consectetur possimus.
        </p>
        <div className="flex py-2 justify-between">
            <div className="flex">
                <h5 className="font-[500] text-[10px] text-[#d55b45] pr-3 line-through">
                    ₱91,990.00 
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                    ₱66,990.00 
                </h5>
            </div>
            <span className="pr-3 font-[400] text-[14px] text-[#44a55e]">
                120 sold
            </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
