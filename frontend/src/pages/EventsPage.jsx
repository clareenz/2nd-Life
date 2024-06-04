import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EventCard, EventCard2 } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const [viewType, setViewType] = useState("list");

  const switchToGridView = () => {
    setViewType("grid");
  };

  const switchToListView = () => {
    setViewType("list");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <Header activeHeading={4} />
            <div className="flex justify-end mt-4 mr-9 mb-8 pt-[80px] ">
              <div className="flex items-center mb-4 absolute left-3 2xl:-left-20 xl:left-20 lg:left-20 md:left-10 sm:left-6">
                <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
                  {/* Small box */}
                </div>
                <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">
                  Events
                </h1>
              </div>
            </div>
            {allEvents.length > 0 ? (
              <div className="pt-[15px]">
                <div className="gap-[20px] grid">
                  {allEvents.map((event) => (
                    <EventCard key={event.id} active={true} data={event} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center text-md">
                <p className="text-gray-500">No events</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
