/* This is about sales and stuff. This page can be changed based on the needs
 *  start time: 7:13:00 (first vid)
 */

import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />
    </div>
  );
};

export default EventsPage;
