/* The logo, search bar, become seller button, and the blue header's here */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between border-b border-gray-300 w-full top0 bg-white h-[70px]`} //header sa pinaka taas (yung may cart icon,etc.)
      >
        <div>
          <Link to="/">
            <img
              className="ml-10"
              src="/2ndlife%20logo%20word.png" //logo
              alt="logo2"
              style={{ width: "120px", height: "auto" }}
            />
          </Link>
        </div>

        <div className={`${styles.section} relative ${styles.normalFlex}`}>
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <button
                className={`h-[85%] w-full items-center pl-10 font-sans text-black font-[500] text-sm select-none rounded-t-md`}
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
              >
                Shop by Category
              </button>

              <IoIosArrowDown
                size={20}
                className="absolute cursor-pointer right-8 top-4"
                onClick={() => setDropDown(!dropDown)}
                style={{ color: "black" }}
              />

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
          <div className="w-[15%] relative ml-[1in]">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[30px] px-2 w-full border-gray-300 border-[1px] rounded-3xl text-sm"
            />
            <AiOutlineSearch
              size={20}
              className="absolute right-2 top-1 cursor-pointer"
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
            <div className={`${styles.normalFlex} ml-5`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={27} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>

            {/* shopping cart icon */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={27} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                  2
                </span>
              </div>
            </div>
            {/* profile icon */}
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
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
            {/* become a seller */}
            <div className="800px:h-[25px] 800px:my-[20px] 800px:flex items-center justify-between mr-3">
              <div className={`${styles.button}w-auto h-auto`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center text-sm m-3">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
            </div>

            {/*cart popup*/}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/*wishlist popup*/}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
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
                2
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

              <div className={`${styles.button} ml-4`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
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
                  <>
                    <button
                      className="text-[15px] pr-[10px] text-[#000000b7] bg-transparent hover:bg-[#FF8474] text-[#006665] hover:text-white py-2 px-4 border border-[#006665] hover:border-[#FF8474] rounded-md transition-all duration-300 ease-in-out mr-4"
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="text-[15px] text-[#000000b7] bg-transparent hover:bg-[#FF8474] text-[#006665] hover:text-white py-2 px-4 border border-[#006665] hover:border-[#FF8474] rounded-md transition-all duration-300 ease-in-out"
                      onClick={() => {
                        window.location.href = "/sign-up";
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
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
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between border-b border-gray-300 w-full top0 bg-white h-[70px]`} //header sa pinaka taas (yung may cart icon,etc.)
      >
        <div>
          <Link to="/">
            <img
              className="ml-10"
              src="/2ndlife%20logo%20word.png" //logo
              alt="logo2"
              style={{ width: "120px", height: "auto" }}
            />
          </Link>
        </div>

        <div className={`${styles.section} relative ${styles.normalFlex}`}>
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <button
                className={`h-[85%] w-full items-center pl-10 font-sans text-black font-[500] text-sm select-none rounded-t-md`}
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
              >
                Shop by Category
              </button>

              <IoIosArrowDown
                size={20}
                className="absolute cursor-pointer right-8 top-4"
                onClick={() => setDropDown(!dropDown)}
                style={{ color: "black" }}
              />

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
          <div className="w-[20%] relative ml-[1in]">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[30px] px-2 w-full border-gray-300 border-[1px] rounded-3xl text-sm"
            />
            <AiOutlineSearch
              size={25}
              className="absolute right-2 top-1 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-3">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;

                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${Product_name}`}>
                        <div className="flex w-full items-start-py-3">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* heart icon */}
          <div className="flex">
            <div className={`${styles.normalFlex} ml-5`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={27} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>

            {/* shopping cart icon */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={27} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                  2
                </span>
              </div>
            </div>

            {/* become a seller */}
            <div className="800px:h-[25px] 800px:my-[20px] 800px:flex items-center justify-between mr-3">
              <div className={`${styles.button}w-auto h-auto`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center text-sm m-3">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
            </div>

            {/*cart popup*/}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/*wishlist popup*/}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
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
                2
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
                  size={18}
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

              <div className={`${styles.button} ml-4`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
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
                  <>
                    <button
                      className="text-[15px] pr-[10px] text-[#000000b7] bg-transparent hover:bg-[#FF8474] text-[#006665] hover:text-white py-2 px-4 border border-[#006665] hover:border-[#FF8474] rounded-md transition-all duration-300 ease-in-out mr-4"
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="text-[15px] text-[#000000b7] bg-transparent hover:bg-[#FF8474] text-[#006665] hover:text-white py-2 px-4 border border-[#006665] hover:border-[#FF8474] rounded-md transition-all duration-300 ease-in-out"
                      onClick={() => {
                        window.location.href = "/sign-up";
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { Header, Header2 };
