/* The sponsored section in the homepage. We could use this as ads something and invite stores to pay para malagay store names nila sa homepage
 * start time: 6:38:07 (first vid)
 */

import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div className="pt-12">
      <div
        className={`${styles.section} hidden sm:block bg-white py-10  mb-12 cursor-pointer rounded-xl`}
      >
        <div className=" flex flex-row justify-center">
          <div className="">
            <img
              src="sponsors.png"
              style={{ width: "150px", objectFit: "contain" }}
              alt=""
            />
          </div>
          <div className="">
            <img
              src="sponsors.png"
              style={{ width: "150px", objectFit: "contain" }}
              alt=""
            />
          </div>
          <div className="">
            <img
              src="sponsors.png"
              alt=""
              style={{ width: "150px", objectFit: "contain" }}
            />
          </div>
          <div className="">
            <img
              src="sponsors.png"
              alt=""
              style={{ width: "150px", objectFit: "contain" }}
            />
          </div>
          <div className="">
            <img
              src="sponsors.png"
              alt=""
              style={{ width: "150px", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
