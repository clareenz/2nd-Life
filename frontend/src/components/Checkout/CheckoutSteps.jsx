import React from "react";
import {
  MdOutlineDoneAll,
  MdOutlineLocalShipping,
  MdOutlinePayment,
} from "react-icons/md";
import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  console.log(active);
  return (
    <div className="w-full flex justify-center pt-[70px]">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap justify-center">
        <div className={`${styles.normalFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>
              <MdOutlineLocalShipping size={17} className="mx-5" />
            </span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] 800px:w-[70px] h-[3px] !bg-[#006665]"
                : "w-[30px] 800px:w-[70px] h-[3px] !bg-[#C2DCDB]"
            }`}
          />
        </div>

        <div className={`${styles.normalFlex}`}>
          <div
            className={`${
              active > 1
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#C2DCDB]`
            }`}
          >
            <span
              className={`${
                active > 1
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#006665]`
              }`}
            >
              <MdOutlinePayment size={17} className="mx-5" />
            </span>
          </div>
        </div>

        <div className={`${styles.normalFlex}`}>
          <div
            className={`${
              active > 3
              ? "w-[30px] 800px:w-[70px] h-[3px] !bg-[#006665]"
              : "w-[30px] 800px:w-[70px] h-[3px] !bg-[#C2DCDB]"
            }`}
          />
          <div
            className={`${
              active > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#C2DCDB]`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#006665]`
              }`}
            >
            <MdOutlineDoneAll size={17} className="mx-5"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
