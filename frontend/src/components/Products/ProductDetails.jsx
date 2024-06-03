/* The products detail page
 *  start time: 45:20 (2nd vid)
 */
import { Button, Modal, message } from "antd";
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
import { GoReport } from "react-icons/go";
import { RiUserFollowLine, RiUserFollowFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { followShop, unfollowShop } from "../../redux/actions/user";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import CountDown from "../Events/CountDown.jsx";
import Ratings from "./Ratings";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { MdReportGmailerrorred } from "react-icons/md";

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
  const [isFollowing, setIsFollowing] = useState(false);
  const eventData = searchParams.get("isEvent");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${server}/product/get-product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const buyNow = () => {
    if (product) {
      window.location.href = `/checkoutBuyNow/${product._id}`; // Navigate to checkoutBuyNow page with productId in the URL
    }
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
  
  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

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
      <div className="p-5 mx-6 my-6 bg-white rounded-xl shadow ">
        {data ? (
          <div
            className={`${styles.section3} w-full md:w-[90%] lg:w-[70%] mx-auto px-4 py-5 `}
          >
            <div className="">
              <div className="block w-full lg:flex">
                <div className="w-full lg:w-[50%]">
                  <img
                    src={`${data && data.images[select]?.url}`}
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                  <div className="flex w-full">
                    {data &&
                      data.images.map((i, index) => (
                        <div
                          className={`${
                            select === 0 ? "border" : "null"
                          } cursor-pointer `}
                        >
                          <img
                            src={`${i?.url}`}
                            alt=""
                            className="h-[200px] object-cover overflow-hidden mr-3 mt-3"
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
                <div className="w-full lg:w-[50%] lg:px-10">
                  <div className="flex justify-between">
                    <div className="marquee">
                      <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                    </div>
                    <div>
                      <Button
                        type="text"
                        icon={
                          <HiMiniEllipsisHorizontal size={30} title="Report" />
                        }
                        onClick={() => setIsModalVisible(true)}
                      />
                      <Modal
                        title=""
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                      >
                        {/* Your Report Product component goes here */}
                        <Link to={`/report?productId=${data._id}`}>
                          <div className="flex flex-row items-center">
                            <MdReportGmailerrorred size={30} title="Report" />
                            <div className="ml-2">Report this product</div>
                          </div>
                        </Link>
                      </Modal>
                    </div>
                  </div>
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

                  <div className="flex items-center justify-between pr-3 mt-5">
                    <div className="flex flex-row">
                      {data.stock > 1 ? (
                        <>
                          <div>
                            <button onClick={() => decrement(data)}>
                              <CiSquareMinus size={25} />
                            </button>
                          </div>
                          <div className="px-4 mt-0.5">{value}</div>
                          <div>
                            <button
                              className="justify-center"
                              onClick={() => increment(data)}
                            >
                              <CiSquarePlus size={25} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-row text-gray-400">
                          <div>
                            <button disabled>
                              <CiSquareMinus size={25} />
                            </button>
                          </div>
                          <div className="px-4 mt-0.5">{value}</div>
                          <div>
                            <button disabled className="justify-center">
                              <CiSquarePlus size={25} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {click ? (
                        <AiFillHeart
                          size={25}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "#FF8474" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={25}
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
                        className={`${styles.button6}   !mt-6 rounded-3xl !h-9 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                        onClick={() => addToCartHandler(data._id)}
                      >
                        <span className="flex text-[13px] items-center text-white">
                          Add to Cart <AiOutlineShoppingCart className="ml-1" />
                        </span>
                      </div>
                      <div
                        className={`${styles.button6} ml-2 !mt-6 rounded-3xl !h-9 flex items-center bg-[#006665] hover:bg-[#FF8474]`}
                        onClick={buyNow}
                      >
                        <span className="flex text-[13px] items-center text-white">
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
                            className="w-[50px] h-[50px] rounded-full mr-2 object-cover"
                          />
                        </Link>
                      </div>
                      <div>
                        <Link
                          to={`/shop/preview/${data.shop._id}`}
                          className={`${styles.shop_name} marquee`}
                        >
                          {data.shop.name}
                        </Link>
                        <h5 className="text-[13px] mt-1 marquee">
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
            <ProductDetailsInfo
              data={data}
              products={products}
              totalReviewsLength={totalReviewsLength}
              averageRating={averageRating}
            />
            <br />
            <br />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Follow shop
  useEffect(() => {
    // Check if the user is already following the shop
    if (
      isAuthenticated &&
      user &&
      user.followingShops.includes(data?.shop?._id)
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [isAuthenticated, user, data]);

  // Function to handle follow/unfollow
  const handleFollowToggle = () => {
    // Only allow following if the user is authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Logic to toggle follow state
    const newFollowingState = !isFollowing;

    // Call follow/unfollow action based on current follow state
    if (newFollowingState) {
      // Call follow action
      dispatch(followShop(data?.shop._id)) // Replace `followShop` with your actual follow action
        .then(() => {
          setIsFollowing(true);
          window.location.reload(); // Reload the page after following
        })
        .catch(() => setIsFollowing(false)); // Revert state if follow action fails
    } else {
      // Call unfollow action
      dispatch(unfollowShop(data?.shop._id)) // Replace `unfollowShop` with your actual unfollow action
        .then(() => {
          setIsFollowing(false);
          window.location.reload(); // Reload the page after unfollowing
        })
        .catch(() => setIsFollowing(true)); // Revert state if unfollow action fails
    }
  };

  return (
    <div className="pt-[150px]">
      <div className="bg-[#F5F5F5]  px-5  sm:px-10 md:px-10 lg:px-10 py-2 shadow rounded-xl">
        <div className="flex justify-between w-full pt-10 pb-2 border-b xs:center-container">
          <div className="relative center-container">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
              onClick={() => setActive(1)}
            >
              Seller Information
            </h5>
          </div>
        </div>

        {active === 1 && (
          <div className="justify-between flex flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-row w-full py-5">
            <div className="w-full">
              <div className="flex flex-row">
                <div>
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="object-cover w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Link
                      to={`/shop/preview/${data.shop._id}`}
                      className={`${styles.shop_name}`}
                    >
                      {data.shop.name}
                    </Link>
                    {isAuthenticated && (
                      <>
                        {isFollowing ? (
                          <RiUserFollowFill
                            className="ml-2 text-red-500 cursor-pointer"
                            onClick={handleFollowToggle}
                          />
                        ) : (
                          <RiUserFollowLine
                            className="ml-2 text-gray-500 cursor-pointer"
                            onClick={handleFollowToggle}
                          />
                        )}
                      </>
                    )}
                  </div>
                  <h5 className="text-[13px] mt-1">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
              <div style={{ width: "100%" }} className="px-2 py-3">
                <Paragraph
                  className="pt-2"
                  style={{ textAlign: "justify", wordWrap: "break-word" }}
                >
                  {data.shop.description}
                </Paragraph>
              </div>
            </div>
            <div className="items-end">
              <div className="w-full text-[14px]">
                <div className="text-left flex flex-col">
                  <h5 className="font-[600]">
                    Joined on:{" "}
                    <span className="font-[500]">
                      {data.shop?.createdAt?.slice(0, 10)}
                    </span>
                  </h5>
                  <h5 className="font-[600]">
                    Total Products:{" "}
                    <span className="font-[500]">
                      {products && products.length}
                    </span>
                  </h5>
                  <h5 className="font-[600]">
                    Total Reviews:{" "}
                    <span className="font-[500]">{totalReviewsLength}</span>
                  </h5>
                  <div className="">
                    <div className="center-container">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
