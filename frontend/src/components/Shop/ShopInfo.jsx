import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { backend_url, server } from "../../server";
import { Typography, Divider, Button, Avatar, Spin } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import styles from "../../styles/styles";

const { Title, Text } = Typography;

const ShopInfo = ({ isOwner }) => {
  //left side
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
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
  }, []);

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <Spin spinning={isLoading}>
      <div>
        <div className="text-center">
          <Avatar
            src={`${backend_url}${data.avatar}`}
            size={150}
            className="mt-10"
          />
          <Title level={3}>{data.name}</Title>
          <Text>{data.description}</Text>
        </div>
        <Divider />
        <div className="px-3 py-2">
          <div className="flex items-center">
            <EnvironmentOutlined />
            <Title level={5} className="ml-2 mb-0">
              Address
            </Title>
          </div>
          <Text className="ml-6">{data.address}</Text>
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center">
            <PhoneOutlined />
            <Title level={5} className="ml-2 mb-0">
              Phone Number
            </Title>
          </div>
          <Text className="ml-6">{data.phoneNumber}</Text>
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center">
            <ShoppingCartOutlined />
            <Title level={5} className="ml-2 mb-0">
              Total Products
            </Title>
          </div>
          <Text className="ml-6">10</Text>
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center">
            <StarOutlined />
            <Title level={5} className="ml-2 mb-0">
              Shop Ratings
            </Title>
          </div>
          <Text className="ml-6">4/5</Text>
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center">
            <CalendarOutlined />
            <Title level={5} className="ml-2 mb-0">
              Joined On
            </Title>
          </div>
          <Text className="ml-6">{data?.createdAt?.slice(0, 10)}</Text>
        </div>
        {isOwner && (
          <div className="py-3 px-4">
            <Link to="/settings">
              <div
                type="primary"
                className={`${styles.button6} w-full mb-2 rounded-3xl text-white bg-[#006665] hover:bg-[#077773] transition-all`}
              >
                Edit Shop
              </div>
            </Link>
            <div
              className={`${styles.button6} w-full mb-2 rounded-3xl hover:text-[#62B9B6] hover:border-[#62B9B6] border-[#077773] text-[#077773]`}
              onClick={logoutHandler}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default ShopInfo;
