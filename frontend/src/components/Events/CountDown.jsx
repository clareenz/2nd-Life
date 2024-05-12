import React, { useEffect, useState } from "react";
import { Button } from "antd";
import styles from "../../styles/styles";
import { LuShoppingCart } from "react-icons/lu";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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
          <div className="px-[150px]">
            <div
              className={`${styles.button6} bg-[#006665] hover:bg-[#FF8474]`}
            >
              {" "}
              <span className="text-white flex flex-row">
                {" "}
                <LuShoppingCart className="mt-1 mx-1" /> Buy Now
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <span className="text-[red] text-[25px]">Time's up!</span>
        </>
      )}
    </div>
  );
};

export default CountDown;
