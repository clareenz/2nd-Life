import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex1}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section3} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Vintage vibes, <br/>modern value
        </h1>
        <Link to="/products" className="inline-block">
          <div
            className={`${styles.button1} mt-5`}
            style={{ borderRadius: "100px" }}
          >
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now!
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
