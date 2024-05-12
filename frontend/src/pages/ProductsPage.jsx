/* The Products page
 * start time: 7:00:00 (first vid)
 */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import { ProductCard, ProductCard2 } from "../components/Route/ProductCard/ProductCard";

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
          <Header activeHeading={3} />
          <div className="flex items-center mb-4 absolute left-10 mt-[16px] ">
              <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
                {/* Small box */}
              </div>
              <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">Products MAMA</h1>
            </div>
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className=" mt-[25px] grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
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
      )}
    </>
  );
};

export default ProductsPage;
