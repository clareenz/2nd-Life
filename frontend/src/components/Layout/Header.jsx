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

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

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
              className="ml-20"
              src="/2ndlife%20logo%20word.png" //logo
              alt="logo2"
              style={{ width: "140px", height: "auto" }}
            />
          </Link>
        </div>

        <div className={`${styles.section} relative ${styles.normalFlex}`}>
         
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <button
                className={`h-[85%] w-full items-center pl-10 font-sans text-black font-[500] select-none rounded-t-md`}
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
              >
                Shop by Category
              </button>

              <IoIosArrowDown
                size={20}
                className="absolute cursor-pointer right-2 top-4"
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
          <div className="w-[20%] relative ml-[2in]">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-5 border-gray-300 border-[2px] rounded-3xl"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
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
              <div className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenWishlist(true)}>
                <AiOutlineHeart size={30} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>

            {/* shopping cart icon */}
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]"
              onClick={()=> setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#FF8474] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                    0
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="83%" />
                  </Link>
                )}
              </div>
            </div>
            {/* become a seller */}
            <div className="800px:h-[25px] ml-[15px] 800px:my-[20px] 800px:flex items-center justify-between">
              <div className={`${styles.button}`}>
                <Link to="/seller">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
            </div>

            {/*cart popup*/}
            {
              openCart ? (
                <Cart setOpenCart = {setOpenCart}/>
              ): null
            }

            {/*wishlist popup*/}
            {
              openWishlist ? (
                <Wishlist setOpenWishlist = {setOpenWishlist}/>
              ): null
            }

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
