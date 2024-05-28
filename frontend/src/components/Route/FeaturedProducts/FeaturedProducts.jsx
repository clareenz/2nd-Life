import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import { ProductCard, ProductCard2 } from "../ProductCard/ProductCard";
import Slider from 'react-slick';

const FeaturedProducts = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Number of cards to show in one slide
    slidesToScroll: 6, // Number of cards to scroll on arrow click
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-20 px-10">
      <div className="flex items-center mb-4">
        <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
          {/* Small box */}
        </div>
        <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">
          Featured Products
        </h1>
      </div>
      {allProducts && allProducts.length !== 0 && (
        <>
          {!showAll && (
            <Slider {...settings}>
              {allProducts.map((product, index) => (
                <div key={index} className="px-2">
                  <ProductCard data={product} />
                </div>
              ))}
            </Slider>
          )}
          <div className="flex justify-center p-6">
            <button
              className="bg-[#006665] hover:bg-[#FF8474] text-white py-2 px-4 rounded-full  "
              onClick={toggleShowAll}
            >
              {showAll ? "Hide" : "View All"}
            </button>
          </div>
          {showAll && (
            <div className="grid grid-cols-2 gap-[20px]
            sm:grid-cols-3 sm:gap-[13px]
            md:grid-cols-4 md:gap-[13px]
            lg:grid-cols-5 lg:gap-[20px]
            xl:grid-cols-6 xl:gap-[20px]
            2xl:grid-cols-7 2xl:gap-[20px]mb-12 border-0">
              {allProducts.map((product, index) => (
                <div key={index} className="">
                  <ProductCard data={product} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;
