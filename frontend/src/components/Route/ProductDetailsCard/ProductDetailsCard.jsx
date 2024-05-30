/* The inside when you clicked Quick View(eye icon) on the right side of the product
start: 5:44:53(first vid) */
/**
 * * Use to Display the Product Details when Clicked
 *
 */
import Paragraph from "antd/es/typography/Paragraph";
import React, { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import styles from "../../../styles/styles";
import { Modal, message } from "antd";
import axios from "axios";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { backend_url, server } from "../../../server";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [value, setValue] = useState(data?.qty || 1);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const buyNow = () => {
    navigate("/checkoutBuyNow");
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const decrement = (data) => {
    if (value === 1) {
      // Minimum quantity reached, do nothing or show a message
      return;
    }
    setValue(value - 1);
    const updateData = { ...data, qty: value - 1 };
    quantityChangeHandler(updateData);
  };

  const increment = (data) => {
    if (data.stock < value + 1) {
      message.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateData);
    }
  };

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

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <Modal
      visible={!!data}
      onCancel={() => setOpen(false)}
      centered
      footer={null}
    >
      {data && (
        <div className="flex flex-col pt-8 ">
          <div className="">
            <img
              src={`${backend_url}${data.images && data.images[0]}`}
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-row mt-[10px]">
              <div>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={`${backend_url}${data?.shop?.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </Link>
              </div>
              <div className="marquee">
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className={`${styles.shop_name}`}
                >
                  {data.shop.name}
                </Link>
                <h5 className="text-[13px] mt-1">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <div
              className={`${styles.button6} ml-2 !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
              onClick={handleMessageSubmit}
            >
              <span className="text-white text-[13px] mr-1">Message</span>
              <AiOutlineMessage className="text-white" />
            </div>
          </div>
          <div className=" ">
            <h1 className={`${styles.productTitle} text-[20px]`}>
              {data.name}
            </h1>
            <div style={{ width: "100%" }}>
              <Paragraph
                style={{ textAlign: "justify", wordWrap: "break-word" }}
              >
                {data.description}
              </Paragraph>
            </div>
            <div className="flex pt-3">
              <h4 className={`${styles.productDiscountPrice}`}>
                ₱{data.discountPrice}
              </h4>
              <h3 className={`${styles.price1}`}>
                {data.originalPrice ? "₱" + data.originalPrice : null}
              </h3>
            </div>
            <div className="flex items-center justify-between pr-3 pt-2">
              <div className="flex flex-row">
                {data.stock > 1 ? (
                  <>
                    <div>
                      <button onClick={() => decrement(data)}>
                        <CiSquareMinus size={30} />
                      </button>
                    </div>
                    <div className="px-4 mt-0.5">{value}</div>
                    <div>
                      <button
                        className="justify-center"
                        onClick={() => increment(data)}
                      >
                        <CiSquarePlus size={30} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 flex flex-row">
                    <div>
                      <button disabled>
                        <CiSquareMinus size={30} />
                      </button>
                    </div>
                    <div className="px-4 mt-0.5">{value}</div>
                    <div>
                      <button disabled className="justify-center">
                        <CiSquarePlus size={30} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {click ? (
                  <AiFillHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => removeFromWishlistHandler(data)}
                    color={click ? "#FF8474" : "#333"}
                    title="Remove from wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => addToWishlistHandler(data)}
                    color={click ? "#FF8474" : "#333"}
                    title="Add to wishlist"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-row justify-center">
              <div
                className={`${styles.button6} !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                onClick={() => addToCartHandler(data._id)}
              >
                <span className="flex items-center text-white">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
              {/* Buy Now button */}
              <div
                className={`${styles.button6} ml-2 !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                onClick={buyNow}
              >
                <span className="flex items-center text-white">
                  Buy Now <IoBagHandleOutline className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

const ProductDetailsCard2 = ({ setOpen, data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [value, setValue] = useState(data?.qty || 1);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const buyNow = () => {
    navigate("/checkout");
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const decrement = (data) => {
    if (value === 1) {
      // Minimum quantity reached, do nothing or show a message
      return;
    }
    setValue(value - 1);
    const updateData = { ...data, qty: value - 1 };
    quantityChangeHandler(updateData);
  };

  const increment = (data) => {
    if (data.stock < value + 1) {
      message.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateData);
    }
  };

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

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <Modal
      visible={!!data}
      onCancel={() => setOpen(false)}
      centered
      footer={null}
    >
      {data && (
        <div className="flex flex-col pt-8 ">
          <div className="">
            <img
              src={`${data.images && data.images[0]?.url}`}
              alt=""
              className="w-full h-auto object-cover pb-3"
            />
          </div>
          {/* <div className="flex justify-between items-center">
            <div className="flex flex-row mt-[10px]">
              <div>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={`${data?.shop?.avatar?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </Link>
              </div>
              <div className="marquee">
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className={`${styles.shop_name}`}
                >
                  {data.shop.name}
                </Link>
                <h5 className="text-[13px] mt-1">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <div
              className={`${styles.button6} ml-2 !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
              onClick={handleMessageSubmit}
            >
              <span className="text-white text-[13px] mr-1">Message</span>
              <AiOutlineMessage className="text-white" />
            </div>
          </div> */}
          <div className=" ">
            <h1 className={`${styles.productTitle} text-[20px]`}>
              {data.name}
            </h1>
            <div style={{ width: "100%" }}>
              <Paragraph
                style={{ textAlign: "justify", wordWrap: "break-word" }}
              >
                {data.description}
              </Paragraph>
            </div>
            <div className="flex pt-3">
              <h4 className={`${styles.productDiscountPrice}`}>
                ₱{data.discountPrice}
              </h4>
              <h3 className={`${styles.price1}`}>
                {data.originalPrice ? "₱" + data.originalPrice : null}
              </h3>
            </div>
            {/* pang seller kasi. dapat wala na tong mga buttons na to */}

            {/* <div className="flex items-center justify-between pr-3 pt-2">
              <div className="flex flex-row">
                {data.stock > 1 ? (
                  <>
                    <div>
                      <button onClick={() => decrement(data)}>
                        <CiSquareMinus size={30} />
                      </button>
                    </div>
                    <div className="px-4 mt-0.5">{value}</div>
                    <div>
                      <button
                        className="justify-center"
                        onClick={() => increment(data)}
                      >
                        <CiSquarePlus size={30} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 flex flex-row">
                    <div>
                      <button disabled>
                        <CiSquareMinus size={30} />
                      </button>
                    </div>
                    <div className="px-4 mt-0.5">{value}</div>
                    <div>
                      <button disabled className="justify-center">
                        <CiSquarePlus size={30} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {click ? (
                  <AiFillHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => removeFromWishlistHandler(data)}
                    color={click ? "#FF8474" : "#333"}
                    title="Remove from wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => addToWishlistHandler(data)}
                    color={click ? "#FF8474" : "#333"}
                    title="Add to wishlist"
                  />
                )}
              </div>
            </div> */}

            {/* <div className="flex flex-row justify-center">
              <div
                className={`${styles.button6} !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                onClick={() => addToCartHandler(data._id)}
              >
                <span className="flex items-center text-white">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
              
              <div
                className={`${styles.button6} ml-2 !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                onClick={buyNow}
              >
                <span className="flex items-center text-white">
                  Buy Now <IoBagHandleOutline className="ml-1" />
                </span>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </Modal>
  );
};

export  {ProductDetailsCard, ProductDetailsCard2};
