/* The Wishlist feature
 *  start time: 37:40 (2nd vid)
 */
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
import { addToCart } from "../../redux/actions/cart";
import { Modal } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { LiaCartPlusSolid } from "react-icons/lia";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(true);
  };

  return (
    <Modal
      title="Your Wishlist"
      visible={true} // Set this to true to display the modal
      onCancel={() => setOpenWishlist(false)} // Handle closing the modal
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
      {wishlist && wishlist.length === 0 ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <h5>Wishlist Items is empty!</h5>
        </div>
      ) : (
        <>
          <div>
            {/* Item length */}
            <div className="flex items-center p-4">
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length} items
              </h5>
            </div>

            {/* Wishlist Single Items */}
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="flex flex-row p-4 border-b">
      <div className="flex items-center w-full">
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[70px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[12px] pt-[3px] text-[#d02222] font-Roboto">
            ₱{totalPrice}
          </h4>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="">
          <LiaCartPlusSolid
            size={20}
            className="mb-8 cursor-pointer"
            title="Add to Cart"
            onClick={() => addToCartHandler(data) || removeFromWishlistHandler(data)}
          />
        </div>
        <div className="ml-1 ">
          <FaRegTrashCan
            size={15}
            className="cursor-pointer"
            onClick={() => removeFromWishlistHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
