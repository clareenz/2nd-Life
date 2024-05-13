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
            <div className="flex justify-end mt-4 mr-9 mb-8 pt-[80px] px-[10mm]">
              <div className="flex items-center mb-4 absolute left-10 px-[10mm]">
                <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
                  {/* Small box */}
                </div>
                <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">
                  Events
                </h1>
              </div>
              <div className="">
                <button
                  className={`mr-2 text-[13px] ${
                    viewType === "grid" ? "bg-[#FFEAE8]" : "bg-white"
                  } px-3 py-1 rounded-md`}
                  onClick={switchToGridView}
                >
                  Grid View
                </button>
                <button
                  className={`mr-2 text-[13px] ${
                    viewType === "list" ? "bg-[#FFEAE8]" : "bg-white"
                  } px-3 py-1 rounded-md`}
                  onClick={switchToListView}
                >
                  List View
                </button>
              </div>
            </div>
            {viewType === "grid" ? (
              <div className={`pt-[15px]`}>
                <div className="grid gap-[20px] md:grid-cols-2 lg:grid-cols-2">
                  {allEvents.map((event) => (
                    <EventCard2 key={event.id} active={true} data={event} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-[15px]">
                <div className="md:grid-cols-2">
                  {allEvents.map((event) => (
                    <EventCard key={event.id} active={true} data={event} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
