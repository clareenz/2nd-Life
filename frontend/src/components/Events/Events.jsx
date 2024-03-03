/* The events part of the homepage. They could be like the sales of products or something
start time: 6:16:07 (first vid)
 */

import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard.jsx";

const Events = () => {
  return (
    <div>
      <div className={`${styles.section} ${styles.heading}`}>
        <div className={"flex items-center mb-4"}>
          <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
            {/* Small box */}
          </div>
          <h1 className="ml-2 text-[#FE8373] font-bold">Popular Events</h1>
        </div>
        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Events;
