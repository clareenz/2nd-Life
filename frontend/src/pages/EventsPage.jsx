import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EventCard, EventCard2 } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const [viewType, setViewType] = useState("grid");

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
            <div className="flex justify-end mt-4 mr-9 mb-8">
              <div className="flex items-center mb-4 absolute left-10">
                <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
                  {/* Small box */}
                </div>
                <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">Products</h1>
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allEvents.map((event) => (
                  <EventCard2 key={event.id} active={true} data={event} />
                ))}
              </div>
            ) : (
              <div>
                {allEvents.map((event) => (
                  <EventCard key={event.id} active={true} data={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
