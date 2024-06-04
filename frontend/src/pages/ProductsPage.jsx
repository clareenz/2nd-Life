/* The Products page
 * start time: 7:00:00 (first vid)
 */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import {
  ProductCard,
  ProductCard2,
} from "../components/Route/ProductCard/ProductCard";
import { Footer } from "antd/es/layout/layout";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0,0);
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="pt-[96px]">
            <Header activeHeading={3} />
            <div className="flex items-center absolute left-10 xl:px-[10mm] lg:px-[10mm] md:px-[10mm] sm:px-[10mm]">
              <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
                {/* Small box */}
              </div>
              <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">
                Products
              </h1>
            </div>
            <br />
            <br />
            <div
              className={`${styles.section} xl:px-[10mm] lg:px-[10mm] md:px-[10mm] sm:px-[10mm]`}
            >
              <div
                className=" mt-[25px] grid grid-cols-2 gap-[20px]
              sm:grid-cols-3 sm:gap-[13px]
              md:grid-cols-4 md:gap-[13px]
              lg:grid-cols-5 lg:gap-[20px]
              xl:grid-cols-6 xl:gap-[20px]
              2xl:grid-cols-7 2xl:gap-[20px]
               mb-12"
              >
                {data &&
                  data.map((i, index) => <ProductCard data={i} key={index} />)}
              </div>
              {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products found!
                </h1>
              ) : null}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
