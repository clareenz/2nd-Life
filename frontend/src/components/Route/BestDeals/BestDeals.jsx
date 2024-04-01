/* Best Deals duh
start:  */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const {allProducts} = useSelector((state) => state.products);

  useEffect(() => {
    const firstFive = allProducts && allProducts.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section3} ${styles.heading}`}>
        <div className="flex items-center mb-4">
          <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
            {/* Small box */}
          </div>
          <h1 className="ml-2 text-[#FE8373] font-bold">Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
