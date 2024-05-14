import React, { useState, useEffect } from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import { Modal } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { Link } from "react-router-dom";
import "./custom.slider.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const EventCard = ({ active, data, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [interval] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const hasEvents = data && data.images && data.images.length > 0;
  const activeEvent = +new Date(data.start_Date) < +new Date();
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }, 5000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [data.images.length]);

  return (
    <div className="flex flex-row justify-center">
      <div
        className={`w-[45%] h-[80%] bg-white shadow p-9 rounded-lg container__slider1 ${
          active ? "unset" : "mb-12"
        } lg:flex p-9 mt-1 mb-2`}
        onMouseEnter={() => clearInterval(interval)}
        onMouseLeave={() => {
          const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % data.images.length);
          }, 5000);
        }}
      >
        {hasEvents ? (
          activeEvent ? (
            <div className="flex flex-row justify-center slider-container">
              <img
                src={`${backend_url}${data.images[activeIndex]}`}
                alt=""
                onClick={showModal}
                className=""
              />
              <div className="slider-buttons">
                <button
                  className="slider__btn-next"
                  onClick={() =>
                    setActiveIndex(
                      (prevIndex) => (prevIndex + 1) % data.images.length
                    )
                  }
                >
                  <IoIosArrowForward />
                </button>
                <button
                  className="slider__btn-prev"
                  onClick={() =>
                    setActiveIndex((prevIndex) =>
                      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
                    )
                  }
                >
                  <IoIosArrowBack />
                </button>
              </div>
              <div className="slider-dots">
                {data.images.map((image, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  ></button>
                ))}
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
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <div className="h-[80%] mt-8">
          <div>
            <Link to={`/product/${data._id}?isEvent=true`}>
              {/* Display image */}
              <img
                src={`${backend_url}${data.images && data.images[0]}`}
                alt=""
                className="mb-4"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Link>
          </div>
          <div className="w-full 800px:w-[50%]">
            <div className="flex flex-row mt-[70px]">
              <div>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={`${backend_url}${data?.shop?.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </Link>
              </div>
              <div>
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className={`${styles.shop_name}`}
                >
                  {data.shop.name}
                </Link>
                <h5 className="text-[13px] mt-1">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
          </div>
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
  const [interval] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }, 5000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [data.images.length]);

  return (
    <div className="flex flex-row justify-center">
      <div
        className={`h-[80%] bg-white shadow rounded-lg container__slider ${
          active ? "unset" : "mb-12"
        } lg:flex p-9 mt-1`}
      >
        {hasEvents ? (
          activeEvent ? (
            <div className="flex flex-row slider-container">
              <img
                src={`${backend_url}${data.images[activeIndex]}`}
                alt=""
                onClick={showModal}
                className=" w-auto"
              />
              <div className="slider-buttons">
                <button
                  className="slider__btn-next"
                  onClick={() =>
                    setActiveIndex(
                      (prevIndex) => (prevIndex + 1) % data.images.length
                    )
                  }
                >
                  <IoIosArrowForward />
                </button>
                <button
                  className="slider__btn-prev"
                  onClick={() =>
                    setActiveIndex((prevIndex) =>
                      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
                    )
                  }
                >
                  <IoIosArrowBack />
                </button>
              </div>
              <div className="slider-dots">
                {data.images.map((image, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  ></button>
                ))}
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
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <div className="h-[80%] mt-8">
          {/* Display image */}
          <img
            src={`${backend_url}${data.images[0]}`}
            alt={data.name}
            className="mb-4"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <div className="w-full 800px:w-[50%]">
            <div className="flex flex-row mt-[70px]">
              <div>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={`${backend_url}${data?.shop?.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </Link>
              </div>
              <div>
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className={`${styles.shop_name}`}
                >
                  {data.shop.name}
                </Link>
                <h5 className="text-[13px] mt-1">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
          </div>
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
