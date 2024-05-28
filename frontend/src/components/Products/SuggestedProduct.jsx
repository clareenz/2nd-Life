/* The products detail page
 *  start time: 1:35:54 / 5:05:08 (2nd vid)
 */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../Route/ProductCard/ProductCard";
const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-20 px-10`}>
          <div className="flex items-center mb-4">
            <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
              {/* Small box */}
            </div>
            <h1 className={`ml-2 text-[#FE8373] font-bold text-[21px]`}>Related Product</h1>
          </div>
          <div className="grid grid-cols-2 gap-[20px]
              sm:grid-cols-3 sm:gap-[13px]
              md:grid-cols-4 md:gap-[13px]
              lg:grid-cols-5 lg:gap-[20px]
              xl:grid-cols-6 xl:gap-[20px]
              2xl:grid-cols-7 2xl:gap-[20px] mb-12">
            {productData &&
              productData.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
