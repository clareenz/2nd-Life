import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../../styles/styles";
import { ProductCard, ProductCard2 } from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Number of cards to show in one slide
    slidesToScroll: 6, // Number of cards to scroll on arrow click
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
        },
      },
    ],
  };


  return (
    <div>
      <div className={`2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-20 px-10 pb-8`}>
        <div className="flex items-center mb-4">
          <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
            {/* Small box */}
          </div>
          <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">
            Best Deals
          </h1>
        </div>
        <Slider {...settings}>
          {data &&
            data.length !== 0 &&
            data.map((i, index) => (
              <div className="px-1">
                <ProductCard data={i} key={index} />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestDeals;
