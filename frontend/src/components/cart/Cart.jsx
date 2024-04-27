import React, { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { message, Modal } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <Modal
      title="Your Cart"
      visible={true} // Set this to true to display the modal
      onCancel={() => setOpenCart(false)} // Handle closing the modal
      footer={null}
      style={{
        position: "fixed",
        top: "7%",
        right: "2%",
        transform: "translate(0, 0)",
        margin: 0,
      }}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }} // Added style for scrollbar
    >
      <div className="flex flex-col justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-[300px]  flex items-center justify-center">
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <div className="border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3 mt-6 flex flex-row justify-between">
            <div>Total: ₱{totalPrice}</div>
              {/* checkout buttons */}
              <Link to="/checkout">
                <div className={`${styles.cart_button}`}>
                  <h1 className="text-[#fff] text-[15px] font-[400] px-3">
                    Checkout Now
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value + 1) {
      message.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    if (value === 1) {
      // Minimum quantity reached, do nothing or show a message
      return;
    }
    setValue(value - 1);
    const updateCartData = { ...data, qty: value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="flex flex-row justify-between">
        <div className="flex items-center">
          {data.stock > 1 && (
            <>
              <div
                className={`${styles.noramlFlex} justify-center cursor-pointer`}
                onClick={() => increment(data)}
              >
                <CiSquarePlus size={15} color="black" />
              </div>
              <span className="px-[10px]">{value}</span>
              <div
                className={`${styles.noramlFlex} justify-center cursor-pointer`}
                onClick={() => decrement(data)}
              >
                <CiSquareMinus size={15} color="black" />
              </div>
            </>
          )}
          <img
            src={`${backend_url}${data?.images[0]}`}
            alt=""
            className="w-[70px] h-min ml-2 mr-2 rounded-[5px]"
          />
          <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[400] text-[12px] text-[#00000082]">
            ₱{data.discountPrice} * {value}
            </h4>
            <h4 className="font-[600] text-[12px] pt-[3px] text-[#d02222] font-Roboto">
              ₱{totalPrice}
            </h4>
          </div>
        </div>
        <FaRegTrashCan
          className="cursor-pointer justify-between mt-7"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
