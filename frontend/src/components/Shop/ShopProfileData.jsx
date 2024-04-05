import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Tabs, Typography, Button } from "antd";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import './color.css';

const { TabPane } = Tabs;
const { Title } = Typography;

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState("products");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return ( //right side
    <div className="w-full mt-4">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Shop Products" key="products">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {products &&
              products.map((product, index) => (
                <ProductCard data={product} key={index} isShop={true} />
              ))}
          </div>
          {products && products.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Products available for this shop!
            </h5>
          )}
        </TabPane>
        <TabPane tab="Running Events" key="events">
          {/* Replace this with running events content */}
          <Title level={5}>Running Events Content</Title>
        </TabPane>
        <TabPane tab="Shop Reviews" key="reviews">
          {/* Replace this with shop reviews content */}
          <Title level={5}>Shop Reviews Content</Title>
        </TabPane>
      </Tabs>
      {isOwner && (
        <div className="absolute top-0 right-0 mt-1 mr-3">
          <Link to="/dashboard">
            <div  className={`${styles.button6} text-white bg-[#006665] rounded-3xl text-[14px] hover:bg-[#077773]`}>
              Go Dashboard
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
