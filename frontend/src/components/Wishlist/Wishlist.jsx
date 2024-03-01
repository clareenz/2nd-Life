/* The Wishlist feature
*  start time: 37:40 (2nd vid)
 */

import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256 gb ssd and 5 gb ramasdad",
      description: "best iphone in the kilide",
      price: 10000000,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 5 gb ramasdad",
      description: "best iphone in the kilide",
      price: 543,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 5 gb ramasdad",
      description: "best iphone in the kilide",
      price: 234234,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 5 gb ramasdad",
      description: "best iphone in the kilide",
      price: 10000000,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex justify-end w-full pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/*Item length*/}
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>
       
          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>

      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="p-4 border-b">
      <div className="flex items-center w-full">
        <RxCross1 />
        <img src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png" alt=""
        className="w-[80px] h-[80px] ml-2"/>
       
         <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              ₱{totalPrice}
            </h4>
        </div>
       <div>
            <BsCartPlus size={20} className="cursor-pointer" title="Add to Cart" />
       </div>
      </div>
    </div>
  );
};

export default Wishlist;
