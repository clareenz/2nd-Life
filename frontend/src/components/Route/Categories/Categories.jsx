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
    slidesToShow: 8,
    slidesToScroll: 5,
    autoplay: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
          centerMode: true,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
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
                  className="w-[130px] h-[100px] object-cover items-center"
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
