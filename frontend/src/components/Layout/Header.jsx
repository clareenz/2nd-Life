/* The logo, search bar, become seller button, and the blue header's here */

import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShop,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_url, server } from "../../server";
import { categoriesData, productData } from "../../static/data";
import styles from "../../styles/styles";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../cart/Cart";
import DropDown from "./DropDown";
import Navbar from "./Navbar";

const Header = ({ activeHeading }) => {
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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
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

  return (
    <>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }flex transition hidden 800px:flex items-center border-b border-gray-300 w-full bg-white h-[70px] xl:justify-between z-10`} //header sa pinaka taas (yung may cart icon,etc.)
      >
        <div>
          <Link to="/">
            <img
              className="ml-[50px]"
              src="/2ndlife%20logo%20word.png" //logo
              alt="logo2"
              style={{ width: "120px", height: "auto" }}
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

        {/* search box */}
        <div className="w-auto relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[30px] px-2 w-auto  border-gray-300 border-[1px] rounded-3xl text-sm"
          />
          <AiOutlineSearch
            size={17}
            className="absolute right-4 top-1.5 cursor-pointer"
          />
          {searchData && searchData.length !== 0 ? (
            <div className="absolute min-h-[20vh] bg-slate-50 shadow-sm-2 z-[9] p-1">
              {searchData &&
                searchData.map((i, index) => {
                  return (
                    <Link to={`/product/${i._id}`}>
                      <div className="flex w-full items-start p-1">
                        <img
                          src={`${backend_url}${i.images[0]}`}
                          alt=""
                          className="w-[30px] h-[30px] mr-[5px]"
                        />
                        <h1 className="text-xs">{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
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

          {/* profile icon */}
          <div className={`${styles.normalFlex} px-3`}>
            <div className="relative cursor-pointer">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${backend_url}${user.avatar}`}
                    className="w-[25px] h-[25px] rounded-full object-cover"
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
          <div className="mr-1">
            <AiOutlineMenu size={27} className="" onClick={toggleModal} />
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
                          src={`${backend_url}${user.avatar} `}
                          alt=""
                          className="m-auto w-[100px] h-[100px] rounded-full border-[3px] border-[#0eae88] mb-5 mt-2"
                        />
                      </Link>

                      <div className="flex justify-center">
                        <p className="text-gray-600 text-flex mx-1"> Hi,</p>
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
                    <div className=" flex justify-center mb-6">
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

          {/*cart popup*/}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/*wishlist popup*/}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/* mobile header (start time: 2:56:00[2nd vid]) */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden border-b border-gray-300`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={35}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                className="cursor-pointer"
                src="/2ndlife%20logo%20word.png" //logo
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
              <div className="w-full justify-between flex pr-3">
                {/*wishlist icon*/}
                <div>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={27} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                      4
                    </span>
                  </div>
                </div>
                {/*wishlist popup*/}
                {openWishlist ? (
                  <Wishlist setOpenWishlist={setOpenWishlist} />
                ) : null}

                <RxCross1 //close button sa sidebar
                  size={17}
                  className="ml-4 mt-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-5 border-gray-300 border-[2px] rounded-3xl"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;

                        const Product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${Product_name}`}>
                            <div className="flex items-center">
                              <img
                                src={i.image_Url[0].url}
                                alt=""
                                className="w-[50px] mr-2"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>

              <Navbar active={activeHeading} />
              <br />
              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <>
                    <div>
                      <Link to="/profile">
                        <img
                          src={`${backend_url}${user.avatar}`}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full border-[3px] border-[#0eae88]"
                        />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col w-full px-6 mb-2">
                    <br />
                    <br />
                    <button
                      className={`${styles.button4}`}
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                    >
                      Login
                    </button>
                    <button
                      className={`${styles.button4}`}
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
              <br />
              <br />
              {/* become a seller button */}
              <div className="flex justify-center px-6">
                <div className={`${styles.button4} flex w-full`}>
                  <Link to="/shop-create">
                    <h1 className="flex items-center">
                      <AiOutlineShop size={19} className="mx-1" /> Become a
                      Seller
                    </h1>
                  </Link>
                </div>
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
  //login signup header
  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
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

    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
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

  return (
    <>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }flex transition hidden 800px:flex items-center border-b border-gray-300 w-full bg-white h-[70px] xl:justify-between z-10`} //header sa pinaka taas (yung may cart icon,etc.)
      >
        <div>
          <Link to="/">
            <img
              className="ml-[50px]"
              src="/2ndlife%20logo%20word.png" //logo
              alt="logo2"
              style={{ width: "120px", height: "auto" }}
            />
          </Link>
        </div>

        <div className={`relative ${styles.normalFlex}`}>
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

        {/* search box */}
        <div className="w-auto relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[30px] px-2 w-auto  border-gray-300 border-[1px] rounded-3xl text-sm"
          />
          <AiOutlineSearch
            size={17}
            className="absolute right-4 top-1.5 cursor-pointer"
          />
          {searchData && searchData.length !== 0 ? (
            <div className="absolute min-h-[20vh] bg-slate-50 shadow-sm-2 z-[9] p-1">
              {searchData &&
                searchData.map((i, index) => {
                  const d = i.name;

                  const Product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${Product_name}`}>
                      <div className="flex w-full items-start p-1">
                        <img
                          src={i.image_Url[0].url}
                          alt=""
                          className="w-[30px] h-[30px] mr-[5px]"
                        />
                        <h1 className="text-xs">{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
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
                0
              </span>
            </div>
          </div>

          {/* shopping cart icon */}
          <div className={`${styles.normalFlex} mr-3`}>
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
          <div className="mr-1">
            <AiOutlineMenu size={27} className="" onClick={toggleModal} />
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
                          src={`${backend_url}${user.avatar} `}
                          alt=""
                          className="m-auto w-[100px] h-[100px] rounded-full border-[3px] border-[#0eae88] mb-5 mt-2"
                        />
                      </Link>

                      <div className="flex justify-center">
                        <p className="text-gray-600 text-flex mx-1"> Hi,</p>
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
                    <div className=" flex justify-center mb-6">
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

          {/*cart popup*/}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/*wishlist popup*/}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/* mobile header (start time: 2:56:00[2nd vid]) */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden border-b border-gray-300`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={35}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                className="cursor-pointer"
                src="/2ndlife%20logo%20word.png" //logo
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
              <div className="w-full justify-between flex pr-3">
                {/*wishlist icon*/}
                <div>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={27} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                      4
                    </span>
                  </div>
                </div>
                {/*wishlist popup*/}
                {openWishlist ? (
                  <Wishlist setOpenWishlist={setOpenWishlist} />
                ) : null}

                <RxCross1 //close button sa sidebar
                  size={17}
                  className="ml-4 mt-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-5 border-gray-300 border-[2px] rounded-3xl"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;

                        const Product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${Product_name}`}>
                            <div className="flex items-center">
                              <img
                                src={i.image_Url[0].url}
                                alt=""
                                className="w-[50px] mr-2"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>

              <Navbar active={activeHeading} />
              <br />
              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <>
                    <div>
                      <Link to="/profile">
                        <img
                          src={`${backend_url}${user.avatar}`}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full border-[3px] border-[#0eae88]"
                        />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col w-full px-6 mb-2">
                    <br />
                    <br />
                    <button
                      className={`${styles.button4}`}
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                    >
                      Login
                    </button>
                    <button
                      className={`${styles.button4}`}
                      onClick={() => {
                        window.location.href = "/sign-up";
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
              {/* ----or----- */}
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray"></div>
                <div className="px-4 text-gray-700">or</div>
                <div className="flex-grow border-t border-gray"></div>
              </div>
              <br />
              {/* become a seller button */}
              <div className="flex justify-center px-6">
                <div className={`${styles.button4} flex w-full`}>
                  <Link to="/shop-create">
                    <h1 className="flex items-center">
                      <AiOutlineShop size={19} className="mx-1" /> Become a
                      Seller
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { Header, Header2 };

