import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import {
  SellerCard,
  SellerCard2,
} from "../components/Route/ProductCard/SellerCard";

const BestSellingPage = () => {
  const [sellerData, setSellerData] = useState([]);
  const [view, setView] = useState("grid"); // Default view is grid
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts) {
      // Group products by seller
      const sellersMap = new Map();
      allProducts.forEach((product) => {
        const sellerId = product.shop._id;
        if (!sellersMap.has(sellerId)) {
          sellersMap.set(sellerId, product);
        }
      });
      // Convert Map values to an array of seller data
      const uniqueSellers = Array.from(sellersMap.values());
      setSellerData(uniqueSellers);
    }
  }, [allProducts]);

  const toggleView = (viewType) => {
    setView(viewType);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <div className="flex justify-end mt-4 mr-9 mb-8">
            <div className="flex items-center mb-4 absolute left-10">
              <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
                {/* Small box */}
              </div>
              <h1 className="ml-2 text-[#FE8373] font-bold">Stores</h1>
            </div>
            {/* Buttons to toggle view */}
            <button
              className={`mr-2 text-[13px] ${
                view === "grid" ? "bg-[#FFEAE8]" : "bg-white"
              } px-3 py-1 rounded-md`}
              onClick={() => toggleView("grid")}
            >
              Grid View
            </button>
            <button
              className={`mr-2 text-[13px] ${
                view === "list" ? "bg-[#FFEAE8]" : "bg-white"
              } px-3 py-1 rounded-md`}
              onClick={() => toggleView("list")}
            >
              List View
            </button>
          </div>
          <div className={`${styles.section}`}>
            {view === "grid" ? (
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {sellerData &&
                  sellerData.map((seller, index) => (
                    <SellerCard data={seller} key={index} />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {sellerData &&
                  sellerData.map((seller, index) => (
                    <SellerCard2 data={seller} key={index} />
                  ))}
              </div>
            )}
            {sellerData && sellerData.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products found!
              </h1>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
