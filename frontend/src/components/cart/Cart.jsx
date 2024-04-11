/* The Add to Cart feature
*  start time: 12:24 (2nd vid)
 */

import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";

const Cart = ({ setOpenCart }) => {

  const { Cart } = useSelector((state) => state.Cart);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-flex bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex justify-end w-full pt-5 pr-5">
            <RxCross1
              size={15}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />

          </div>
          {/*Item length*/}
          <div className={`${styles.normalFlex} p-2`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>
       
          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {Cart &&
              Cart.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>

        <div className="px-20 mb-3">
          {/* checkout button */}
          <Link to="/checkout">
            <div className={`${styles.cart_button}`}>
                <h1 className="text=[#fff] text-[18px]">
                  Checkout Now (₱100000000)</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    setValue(value + 1);
    const updateCartData = {...data, qty: value + 1}
  }

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = {...data, qty: value === 1 ? 1 : value - 1}
  }

  return (
    <div className="p-4 border-b">
      <div className="flex items-center w-full">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
              <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img src={`${backend_url}${data?.images[0]}`} alt=""
        className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
         <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">₱{data.discountPrice} * {value}</h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              ₱{totalPrice}
            </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;
