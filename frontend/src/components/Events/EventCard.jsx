import React, { useState } from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import { Modal } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const EventCard = ({ active, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const hasEvents = data && data.images && data.images.length > 0;
  const activeEvent = +new Date(data.start_Date) < +new Date();

  return (
    <div className="flex flex-row justify-center">
      <div
        className={`w-[45%] h-[80%] bg-white shadow p-9 rounded-lg ${
          active ? "unset" : "mb-12"
        } lg:flex p-9 mt-1 mb-2`}
      >
        {hasEvents ? (
          activeEvent ? (
            <div className="flex flex-row">
              <div className="w-[45%] h-[80%]">
                {/* Add onClick to trigger modal */}
                <img
                  src={`${backend_url}${data.images[0]}`}
                  alt=""
                  onClick={showModal}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="w-full lg:[w-80%] flex flex-col px-[50px]">
                {/* Add onClick to trigger modal */}
                <h2
                  className={`${styles.productTitle}`}
                  onClick={showModal}
                  style={{ cursor: "pointer" }}
                >
                  {data.name}
                </h2>
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
            <div className="w-full flex justify-center items-center text-md">
              <p className="text-gray-500">Event coming soon!</p>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center items-center text-md">
            <p className="text-gray-500">No events</p>
          </div>
        )}
      </div>

      {/* Ant Design Modal */}
      <Modal
        title={data.name}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="h-[80%]">
          {/* Display image */}
          <img
            src={`${backend_url}${data.images[0]}`}
            alt={data.name}
            className="mb-4"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {/* Display name */}
          <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>

          {/* Display description */}
          <Paragraph>{data.description}</Paragraph>

          {/* Display price */}
          <div className="flex items-center mb-4">
            <h4 className={`${styles.productDiscountPrice} mr-2`}>
              ₱{data.discountPrice}
            </h4>
            {data.originalPrice && (
              <h3 className={`${styles.price1}`}>₱{data.originalPrice}</h3>
            )}
          </div>
          <CountDown data={data} />
        </div>
      </Modal>
    </div>
  );
};

const EventCard2 = ({ active, data }) => {
  // Check if data exists and contains images
  const hasEvents = data && data.images && data.images.length > 0;
  const activeEvent = +new Date(data.start_Date) < +new Date();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-row justify-center">
      <div
        className={`w-[100%] h-[80%] bg-white shadow p-9 rounded-lg ${
          active ? "unset" : "mb-12"
        } lg:flex p-9 mt-1`}
      >
        {hasEvents ? (
          activeEvent ? (
            <div className="flex flex-row">
              <div className="w-[45%] h-[80%]">
                {/* Add onClick to trigger modal */}
                <img
                  src={`${backend_url}${data.images[0]}`}
                  alt=""
                  onClick={showModal}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="w-full lg:[w-80%] flex flex-col px-[50px]">
                {/* Add onClick to trigger modal */}
                <h2
                  className={`${styles.productTitle}`}
                  onClick={showModal}
                  style={{ cursor: "pointer" }}
                >
                  {data.name}
                </h2>
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
            <div className="w-full flex justify-center items-center text-md">
              <p className="text-gray-500">Event coming soon!</p>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center items-center text-md">
            <p className="text-gray-500">No events</p>
          </div>
        )}
      </div>

      {/* Ant Design Modal */}
      <Modal
        title={data.name}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="h-[80%]">
          {/* Display image */}
          <img
            src={`${backend_url}${data.images[0]}`}
            alt={data.name}
            className="mb-4"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {/* Display name */}
          <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>

          {/* Display description */}
          <Paragraph>{data.description}</Paragraph>

          {/* Display price */}
          <div className="flex items-center mb-4">
            <h4 className={`${styles.productDiscountPrice} mr-2`}>
              ₱{data.discountPrice}
            </h4>
            {data.originalPrice && (
              <h3 className={`${styles.price1}`}>₱{data.originalPrice}</h3>
            )}
          </div>
          <CountDown data={data} />
        </div>
      </Modal>
    </div>
  );
};

export { EventCard, EventCard2 };
