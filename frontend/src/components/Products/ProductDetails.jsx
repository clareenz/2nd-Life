/* The products detail page
 *  start time: 45:20 (2nd vid)
 */
import { message } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import CountDown from "../Events/CountDown.jsx";
import Ratings from "./Ratings";

const ProductDetails = ({ data }) => {
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [value, setValue] = useState(data?.qty || 1);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  const buyNow = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const increment = (data) => {
    if (data.stock < value + 1) {
      message.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateData);
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
      if (data < 1) {
        message.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: value };
        dispatch(addToCart(cartData));
        message.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength = products && products.reduce((acc,product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
      
    const avg =  totalRatings / totalReviewsLength || 0;

    const averageRating = avg.toFixed(2);

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

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div className="pt-[60px]">
      <div className="p-5 mx-6 my-6 bg-white rounded-lg shadow ">
        {data ? (
          <div className={`${styles.section3} w-[90%] 700px:w-[90%] `}>
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%]">
                  <img
                    src={`${data && data.images[select]?.url}`}
                    alt=""
                    className="w-auto"
                  />
                  <div className="flex w-full">
                    {data &&
                      data.images.map((i, index) => (
                        <div
                          className={`${
                            select === 0 ? "border" : "null"
                          } cursor-pointer`}
                        >
                          <img
                            src={`${i?.url}`}
                            alt=""
                            className="h-[200px] overflow-hidden mr-3 mt-3"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))}
                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer`}
                    ></div>
                  </div>
                </div>
                <div className="w-full 800px:w-[50%] pt-5 px-10">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <Paragraph style={{ wordWrap: "break-word" }}>
                    {data.description}
                  </Paragraph>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ₱{data.discountPrice}
                    </h4>
                    <h3 className={`${styles.price1}`}>
                      {data.originalPrice ? "₱" + data.originalPrice : null}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pr-3 mt-12">
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
                        <div className="flex flex-row text-gray-400">
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

                  {eventData ? (
                    <CountDown data={data} />
                  ) : (
                    <div className="flex flex-row justify-center">
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
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-8">
                    <div className="flex flex-row">
                      <div>
                        <Link to={`/shop/preview/${data?.shop._id}`}>
                          <img
                            src={`${data?.shop?.avatar?.url}`}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full mr-2"
                          />
                        </Link>
                      </div>
                      <div>
                        <Link
                          to={`/shop/preview/${data.shop._id}`}
                          className={`${styles.shop_name}`}
                        >
                          {data.shop.name}
                        </Link>
                        <h5 className="text-[13px] mt-1">
                        ({averageRating}/5) Ratings
                        </h5>
                      </div>
                    </div>
                    <div
                      className={`${styles.button6} ml-2 !mt-6 rounded-3xl !h-11 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white text-[13px] mr-1">
                        Message
                      </span>
                      <AiOutlineMessage className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductDetailsInfo data={data} products={products} totalReviewsLength={totalReviewsLength} averageRating={averageRating} />
            <br />
            <br />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ProductDetailsInfo = ({ data, products, totalReviewsLength, averageRating }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="pt-12">
      <div className="bg-[#F5F5F5] shadow px-3 800px:px-10 py-2 rounded-xl">
        <div className="flex justify-between w-full pt-10 pb-2 border-b">
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(1)}
            >
              Product Details
            </h5>
            {active === 1 && <div className={`${styles.active_indicator}`} />}
          </div>
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(2)}
            >
              Product Reviews
            </h5>
            {active === 2 && <div className={`${styles.active_indicator}`} />}
          </div>
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(3)}
            >
              Seller Information
            </h5>
            {active === 3 && <div className={`${styles.active_indicator}`} />}
          </div>
        </div>
        {active === 1 && (
          <Paragraph style={{ wordWrap: "break-word" }}>
            {data.description}
          </Paragraph>
        )}
        {active === 2 && (
          <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
            {data &&
              data.reviews.map((item, index) => (
                <div className="flex w-full my-2">
                  <img
                    src={`${item.user.avatar?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pl-2">
                    <div className="flex items-center w-full">
                      <h1 className=" font-[500] mr-3">{item.user.name}</h1>
                      <Ratings rating={data?.ratings} />
                    </div>
                    <Paragraph>{item.comment}</Paragraph>
                  </div>
                </div>
              ))}

            <div className="flex justify-center w-full">
              {data && data.reviews.length === 0 && (
                <h5>No Reviews have for this product!</h5>
              )}
            </div>
          </div>
        )}
        {active === 3 && (
          <div className="block w-full p-5 800px:flex">
            <div className="w-full 800px:w-[50%]">
              <div className="flex flex-row">
                <div>
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data?.shop?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                </div>
                <div>
                  <Link
                    to={`/shop/preview/${data.shop._id}`}
                    className={`${styles.shop_name}`}
                  >
                    {data.shop.name}
                  </Link>
                  <h5 className="text-[13px] mt-1">
                  ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
              <p className="pt-2">{data.shop.description}</p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:{" "}
                  <span className="font-[500]">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Products:{" "}
                  <span className="font-[500]">
                    {products && products.length}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Reviews: <span className="font-[500]">{totalReviewsLength}</span>
                </h5>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <div
                    className={`${styles.button6} rounded-full !h-[39.5px] mt-3 bg-[#006665] hover:bg-[#FF8474] text-white `}
                  >
                    Visit Shop
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
