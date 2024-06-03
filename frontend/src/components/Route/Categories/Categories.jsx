import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoriesData, brandingData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 5,
    autoplay: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1920, // Large desktop screens
        settings: {
          slidesToShow: 7.5,
          slidesToScroll: 4,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 1440, // Medium desktop screens
        settings: {
          slidesToShow: 6.5,
          slidesToScroll: 4,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 1280, // Small desktop screens
        settings: {
          slidesToShow: 5.5,
          slidesToScroll: 3,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 1024, // Tablets in landscape mode
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 3,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 768, // Tablets in portrait mode
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 2,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 640, // Large smartphones
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 480, // Small smartphones
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 320, // Extra small smartphones
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
    <div className=" pt-[50px] 2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-20 px-10 pb-8">
      {/* <div
        className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
      >
        {brandingData &&
          brandingData.map((i, index) => (
            <div className="flex items-start" key={index}>
              {i.icon}
              <div className="px-3">
                <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                <p className="text-xs md:text-sm">{i.Description}</p>
              </div>
            </div>
          ))}
      </div> */}
      <div className="flex items-center mb-4">
        <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
          {/* Small box */}
        </div>
        <h1 className="ml-2 text-[#FE8373] font-bold text-[21px] ">
          Categories
        </h1>
      </div>

      <div className={`rounded-xl bg-white p-4`} id="categories">
        <Slider {...sliderSettings}>
          {categoriesData &&
            categoriesData.map((category) => (
              <div
                key={category.id}
                className=" cursor-pointer"
                onClick={() => navigate(`/products?category=${category.title}`)}
              >
                <img
                  src={category.image_Url}
                  className="w-[90px] h-[100px] object-cover items-center"
                  alt=""
                />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Categories;
