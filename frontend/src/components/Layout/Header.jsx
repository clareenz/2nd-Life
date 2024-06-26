/* The logo, search bar, become seller button, and the blue header's here */

import { Divider, Dropdown, Input, Menu, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShop,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { backend_url, server } from "../../server";
import { categoriesData } from "../../static/data";
import styles from "../../styles/styles";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../cart/Cart";
import DropDown from "./DropDown";
import { Navbar, Navbar2 } from "./Navbar";
import { AiOutlineBell } from "react-icons/ai";
import { message } from "antd";
import moment from 'moment';

const Header = ({ activeHeading }) => {
  //header sa lahat except login sign up  page
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false); //sidebar sa desktop
  const [open1, setOpen1] = useState(false); //sidebar sa mobile
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const searchRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);


  useEffect(() => {
    console.log(user?._id);
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${server}/notification/get-notifications/${user?._id}`);
        setNotifications(response.data.notifications);
        setUnreadNotifications(response.data.unreadNotifications);
        console.log("not ig" + response.data.notifications)
        // message.success(response.data.success);
      } catch (error) {
        message.error(error.response.data.message);
      }

      console.log(notifications);
    };

    fetchNotifications();
  }, [user]); // Add userId to the dependency array
  
  const notificationMenu = (
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item
          key={notification?._id}
          onClick={() => markAsRead(notification?._id)}
          style={{ backgroundColor: notification.status === 'unread' ? '#e6f7ff' : 'white' }}
        >
          {notification?.type === 'message' ? (
            <Link to={`/inbox?${notification?._id}`}>
              <div>
                <div>{notification?.message}</div>
                <div style={{ fontSize: 'small', color: 'gray' }}>
                  {moment(notification?.createdAt).fromNow()}
                </div>
              </div>
            </Link>
          ) : (
            <div>
              <div>{notification?.message}</div>
              <div style={{ fontSize: 'small', color: 'gray' }}>
                {moment(notification?.createdAt).fromNow()}
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`${server}/notification/read/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, status: 'read' }
            : notification
        )
      );
      message.success('Notification marked as read');
    } catch (error) {
      message.error(error.response.data.message);
    }
  };


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        message.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleSearchButton = (term) => {
    navigate(`/search-results?keyword=${term}`);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !searchRef.current ||
        !searchRef.current.input.contains(event.target)
      ) {
        setSearchData(null);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }shadow-sm fixed top-0 left-0 flex transition hidden 800px:flex items-center border-b border-gray-300 w-full bg-white h-[70px] justify-between z-50`} //header sa pinaka taas (yung may cart icon,etc.)
      >
        <div className="flex flex-row ">
          <div>
            <Link to="/">
              <img
                className="ml-[50px] lg:pt-6 md:pt-6 sm:pt-6 w-[120px] min-w-[120px]"
                src="/2ndLifeBuy&Sell.png" //logo
                alt="logo2"
                style={{ width: "", height: "" }}
              />
            </Link>
          </div>

          <div className={`relative ${styles.normalFlex1}`}>
            {/* categories */}
            <div
              onClick={() => setDropDown(!dropDown)}
              className="relative h-[60px] mt-[41px] w-[200px]"
            >
              <div
                className={`font-sans text-black font-[500] text-sm select-none`}
              >
                <span className=" flex px-10 ml-[35%]">Categories</span>
              </div>

              {dropDown ? (
                <IoIosArrowDown
                  size={17}
                  className="absolute cursor-pointer left-[90%] top-0.5"
                  onClick={() => setDropDown(!dropDown)}
                  style={{
                    color: "black",
                    transition: "transform 0.3s ease !important",
                    transform: "rotate(180deg)",
                  }}
                />
              ) : (
                <IoIosArrowDown
                  size={17}
                  className="absolute cursor-pointer left-[90%] top-0.5"
                  onClick={() => setDropDown(!dropDown)}
                  style={{
                    color: "black",
                    transition: "transform 0.3s ease !important",
                    transform: "rotate(0deg)",
                  }}
                />
              )}

              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
        </div>

        <div className="flex flex-row ">
          <div className=" lg:w-[400px]">
            {/* Search Input Field */}
            <Input
              ref={searchRef}
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[30px] border-gray-300 border-[1px] rounded-3xl text-sm custom-input"
              suffix={
                <AiOutlineSearch
                  size={17}
                  onClick={() => handleSearchButton(searchTerm)}
                />
              }
            />
            {/* Search Results */}
            {searchData && searchData.length !== 0 ? (
              <div className="absolute bg-white shadow z-[9] p-1 rounded-xl lg:w-[400px]">
                {searchData.map((product, index) => (
                  <Link to={`/product/${product._id}`} key={index}>
                    <div className="flex items-start w-full p-1">
                      <img
                        src={`${product.images[0]?.url}`}
                        alt=""
                        className="w-[30px] h-[30px] mr-[5px]"
                      />
                      <div>
                        <h1 className="mb-1 text-xs">{product.name}</h1>
                        {/* Check if 'seller' object exists before accessing 'name' property */}
                        {product.seller && product.seller.name && (
                          <p className="mb-1 text-xs">
                            Seller: {product.seller.name}
                          </p>
                        )}
                        {/* Check if 'seller' object exists and has 'shopName' property */}
                        {product.seller && product.seller.shopName && (
                          <p className="mb-1 text-xs">
                            Shop: {product.seller.shopName}
                          </p>
                        )}
                        <p className="text-xs">Category: {product.category}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {/* heart icon */}
          <div className="flex">
            <div className={`${styles.normalFlex} pl-2`}>
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={27} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-3.5 h-3.5 top right p-0 m-0 text-black font-mono text-[10.5px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            {/* shopping cart icon */}
            <div className={`${styles.normalFlex} px-2`}>
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={27} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-3.5 h-3.5 top right p-0 m-0 text-black font-mono text-[10.5px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            {/* notif */}
            <div className={`${styles.normalFlex} pr-2`}>
              <Dropdown overlay={notificationMenu} placement="bottomRight">
                <div className="relative cursor-pointer">
                  <AiOutlineBell color="#000" size={27} fill="text-black" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-3.5 h-3.5 top right p-0 m-0 text-black font-mono text-[10.5px] leading-tight text-center">
                  { unreadNotifications&& unreadNotifications.length}
                </span>
                </div>
              </Dropdown>
            </div>

            {/* profile icon */}
            <div className={`${styles.normalFlex} pr-2`}>
              <div className="relative cursor-pointer">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user.avatar?.url}`}
                      className="w-[30px] h-[30px] rounded-full object-cover"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={27} color="83%" />
                  </Link>
                )}
              </div>
            </div>

            {/*menu*/}
            <div className="pr-2 ">
              <RxHamburgerMenu size={25} className="" onClick={toggleModal} />
            </div>
          </div>

          <Modal
            visible={modalVisible}
            onCancel={toggleModal}
            footer={null}
            style={{
              position: "fixed",
              top: "7%",
              right: "2%",
              transform: "translate(0, 0)",
              margin: 0,
            }}
            className="small-modal"
          >
            <div className="justify-center bg-white rounded-3xl">
              <br />
              <div className="flex justify-center">
                {isAuthenticated ? (
                  <>
                    <div>
                      <Link to="/profile">
                        <img
                          src={`${user.avatar?.url} `}
                          alt=""
                          className="m-auto w-[100px] h-[100px] object-cover rounded-full border-[3px] border-[#0eae88] mb-5 mt-2"
                        />
                      </Link>

                      <div className="flex justify-center">
                        <p className="mx-1 text-gray-600 text-flex"> Hi,</p>
                        <span></span>
                        <span className="text-red-500">{user.name}!</span>
                      </div>
                      <br />
                      <div className="flex justify-center">
                        <button
                          className={`border rounded-3xl px-[80px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                          onClick={() => {
                            window.location.href = "/profile";
                          }}
                        >
                          <h1 className="flex items-center">
                            Manage your account
                          </h1>
                        </button>
                      </div>
                      {/*logout button*/}
                      <div className="flex justify-center mt-2">
                        <button
                          className={`border rounded-3xl px-[122px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                          onClick={logoutHandler}
                        >
                          <h1 className="flex items-center">Log Out</h1>
                        </button>
                      </div>
                      {/* become a seller button */}
                      <div className="flex justify-center mt-2 mb-6">
                        {isSeller ? (
                          <button
                            className="border rounded-3xl px-[102px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]"
                            onClick={() => {
                              window.location.href = "/dashboard";
                            }}
                          >
                            <h1 className="">Go Dashboard</h1>
                          </button>
                        ) : (
                          <div>
                            <div className="flex items-center">
                              <div className="flex-grow border-t border-gray"></div>
                              <div className="px-4 text-gray-700">or</div>
                              <div className="flex-grow border-t border-gray"></div>
                            </div>
                            <div className="flex items-center">
                              <h1 className="text-[#000]">Become a Seller?</h1>
                              <span className="mx-1"></span>
                              <span
                                className="text-[#006665] hover:text-[#FF8474] cursor-pointer"
                                onClick={() => {
                                  window.location.href = "/shop-create";
                                }}
                              >
                                Sign Up
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  //if di naka login, eto makita sa menu
                  <div className="flex flex-col w-full mb-2">
                    <br />
                    <br />
                    <div className="flex justify-center px-6">
                      <button
                        className={`border rounded-3xl px-[127px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                        onClick={() => {
                          window.location.href = "/login";
                        }}
                      >
                        Login
                      </button>
                    </div>
                    <div className="flex justify-center px-6 mt-2 mb-2">
                      <button
                        className={`border rounded-3xl px-[120px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                        onClick={() => {
                          window.location.href = "/sign-up";
                        }}
                      >
                        <h1 className="">Sign up</h1>
                      </button>
                    </div>
                    {/* ----or----- */}
                    <div className="flex items-center mb-2">
                      <div className="flex-grow border-t border-gray"></div>
                      <div className="px-4 text-gray-700">or</div>
                      <div className="flex-grow border-t border-gray"></div>
                    </div>
                    {/* become a seller button */}
                    <div className="flex items-center justify-center">
                      <h1 className="text-black">Become a Seller?</h1>
                      <span className="mx-1"></span>
                      <span
                        className="text-[#006665] hover:text-[#FF8474] cursor-pointer"
                        onClick={() => {
                          window.location.href = "/shop-create";
                        }}
                      >
                        Login
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>

          {/*cart popup*/}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/*wishlist popup*/}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/* mobile header (start time: 2:56:00[2nd vid]) */}
      <div
        className={`${
          active === true ? "shadow fixed top-0 left-0 z-10" : null
        } fixed  w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden border-b border-gray-300`}
      >
        <div className="flex items-center justify-between w-full">
          <div>
            <RxHamburgerMenu
              size={25}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                className="cursor-pointer"
                src="/2ndLifeBuy&Sell.png" //logo
                alt="logo2"
                style={{ width: "110px", height: "auto" }}
              />
            </Link>
          </div>
          {/*cart icon*/}
          <div>
            <div
              className="relative cursor-pointer m-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={27} />
              <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/*cart popup*/}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>

        {/* mobile header sidebar */}
        {open && (
          <div
            className={` fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="flex justify-between w-full pr-3">
                {/*wishlist icon*/}
                <div>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={27} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                {/*wishlist popup*/}
                {openWishlist ? (
                  <Wishlist setOpenWishlist={setOpenWishlist} />
                ) : null}

                <RxCross1 //close button sa sidebar
                  size={17}
                  className="mt-5 ml-4 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className=" lg:w-[400px] py-4 px-4">
                {/* Search Input Field */}
                <Input
                  ref={searchRef}
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[30px] border-gray-300 border-[1px] rounded-3xl text-sm custom-input"
                  suffix={
                    <AiOutlineSearch
                      size={17}
                      onClick={() => handleSearchButton(searchTerm)}
                    />
                  }
                />
                {/* Search Results */}
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute bg-white shadow z-[9] p-1 rounded-xl lg:w-[400px]">
                    {searchData.map((product, index) => (
                      <Link to={`/product/${product._id}`} key={index}>
                        <div className="flex items-start w-full p-1">
                          <img
                            src={`${product.images[0]?.url}`}
                            alt=""
                            className="w-[30px] h-[30px] mr-[5px]"
                          />
                          <div>
                            <h1 className="mb-1 text-xs">{product.name}</h1>
                            {/* Check if 'seller' object exists before accessing 'name' property */}
                            {product.seller && product.seller.name && (
                              <p className="mb-1 text-xs">
                                Seller: {product.seller.name}
                              </p>
                            )}
                            {/* Check if 'seller' object exists and has 'shopName' property */}
                            {product.seller && product.seller.shopName && (
                              <p className="mb-1 text-xs">
                                Shop: {product.seller.shopName}
                              </p>
                            )}
                            <p className="text-xs">
                              Category: {product.category}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <Navbar2 active={activeHeading} />
              <br />
              <div className="flex justify-center w-full">
                {isAuthenticated ? (
                  <div className="flex flex-col items-center">
                    <div>
                      <Link to="/profile">
                        <img
                          src={`${user.avatar?.url}`}
                          alt=""
                          className="w-[70px] h-[70px] rounded-full border-[3px] object-cover border-[#0eae88]"
                        />
                      </Link>
                    </div>
                    <div className="flex justify-center py-1">
                      <p className="mx-1 text-gray-600 text-flex"> Hi,</p>
                      <span></span>
                      <span className="text-red-500">{user.name}!</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full px-6 mb-2">
                    <br />
                    <br />
                    <button
                      className={`text-[15px] text-[#000000b7] bg-transparent  text-[#006665] hover:text-[#FF8474] py-2 px-4 border border-[#006665] hover:border-[#FF8474] rounded-3xl transition-all duration-200 ease-in-out mb-4 justify-center`}
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                    >
                      Login
                    </button>
                    <button
                      className={`text-[15px] text-[#000000b7] bg-transparent  text-[#006665] hover:text-[#FF8474] py-2 px-4 border border-[#006665] hover:border-[#FF8474] rounded-3xl transition-all duration-200 ease-in-out mb-4 justify-center`}
                      onClick={() => {
                        window.location.href = "/sign-up";
                      }}
                    >
                      Sign Up
                    </button>
                    {/* ----or----- */}
                    <div className="flex items-center">
                      <div className="flex-grow border-t border-gray"></div>
                      <div className="px-4 text-gray-700">or</div>
                      <div className="flex-grow border-t border-gray"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* become a seller button */}
              <div className="flex items-center justify-center">
                <h1 className="text-black text-[13px]">Become a Seller?</h1>
                <span className="mx-1"></span>
                <span
                  className="text-[#006665] hover:text-[#FF8474] cursor-pointer text-[13px]"
                  onClick={() => {
                    window.location.href = "/shop-create";
                  }}
                >
                  Sign up
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

const Header2 = ({ activeHeading }) => {
  //header sa lahat except login sign up  page
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false); //sidebar sa desktop
  const [open1, setOpen1] = useState(false); //sidebar sa mobile
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const searchRef = useRef(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        message.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleSearchButton = (term) => {
    navigate(`/search-results?keyword=${term}`);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !searchRef.current ||
        !searchRef.current.input.contains(event.target)
      ) {
        setSearchData(null);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }shadow-sm fixed top-0 left-0 flex transition hidden 800px:flex items-center border-b border-gray-300 w-full bg-white h-[70px] justify-between z-10`} //header sa pinaka taas (yung may cart icon,etc.)
      >
        <div className="flex flex-row ">
          <div>
            <Link to="/">
              <img
                className="ml-[50px] lg:pt-6 md:pt-6 sm:pt-6 w-[120px] min-w-[120px]"
                src="/2ndLifeBuy&Sell.png" //logo
                alt="logo2"
                style={{ width: "", height: "" }}
              />
            </Link>
          </div>

          <div className={`relative ${styles.normalFlex1}`}>
            {/* categories */}
            <div
              onClick={() => setDropDown(!dropDown)}
              className="relative h-[60px] mt-[41px] w-[200px]"
            >
              <div
                className={`font-sans text-black font-[500] text-sm select-none`}
              >
                <span className=" flex px-10 ml-[35%]">Categories</span>
              </div>

              {dropDown ? (
                <IoIosArrowDown
                  size={17}
                  className="absolute cursor-pointer left-[90%] top-0.5"
                  onClick={() => setDropDown(!dropDown)}
                  style={{
                    color: "black",
                    transition: "transform 0.3s ease !important",
                    transform: "rotate(180deg)",
                  }}
                />
              ) : (
                <IoIosArrowDown
                  size={17}
                  className="absolute cursor-pointer left-[90%] top-0.5"
                  onClick={() => setDropDown(!dropDown)}
                  style={{
                    color: "black",
                    transition: "transform 0.3s ease !important",
                    transform: "rotate(0deg)",
                  }}
                />
              )}

              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
        </div>

        <div className="flex flex-row">
          <div className=" lg:w-[400px]">
            {/* Search Input Field */}
            <Input
              ref={searchRef}
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[30px] border-gray-300 border-[1px] rounded-3xl text-sm custom-input"
              suffix={
                <AiOutlineSearch
                  size={17}
                  onClick={() => handleSearchButton(searchTerm)}
                />
              }
            />
            {/* Search Results */}
            {searchData && searchData.length !== 0 ? (
              <div className="absolute bg-white shadow z-[9] p-1 rounded-xl lg:w-[400px]">
                {searchData.map((product, index) => (
                  <Link to={`/product/${product._id}`} key={index}>
                    <div className="flex items-start w-full p-1">
                      <img
                        src={`${product.images[0]?.url}`}
                        alt=""
                        className="w-[30px] h-[30px] mr-[5px]"
                      />
                      <div>
                        <h1 className="mb-1 text-xs">{product.name}</h1>
                        {/* Check if 'seller' object exists before accessing 'name' property */}
                        {product.seller && product.seller.name && (
                          <p className="mb-1 text-xs">
                            Seller: {product.seller.name}
                          </p>
                        )}
                        {/* Check if 'seller' object exists and has 'shopName' property */}
                        {product.seller && product.seller.shopName && (
                          <p className="mb-1 text-xs">
                            Shop: {product.seller.shopName}
                          </p>
                        )}
                        <p className="text-xs">Category: {product.category}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {/* heart icon */}
          <div className="flex">
            <div className={`${styles.normalFlex} px-3`}>
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={27} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-3.5 h-3.5 top right p-0 m-0 text-black font-mono text-[10.5px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            {/* shopping cart icon */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={27} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-3.5 h-3.5 top right p-0 m-0 text-black font-mono text-[10.5px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            {/*menu*/}
            <div className="px-3 mr-1">
              <RxHamburgerMenu size={25} className="" onClick={toggleModal} />
            </div>
          </div>

          <Modal
            visible={modalVisible}
            onCancel={toggleModal}
            footer={null}
            style={{
              position: "fixed",
              top: "7%",
              right: "2%",
              transform: "translate(0, 0)",
              margin: 0,
            }}
            className="small-modal"
          >
            <div className="justify-center bg-white rounded-3xl">
              <br />
              <div className="flex justify-center">
                {isAuthenticated ? (
                  <>
                    <div>
                      <Link to="/profile">
                        <img
                          src={`${user.avatar?.url} `}
                          alt=""
                          className="m-auto w-[100px] h-[100px] object-cover rounded-full border-[3px] border-[#0eae88] mb-5 mt-2"
                        />
                      </Link>

                      <div className="flex justify-center">
                        <p className="mx-1 text-gray-600 text-flex"> Hi,</p>
                        <span></span>
                        <span className="text-red-500">{user.name}!</span>
                      </div>
                      <br />
                      <div className="flex justify-center">
                        <button
                          className={`border rounded-3xl px-[80px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                          onClick={() => {
                            window.location.href = "/profile";
                          }}
                        >
                          <h1 className="flex items-center">
                            Manage your account
                          </h1>
                        </button>
                      </div>
                      {/*logout button*/}
                      <div className="flex justify-center mt-2">
                        <button
                          className={`border rounded-3xl px-[122px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                          onClick={logoutHandler}
                        >
                          <h1 className="flex items-center">Log Out</h1>
                        </button>
                      </div>
                      {/* become a seller button */}
                      <div className="flex items-center justify-center">
                        <h1 className="text-black">Become a Seller?</h1>
                        <span className="mx-1"></span>
                        <span
                          className="text-[#006665] hover:text-[#FF8474] cursor-pointer"
                          onClick={() => {
                            window.location.href = "/shop-create";
                          }}
                        >
                          Sign up
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  //if di naka login, eto makita sa menu
                  <div className="flex flex-col w-full mb-2">
                    <br />
                    <br />
                    <div className="flex justify-center px-6">
                      <button
                        className={`border rounded-3xl px-[106px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                        onClick={() => {
                          window.location.href = "/login";
                        }}
                      >
                        Login
                      </button>
                    </div>
                    <div className="flex justify-center px-6 mt-2 mb-2">
                      <button
                        className={`border rounded-3xl px-[100px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                        onClick={() => {
                          window.location.href = "/sign-up";
                        }}
                      >
                        <h1 className="">Sign up</h1>
                      </button>
                    </div>
                    {/* ----or----- */}
                    <div className="flex items-center mb-2">
                      <div className="flex-grow border-t border-gray"></div>
                      <div className="px-4 text-gray-700">or</div>
                      <div className="flex-grow border-t border-gray"></div>
                    </div>
                    {/* become a seller button */}
                    <div className="flex items-center justify-center">
                      <h1 className="text-black">Become a Seller?</h1>
                      <span className="mx-1"></span>
                      <span
                        className="text-[#006665] hover:text-[#FF8474] cursor-pointer"
                        onClick={() => {
                          window.location.href = "/shop-create";
                        }}
                      >
                        Sign up
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>

          {/*cart popup*/}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/*wishlist popup*/}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/* mobile header (start time: 2:56:00[2nd vid]) */}
      <div
        className={`${
          active === true ? "shadow fixed top-0 left-0 z-10" : null
        } fixed  w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden border-b border-gray-300`}
      >
        <div className="flex items-center justify-between w-full">
          <div>
            <RxHamburgerMenu
              size={25}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                className="cursor-pointer"
                src="/2ndLifeBuy&Sell.png" //logo
                alt="logo2"
                style={{ width: "110px", height: "auto" }}
              />
            </Link>
          </div>
          {/*cart icon*/}
          <div>
            <div
              className="relative cursor-pointer m-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={27} />
              <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/*cart popup*/}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>

        {/* mobile header sidebar */}
        {open && (
          <div
            className={` fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="flex justify-between w-full pr-3">
                {/*wishlist icon*/}
                <div>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={27} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                {/*wishlist popup*/}
                {openWishlist ? (
                  <Wishlist setOpenWishlist={setOpenWishlist} />
                ) : null}

                <RxCross1 //close button sa sidebar
                  size={17}
                  className="mt-5 ml-4 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className=" lg:w-[400px] py-4 px-4">
                {/* Search Input Field */}
                <Input
                  ref={searchRef}
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[30px] border-gray-300 border-[1px] rounded-3xl text-sm custom-input"
                  suffix={
                    <AiOutlineSearch
                      size={17}
                      onClick={() => handleSearchButton(searchTerm)}
                    />
                  }
                />
                {/* Search Results */}
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute bg-white shadow z-[9] p-1 rounded-xl lg:w-[400px]">
                    {searchData.map((product, index) => (
                      <Link to={`/product/${product._id}`} key={index}>
                        <div className="flex items-start w-full p-1">
                          <img
                            src={`${product.images[0]?.url}`}
                            alt=""
                            className="w-[30px] h-[30px] mr-[5px]"
                          />
                          <div>
                            <h1 className="mb-1 text-xs">{product.name}</h1>
                            {/* Check if 'seller' object exists before accessing 'name' property */}
                            {product.seller && product.seller.name && (
                              <p className="mb-1 text-xs">
                                Seller: {product.seller.name}
                              </p>
                            )}
                            {/* Check if 'seller' object exists and has 'shopName' property */}
                            {product.seller && product.seller.shopName && (
                              <p className="mb-1 text-xs">
                                Shop: {product.seller.shopName}
                              </p>
                            )}
                            <p className="text-xs">
                              Category: {product.category}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <Navbar2 active={activeHeading} />
              <br />
              <div className="flex justify-center w-full">
                {isAuthenticated ? (
                  <div className="flex flex-col items-center">
                    <div>
                      <Link to="/profile">
                        <img
                          src={`${user.avatar?.url}`}
                          alt=""
                          className="w-[70px] h-[70px] rounded-full border-[3px] object-cover border-[#0eae88]"
                        />
                      </Link>
                    </div>
                    <div className="flex justify-center">
                      <p className="mx-1 text-gray-600 text-flex"> Hi,</p>
                      <span></span>
                      <span className="text-red-500">{user.name}!</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full px-6 mb-2">
                    <br />
                    <br />
                    <button
                      className={`text-[15px] text-[#000000b7] bg-transparent  text-[#006665] hover:text-[#FF8474] py-2 px-4 border border-[#006665] hover:border-[#FF8474] rounded-3xl transition-all duration-200 ease-in-out mb-4 justify-center`}
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                    >
                      Login
                    </button>
                    <button
                      className={`text-[15px] text-[#000000b7] bg-transparent  text-[#006665] hover:text-[#FF8474] py-2 px-4 border border-[#006665] hover:border-[#FF8474] rounded-3xl transition-all duration-200 ease-in-out mb-4 justify-center`}
                      onClick={() => {
                        window.location.href = "/sign-up";
                      }}
                    >
                      Sign Up
                    </button>
                    {/* ----or----- */}
                    <div className="flex items-center">
                      <div className="flex-grow border-t border-gray"></div>
                      <div className="px-4 text-gray-700">or</div>
                      <div className="flex-grow border-t border-gray"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* become a seller button */}
              <div className="flex items-center justify-center">
                <h1 className="text-black text-[13px]">Become a Seller?</h1>
                <span className="mx-1"></span>
                <span
                  className="text-[#006665] hover:text-[#FF8474] cursor-pointer text-[13px]"
                  onClick={() => {
                    window.location.href = "/shop-create";
                  }}
                >
                  Sign up
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const SearchHeader = ({ activeHeading }) => {
  //header sa lahat except login sign up  page
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false); //sidebar sa desktop
  const [open1, setOpen1] = useState(false); //sidebar sa mobile
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const searchRef = useRef(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        message.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleSearchButton = (term) => {
    navigate(`/search-results?keyword=${term}`);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (open1 && !event.target.closest(".sidebar")) {
        setOpen1(false);
      }
    };

    const handleScroll = () => {
      if (open1) {
        setOpen1(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open1]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !searchRef.current ||
        !searchRef.current.input.contains(event.target)
      ) {
        setSearchData(null);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : null
        }flex transition hidden 800px:flex items-center border-b border-gray-300 w-full bg-white h-[70px] xl:justify-between z-10`}
      >
        {/* Search box */}
        <div className=" lg:w-[400px]">
          {/* Search Input Field */}
          <Input
            ref={searchRef}
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[30px] border-gray-300 border-[1px] rounded-3xl text-sm custom-input"
            suffix={
              <AiOutlineSearch
                size={17}
                onClick={() => handleSearchButton(searchTerm)}
              />
            }
          />
          {/* Search Results */}
          {searchData && searchData.length !== 0 ? (
            <div className="absolute bg-white shadow z-[9] p-1 rounded-xl lg:w-[400px]">
              {searchData.map((product, index) => (
                <Link to={`/product/${product._id}`} key={index}>
                  <div className="flex items-start w-full p-1">
                    <img
                      src={`${product.images[0]?.url}`}
                      alt=""
                      className="w-[30px] h-[30px] mr-[5px]"
                    />
                    <div>
                      <h1 className="mb-1 text-xs">{product.name}</h1>
                      {/* Check if 'seller' object exists before accessing 'name' property */}
                      {product.seller && product.seller.name && (
                        <p className="mb-1 text-xs">
                          Seller: {product.seller.name}
                        </p>
                      )}
                      {/* Check if 'seller' object exists and has 'shopName' property */}
                      {product.seller && product.seller.shopName && (
                        <p className="mb-1 text-xs">
                          Shop: {product.seller.shopName}
                        </p>
                      )}
                      <p className="text-xs">Category: {product.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mr-1">
          <RxHamburgerMenu size={25} className="" onClick={toggleModal} />
        </div>

        <Modal
          visible={modalVisible}
          onCancel={toggleModal}
          footer={null}
          style={{
            position: "fixed",
            top: "7%",
            right: "2%",
            transform: "translate(0, 0)",
            margin: 0,
          }}
          className="small-modal"
        >
          <div className="justify-center bg-white rounded-3xl">
            <br />
            <div className="flex justify-center">
              {isAuthenticated ? (
                <>
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url} `}
                        alt=""
                        className="m-auto w-[100px] h-[100px] object-cover rounded-full border-[3px] border-[#0eae88] mb-5 mt-2"
                      />
                    </Link>

                    <div className="flex justify-center">
                      <p className="mx-1 text-gray-600 text-flex"> Hi,</p>
                      <span></span>
                      <span className="text-red-500">{user.name}!</span>
                    </div>
                    <br />
                    <div className="flex justify-center">
                      <button
                        className={`border rounded-3xl px-[80px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                        onClick={() => {
                          window.location.href = "/profile";
                        }}
                      >
                        <h1 className="flex items-center">
                          Manage your account
                        </h1>
                      </button>
                    </div>
                    {/*logout button*/}
                    <div className="flex justify-center mt-2">
                      <button
                        className={`border rounded-3xl px-[122px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                        onClick={logoutHandler}
                      >
                        <h1 className="flex items-center">Log Out</h1>
                      </button>
                    </div>
                    {/* become a seller button */}
                    <div className="flex justify-center mt-2 mb-6">
                      <button
                        className={`border rounded-3xl px-[98px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                        onClick={() => {
                          window.location.href = "/shop-create";
                        }}
                      >
                        <h1 className="">Become a Seller</h1>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                //if di naka login, eto makita sa menu
                <div className="flex flex-col w-full mb-2">
                  <br />
                  <br />
                  <div className="flex justify-center px-6">
                    <button
                      className={`border rounded-3xl px-[127px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                    >
                      Login
                    </button>
                  </div>
                  <div className="flex justify-center px-6 mt-2 mb-2">
                    <button
                      className={`border rounded-3xl px-[120px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                      onClick={() => {
                        window.location.href = "/sign-up";
                      }}
                    >
                      <h1 className="">Sign up</h1>
                    </button>
                  </div>
                  {/* ----or----- */}
                  <div className="flex items-center mb-2">
                    <div className="flex-grow border-t border-gray"></div>
                    <div className="px-4 text-gray-700">or</div>
                    <div className="flex-grow border-t border-gray"></div>
                  </div>
                  {/* become a seller button */}
                  <div className="flex justify-center mb-6 ">
                    <button
                      className={`border rounded-3xl px-[95px] py-2 border-[#006665] hover:border-[#FF8474] text-[#006665] hover:text-[#FF8474]`}
                      onClick={() => {
                        window.location.href = "/shop-create";
                      }}
                    >
                      <h1 className="">Become a Seller</h1>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export { Header, Header2, SearchHeader };
