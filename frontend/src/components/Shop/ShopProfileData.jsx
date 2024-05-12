import { Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllEventsShop } from "../../redux/actions/event"; // Import action to fetch events
import styles from "../../styles/styles";
import { ProductCard, ProductCard2 } from "../Route/ProductCard/ProductCard";
import { EventCard2 } from "../Events/EventCard";
import "./color.css";

const { TabPane } = Tabs;
const { Title } = Typography;

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events); // Fetch events from Redux store
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id)); // Fetch events when component mounts
  }, [dispatch, id]);

  const [activeTab, setActiveTab] = useState("products");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="w-full mt-4">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Shop Products" key="products">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
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
          <div className="w-full flex justify-center">
            {/* Display running events */}
            <div className="text-[13px] rounded-md w-[70%]">
              {events &&
                events.map((event, index) => (
                  <EventCard2 data={event} key={index} />
                ))}
            </div>
            {events && events.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No events available for this shop!
              </h5>
            )}
          </div>
        </TabPane>
        <TabPane tab="Shop Reviews" key="reviews">
          {/* Replace this with shop reviews content */}
          <Title level={5}>Shop Reviews Content</Title>
        </TabPane>
      </Tabs>
      {isOwner && (
        <div className="absolute top-0 right-0 mt-1 mr-3">
          <Link to="/dashboard">
            <div
              className={`${styles.button6} text-white bg-[#006665] rounded-3xl text-[14px] hover:bg-[#077773]`}
            >
              Go Dashboard
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
