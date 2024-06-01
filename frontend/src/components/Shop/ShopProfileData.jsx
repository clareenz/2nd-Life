import { Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllEventsShop } from "../../redux/actions/event"; // Import action to fetch events
import { ProductCard, ProductCard2 } from "../Route/ProductCard/ProductCard";
import { EventCard2 } from "../Events/EventCard";
import "./color.css";
import Ratings from "../Products/Ratings";

const { TabPane } = Tabs;
const { Title } = Typography;

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events); // Fetch events from Redux store
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id)); // Fetch events when component mounts
  }, [dispatch, id]);

  const [activeTab, setActiveTab] = useState("products");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full mt-4">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Shop Products" key="products">
          <div
            className="grid grid-cols-2 gap-[20px]
              sm:grid-cols-3 sm:gap-[13px]
              md:grid-cols-4 md:gap-[13px]
              lg:grid-cols-5 lg:gap-[10px]
              xl:grid-cols-5 xl:gap-[10px]
              2xl:grid-cols-7 2xl:gap-[20px] mb-12 border-0"
          >
            {isOwner ? (
              <>
                {products &&
                  products.map((product, index) => (
                    <ProductCard2 data={product} key={index} isShop={true} />
                  ))}
              </>
            ) : (
              <>
                {products &&
                  products.map((product, index) => (
                    <ProductCard data={product} key={index} isShop={true} />
                  ))}
              </>
            )}
          </div>
          {products && products.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Products available for this shop!
            </h5>
          )}
        </TabPane>
        <TabPane tab="Running Events" key="events">
          <Title level={5}>Running Events Content</Title>
          {/* Display running events */}
          {events &&
            events.map((event, index) => (
              <EventCard2 data={event} key={index} />
            ))}
          {events && events.length === 0 && (
            <div className="no-events-container">
              <h5 className="no-events-message">
                No events available for this shop!
              </h5>
            </div>
          )}
        </TabPane>

        <TabPane tab="Shop Reviews" key="reviews">
          <Title level={5}>Shop Reviews Content</Title>
          <div className="w-full">
            {allReviews && allReviews.length > 0 ? (
              allReviews.map((item, index) => (
                <div className="flex w-full my-4" key={index}>
                  <img
                    src={`${item.user.avatar?.url}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt={`${item.user.name}'s avatar`}
                  />
                  <div className="pl-2">
                    <div className="flex items-center w-full">
                      <h1 className="font-[600] pr-2">{item.user.name}</h1>
                      <Ratings rating={item.rating} />
                    </div>
                    <p className="font-[400] text-[#000000a7]">
                      {item.comment}
                    </p>
                    <p className="text-[#000000a7] text-[14px]">
                      {"2 days ago"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="w-full text-center py-5 text-[18px]">
                No Reviews have for this shop!
              </h5>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ShopProfileData;
