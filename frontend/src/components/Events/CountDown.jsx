import { message } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [value, setValue] = useState(data?.qty || 1);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      message.error("Item already in cart!");
    } else {
      if (data.stock < value) {
        message.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: value };
        dispatch(addToCart(cartData));
        message.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? (
        <div className="items-center">
          <span className="text-sm">
            {timerComponents.map((component, index) => (
              <span key={index}>{component}</span>
            ))}
          </span>
          <div className=" flex flex-row space-x-3 px-[70px]">
            <div
              className={`${styles.button6} bg-[#006665] hover:bg-[#FF8474]`}
            >
              {" "}
              <span className="text-white flex flex-row">
                {" "}
                Buy Now <LuShoppingBag className="mt-1 mx-1" />
              </span>
            </div>
            <div
              className={`${styles.button6}  bg-[#006665] hover:bg-[#FF8474]`}
              onClick={() => addToCartHandler(data._id)}
            >
              <span className="flex items-center text-white">
                Add to Cart <AiOutlineShoppingCart className="mr-1" />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <span className="text-slate-400 text-[20px]">Promo Ended</span>
        </>
      )}
    </div>
  );
};

export default CountDown;
