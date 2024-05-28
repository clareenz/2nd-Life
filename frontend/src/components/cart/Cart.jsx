import React, { useState, useEffect } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, toggleSelectItem, clearCart } from "../../redux/actions/cart";
import { message, Modal } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure every cart item has a `selected` field
    cart.forEach((item) => {
      if (typeof item.selected === 'undefined') {
        dispatch(addToCart({ ...item, selected: true }));
      }
    });
  }, [cart, dispatch]);

  const handleSelect = (productId) => {
    dispatch(toggleSelectItem(productId));
  };

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart
    .filter(item => item.selected)
    .reduce((acc, item) => acc + item.qty * item.discountPrice, 0);

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const handleDeleteAll = () => {
    dispatch(clearCart());
  };

  return (
    <Modal
      title="Your Cart"
      visible={true}
      onCancel={() => setOpenCart(false)}
      footer={null}
      style={{
        position: "fixed",
        top: "7%",
        right: "2%",
        transform: "translate(0, 0)",
        margin: 0,
      }}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <div className="flex flex-col justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              <div className="border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      handleSelect={handleSelect}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3 mt-6 flex flex-row justify-between">
              <div>Total: ₱{totalPrice}</div>
              <div className="flex flex-row">
                <button onClick={handleDeleteAll} className={`${styles.cart_button} mr-2`}>
                  <h1 className="text-[#fff] text-[15px] font-[400] px-3">
                    Delete All
                  </h1>
                </button>
                <Link to="/checkout">
                  <div className={`${styles.cart_button}`}>
                    <h1 className="text-[#fff] text-[15px] font-[400] px-3">
                      Checkout Now
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const CartSingle = ({ data, handleSelect, quantityChangeHandler, removeFromCartHandler }) => {
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
          <input
            type="checkbox"
            checked={data.selected}
            onChange={() => handleSelect(data._id)}
          />
          {data.stock > 1 ? (
            <>
              <div onClick={() => decrement(data)}>
                <CiSquareMinus size={15} color="black" />
              </div>
              <div className="px-[10px]">{value}</div>
              <div onClick={() => increment(data)}>
                <CiSquarePlus size={15} color="black" />
              </div>
            </>
          ) : (
            <>
              <div className="text-gray-400 mt-1.5">
                <button disabled>
                  <CiSquareMinus size={15} />
                </button>
              </div>
              <div className="px-[10px]">{value}</div>
              <div className="text-gray-400 mt-1.5">
                <button disabled>
                  <CiSquarePlus size={15} />
                </button>
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
