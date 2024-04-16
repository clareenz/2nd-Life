/* The inside of Best Deals
start: 5:20:57 (first vid) */

import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { message } from "antd";
import { addToCart } from "../../../redux/actions/cart";

const ProductCard = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buyNow = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      message.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        message.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        message.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div
        className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="w-[90%] h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                ₱
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.originalPrice}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? "₱" + data.originalPrice : null}
              </h4>
            </div>
            {/*  <span className="font-[400] text-[17px] text-[#68d284]">
              {data.total_sell} sold //number of item sold to pero di naman natin need.
            </span> */}
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to Wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick View"
          />
          <AiOutlineShoppingCart
            size={22}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to Cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>

        {/* Buy Now button */}

        {hovered && (
          <div
            className={`${styles.button5} flex items-center justify-center`}
            onClick={buyNow}
          >
            <span>Buy Now</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
