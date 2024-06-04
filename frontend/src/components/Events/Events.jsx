/* The events part of the homepage. They could be like the sales of products or something
start time: 6:16:07 (first vid)
 */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { EventCard, EventCard2 } from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  console.log(allEvents);
  return (
    <div>
      {!isLoading && (
        <div className={`2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-20 px-10 pb-8`}>
          <div className="flex items-center mb-4">
            <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
              {/* Small box */}
            </div>
            <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">
              Popular Events
            </h1>
          </div>
          {allEvents && allEvents.length > 0 ? (
            <div className="">
              <EventCard data={allEvents[0]} />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center text-md">
              <p className="text-gray-500">No events</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
