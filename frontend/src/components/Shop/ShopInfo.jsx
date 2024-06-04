import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import { Typography, Avatar, Spin, message, Button } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { AiOutlineCamera, AiOutlineMessage } from "react-icons/ai";
import Paragraph from "antd/es/typography/Paragraph";
import { SlUserFollow } from "react-icons/sl";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import styles from "../../styles/styles";

const { Title, Text } = Typography;

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    axios
      .get(`${server}/shop/logout`, { withCredentials: true })
      .then((res) => {
        message.success(res.data.message);
        window.location.reload(true);
        navigate("/shop-login");
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data._id;
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
          message.error(error.response.data.message);
        });
    } else {
      message.error("Please login to create a conversation");
    }
  };

  const handleDotsClick = (event) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };

  return (
    <Spin spinning={isLoading}>
      <div className="bg-[#f5f5f5] px-1 sm:px-[1] md:px-[1px] lg:px-[1px] xl:px-[1px] 2xl:px-[1px] py-10 relative">
        <div className="flex flex-col items-center">
          <div className="relative w-full" style={{ paddingTop: "37.037%" }}>
            <img
              src="/catcat.jpg"
              alt="Background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            {isOwner && (
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  // onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            )}
            <div className="absolute bottom-0 2xl:left-[150px] xl:left-[150px] lg:left-[150px] md:left-[150px] sm:left-[150px] left-1/2 transform -translate-x-1/2 z-10 text-center mb-[-125px]">
              <Avatar
                src={`${data.avatar?.url}`}
                size={160}
                className="border-4 border-white"
              />
              <div className="text-center">
                <Title level={3}>{data.name}</Title>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow w-full mt-5 p-6">
            <div>
              {isOwner && (
                <div className="absolute right-4 max-sm:top-5 z-10">
                  <Link to="/dashboard">
                    <div className="bg-[#006665] text-white rounded-3xl text-[14px] hover:bg-[#077773] px-4 py-2 cursor-pointer">
                      Go Dashboard
                    </div>
                  </Link>
                </div>
              )}
              {!isOwner && (
                <div className="absolute right-7 flex flex-row space-x-2 max-sm:hidden z-10">
                  <div
                    className={`border border-006665 my-3 justify-center cursor-pointer px-4 py-2 rounded-3xl h-8 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white text-[13px] mr-1">Message</span>
                    <AiOutlineMessage className="text-white" />
                  </div>
                  <div
                    className={`border border-006665 my-3 justify-center cursor-pointer px-4 py-2 rounded-3xl h-8 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                  >
                    <span className="text-[13px] text-white mr-1">Follow</span>
                    <SlUserFollow size={15} className="text-white" />
                  </div>
                </div>
              )}
            </div>
            <div className="relative ">
              <Button
                type="text"
                icon={<HiMiniEllipsisHorizontal size={30} title="options" />}
                onClick={handleDotsClick}
              />
              {showModal && (
                <div className="">
                  {isOwner ? (
                    <div className="absolute z-10 top-8 left-0 bg-white shadow-lg rounded-lg p-4 space-y-1">
                      <Link to="/settings">
                        <div
                          type="primary"
                          className="border border-006665 h-7 flex items-center cursor-pointer px-2 rounded-3xl text-white bg-[#006665] hover:bg-[#077773] transition-all"
                        >
                          Edit Shop
                        </div>
                      </Link>
                      <div
                        className={` border border-006665  h-7 items-center   cursor-pointer  px-3 rounded-3xl hover:text-[#62B9B6] hover:border-[#62B9B6] border-[#077773] text-[#077773]`}
                        onClick={logoutHandler}
                      >
                        Log Out
                      </div>
                    </div>
                  ) : (
                    <div className=" z-10 absolute top-8 left-0 bg-white shadow-lg rounded-lg p-4">
                      <Link
                        to={`/report-shop?shopId=${data._id}`}
                        className="ml-2"
                      >
                        Report this shop
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-[70px]">
              <Paragraph className="text-justify">{data.description}</Paragraph>
            </div>
            <div>
              <div className="flex flex-wrap mt-4">
                <div className="flex flex-col mb-4">
                  <div className="flex mb-2">
                    <EnvironmentOutlined className="mb-1" />
                    <Title level={5} className="ml-2 mb-0">
                      Address:
                    </Title>
                    <Text className="ml-1 mb-0">{data.address}</Text>
                  </div>

                  <div className="flex mb-2">
                    <PhoneOutlined className="mb-1" />
                    <Title level={5} className="ml-2 mb-0">
                      Phone Number:
                    </Title>
                    <Text className="ml-2 mb-0">{data.phoneNumber}</Text>
                  </div>

                  <div className="flex">
                    <ShoppingCartOutlined className="mb-1" />
                    <Title level={5} className="ml-2 mb-0">
                      Total Products:
                    </Title>
                    <Text className="ml-2 mb-0">
                      {products && products.length}
                    </Text>
                  </div>
                </div>

                <div className="flex flex-col mb-4 xl:px-10 lg:px-10 md:px-10 sm:px-10">
                  <div className="flex mb-2">
                    <StarOutlined className="mb-1" />
                    <Title level={5} className="ml-2 mb-0">
                      Shop Ratings:
                    </Title>
                    <Text className="ml-2 mb-0">{averageRating}/5</Text>
                  </div>

                  <div className="flex">
                    <CalendarOutlined className="mb-1" />
                    <Title level={5} className="ml-2 mb-0">
                      Joined On:
                    </Title>
                    <Text className="ml-2 mb-0">
                      {data?.createdAt?.slice(0, 10)}
                    </Text>
                  </div>
                </div>
              </div>

              {!isOwner && (
                <div className=" justify-center items-center flex flex-row space-x-2 sm:hidden">
                  <div
                    className="bg-[#006665] text-white rounded-3xl h-8 flex items-center justify-center cursor-pointer px-4 py-2 hover:bg-[#FF8474]"
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[13px] mr-1">Message</span>
                    <AiOutlineMessage size={15} className="text-white" />
                  </div>
                  <div className="bg-[#006665] text-white rounded-3xl h-8 flex items-center justify-center cursor-pointer px-4 py-2 hover:bg-[#FF8474]">
                    <span className="text-[13px] mr-1">Follow</span>
                    <SlUserFollow size={15} className="text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ShopInfo;
