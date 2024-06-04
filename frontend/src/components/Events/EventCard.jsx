import React, { useState, useEffect } from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import { Modal } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { Link } from "react-router-dom";
import "./custom.slider.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineMessage } from "react-icons/ai";

const EventCard = ({ active, data = {}, shop }) => {
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
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (hasEvents) {
      const id = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % data.images.length);
      }, 5000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [data.images, hasEvents, shop]);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div
        className={` h-[80%] bg-white shadow p-9 rounded-lg container__slider ${
          active ? "unset" : "mb-12"
        } lg:flex p-9 mt-1`}
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
                src={`${data.images[activeIndex]?.url}`}
                alt=""
                onClick={showModal}
                className="w-full object-cover"
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
            <div className="flex items-center justify-center w-full text-md">
              <p className="text-gray-500">Event coming soon!</p>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center w-full text-md">
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
                src={`${data.images && data.images[0]?.url}`}
                alt=""
                className="w-full h-auto object-cover"
              />
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-row mt-[10px]">
              <div>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={`${data?.shop?.avatar?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </Link>
              </div>
              <div className="marquee">
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
            <div
              className={`${styles.button6} ml-2 !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
              onClick={handleMessageSubmit}
            >
              <span className="text-white text-[13px] mr-1">Message</span>
              <AiOutlineMessage className="text-white" />
            </div>
          </div>
          {/* Display name */}
          <h1 className={`${styles.productTitle} text-[20px]`}>{data?.name}</h1>

          {/* Display description */}
          <div style={{ width: "100%" }}>
            <Paragraph style={{ textAlign: "justify", wordWrap: "break-word" }}>
              {data.description}
            </Paragraph>
          </div>

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



export { EventCard };