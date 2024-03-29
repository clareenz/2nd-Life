import React from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";

const EventCard = ({ active, data }) => {
  // Check if data exists and contains images
  const hasEvents = data && data.images && data.images.length > 0;

  return (
    <div
      className={`w-full block  rounded-xl bg-white ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 mb-12`}
    >
      {hasEvents ? ( // dito papasok if may events
        <>
          <div className="w-full lg:-w[50%] m-auto">
            <img src={`${backend_url}${data.images[0]}`} alt="" />
          </div>
          <div className="w-full lg:[w-50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}>{data.name}</h2>
            <p>{data.description}</p>
            <div className="flex py-2 justify-between">
              <div className="flex">
                <h5 className="font-[500] text-[10px] text-[#d55b45] pr-3 line-through">
                  P{data.originalPrice}
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                  P{data.discountPrice}
                </h5>
              </div>
              <span className="pr-3 font-[400] text-[14px] text-[#44a55e]">
                120 sold
              </span>
            </div>
            <CountDown data={data} />
            <br />
          </div>
        </>
      ) : ( //display this if walang events
        <div className="w-full flex justify-center items-center text-md">
          <p className="text-gray-500">Events coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default EventCard;
