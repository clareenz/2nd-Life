/* The events part of the homepage. They could be like the sales of products or something
start time: 6:16:07 (first vid)
 */

import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard.jsx";

const Events = () => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>

        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Events;
