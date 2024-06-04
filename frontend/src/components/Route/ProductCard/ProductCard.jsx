import { message } from "antd";
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import styles from "../../../styles/styles";
import {
  ProductDetailsCard,
  ProductDetailsCard2,
} from "../ProductDetailsCard/ProductDetailsCard";
import { IoBagHandleOutline } from "react-icons/io5";
import axios from "axios";
import { server } from "../../../server";

const ProductCard = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState();
  const [totalReview, setTotalReview] = useState();
  const [averageRating, setAverageRating] = useState();
  const [productId, setProductId] = useState();

  // buy now
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${server}/product/get-product/${data._id}`
        );
        const product = response.data.product;
        if (product) {
          setProductId(product._id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [data._id]);

  const buyNow = () => {
    if (productId) {
      navigate(`/checkoutBuyNow/${productId}`);
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  useEffect(() => {
    console.log("useEffect running with data:", data);

    const fetchNotifications = async () => {
      try {
        if (data && data._id) {
          console.log("Fetching reviews for product ID:", data.shop?._id);
          const response = await axios.get(
            `${server}/product/reviews/${data?._id}`
          );
          console.log("Response received:", response.data);
          setTotalReview(response.data.totalReview);
          setAverageRating(response.data.averageRating);
          console.log(response.data.averageRating);
          // message.success(response.success);
        } else {
          console.log("Product ID not available");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        message.error(error.message);
      }
    };

    fetchNotifications();
  }, [data]); // Add data to the dependency array

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
      <div className=" max-w-[220px] w-full max-h-[320px] bg-white rounded-lg shadow p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-cover"
          />
        </Link>
        <div className="flex flex-row justify-between mt-2">
          <div className="marquee">
            <Link
              to={`/shop/preview/${data?.shopId}`}
              className={`${styles.shop_name} text-[12px]`}
            >
              {data.shop.name}
            </Link>
          </div>
          <div>
            <h5 className="text-[12px] mt-1 marquee">
              ({averageRating}/5) Ratings
            </h5>
          </div>
        </div>
        <Link to={`/product/${data._id}`}>
          <div className="marquee">
            <h4 className="pb-3 font-[500] mt-3">{data.name}</h4>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="absolute p-1 bg-white rounded-full cursor-pointer right-4 top-5 w-7 h-7 "
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "#FF8474" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="absolute p-1 bg-white rounded-full cursor-pointer right-4 top-5 w-7 h-7"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "#FF8474" : "#333"}
              title="Add to Wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="absolute p-1 bg-white rounded-full cursor-pointer right-4 top-14 w-7 h-7"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick View"
          />
          <AiOutlineShoppingCart
            size={22}
            className="absolute p-1 bg-white rounded-full cursor-pointer right-4 top-24 w-7 h-7"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to Cart"
          />
          <IoBagHandleOutline
            size={22}
            className="absolute p-1 bg-white rounded-full cursor-pointer right-4 top-32 w-7 h-7"
            onClick={buyNow}
            color="#333"
            title="Buy Now"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              ₱
              {data.discountPrice === 0
                ? data.discountPrice
                : data.discountPrice}
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? "₱" + data.originalPrice : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data?.sold_out} sold
          </span>
        </div>
      </div>
    </>
  );
};

const ProductCard2 = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <div className="max-w-[220px] w-full max-h-[320px] bg-white rounded-lg shadow p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-cover"
          />
        </Link>
        <div className="flex flex-row justify-between mt-2">
          <div className={` text-[15px]`}>
            {data.shop.name}
          </div>
        </div>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500] mt-3">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
        </Link>

        {/* side options */}
        <div></div>

        <div className="flex items-center justify-between py-2">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              ₱
              {data.discountPrice === 0
                ? data.discountPrice
                : data.discountPrice}
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? "₱" + data.originalPrice : null}
            </h4>
          </div>
          {/* <span className="font-[400] text-[17px] text-[#68d284]">
            {data?.sold_out} sold
          </span> */}
          <div>
            {/* Buy Now button */}
            <div
              className={`${styles.button5} flex items-center justify-center rounded-3xl`}
              onClick={() => setOpen(!open)}
            >
              <span className="text-[12px]">View</span>
              {open ? (
                <ProductDetailsCard2 setOpen={setOpen} data={data} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductCard, ProductCard2 };
