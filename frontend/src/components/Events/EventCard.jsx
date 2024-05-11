import React from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import Paragraph from "antd/es/skeleton/Paragraph.js";

const EventCard = ({ active, data }) => {
  // Check if data exists and contains images
  const hasEvents = data && data.images && data.images.length > 0;
  const activeEvent = +new Date(data.start_Date) < +new Date();


  return (
    <div className="flex flex-row justify-center">
      <div
        className={`w-[45%] h-[80%] bg-white shadow p-9 rounded-lg ${
          active ? "unset" : "mb-12"
        } lg:flex p-9 mt-1 mb-2`}
      >
        {hasEvents ? ( // Check if there are events
          activeEvent ? ( // Check if the event is active
            // Display event content if it has started and is active
            <div className="flex flex-row">
              <div className="w-[45%] h-[80%]">
                <img src={`${backend_url}${data.images[0]}`} alt="" />
              </div>
              <div className="w-full lg:[w-80%] flex flex-col px-[50px]">
                <h2 className={`${styles.productTitle}`}>{data.name}</h2>
                <Paragraph style={{ wordWrap: "break-word" }}>
                  {data.description}
                </Paragraph>
                <div className="flex py-2 justify-between">
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ₱{data.discountPrice}
                    </h4>
                    <h3 className={`${styles.price1}`}>
                      {data.originalPrice ? "₱" + data.originalPrice : null}
                    </h3>
                  </div>
                </div>
                <CountDown data={data} />
                <br />
              </div>
            </div>
          ) : (
            // Display message if the event is not active
            <div className="w-full flex justify-center items-center text-md">
              <p className="text-gray-500">Event coming soon!</p>
            </div>
          )
        ) : (
          // Display message if there are no events
          <div className="w-full flex justify-center items-center text-md">
            <p className="text-gray-500">No events</p>
          </div>
        )}
      </div>
    </div>
  );
  
};

const EventCard2 = ({ active, data }) => {
  // Check if data exists and contains images
  const hasEvents = data && data.images && data.images.length > 0;
  const activeEvent = +new Date(data.start_Date) < +new Date();

  return (
    <div className="flex flex-row justify-center">
      <div
        className={`w-[100%] h-[80%] bg-white shadow p-9 rounded-lg ${
          active ? "unset" : "mb-12"
        } lg:flex p-9 mt-1`}
      >
        {hasEvents && activeEvent ? ( // dito papasok if may events
          <div className=" flex flex-row">
            <div className="w-[45%] h-[80%]">
              <img src={`${backend_url}${data.images[0]}`} alt="" />
            </div>
            <div className="w-full lg:[w-80%] flex flex-col px-[50px]">
              <h2 className={`${styles.productTitle}`}>{data.name}</h2>
              <Paragraph style={{ wordWrap: "break-word" }}>
                {data.description}
              </Paragraph>
              <div className="flex py-2 justify-between">
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ₱{data.discountPrice}
                  </h4>
                  <h3 className={`${styles.price1}`}>
                    {data.originalPrice ? "₱" + data.originalPrice : null}
                  </h3>
                </div>
              </div>
              <CountDown data={data} />
              <br />
            </div>
          </div>
        ) : (
          //display this if walang events
          <div className="w-full flex justify-center items-center text-md">
            <p className="text-gray-500">Events coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { EventCard, EventCard2 };
