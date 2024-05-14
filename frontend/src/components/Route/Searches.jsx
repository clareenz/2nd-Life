import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { ProductCard } from "./ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { InputNumber } from "antd";
import Loader from "../Layout/Loader";

const SearchResult = () => {
  const { allProducts,isLoading } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword");
  const minimumPrice = searchParams.get("minPrice");
  const maximumPrice = searchParams.get("maxPrice");
  const rating = searchParams.get("rating");
  const category = searchParams.get("category");
  const navigate = useNavigate();



  // State variables to store min and max price values
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // State variable for rating filter
  const [ratingFilter, setRatingFilter] = useState(null);

  // State variable for category filter
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter products based on the query
  // Filter products based on the query, price range, rating, and category
  const filteredProducts =
    allProducts &&
    allProducts.filter((product) => {
      // Filter by search query
      const nameIncludesQuery =
        !query || product.name.toLowerCase().includes(query.toLowerCase());

      // Filter by price range
      const meetsPriceCriteria =
        (!minimumPrice ||
          parseFloat(product.discountPrice) >= parseFloat(minimumPrice)) &&
        (!maximumPrice ||
          parseFloat(product.discountPrice) <= parseFloat(maximumPrice));

      // Filter by rating
      const meetsRatingCriteria =
        rating === null || parseFloat(product.rating) >= parseFloat(rating);

      // Filter by category
      const meetsCategoryCriteria = !category || product.category === category;

      // Return true if all criteria are met
      return (
        nameIncludesQuery &&
        meetsPriceCriteria &&
        meetsRatingCriteria &&
        meetsCategoryCriteria
      );
    });

  // State to manage sorting
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  // State to store sorted products
  const [sortedProducts, setSortedProducts] = useState([]);

  // Function to sort products by price
  const sortProductsByPrice = (order) => {
    const sortedProductsCopy = [...filteredProducts];
    sortedProductsCopy.sort((a, b) => {
      const priceA = parseFloat(a.discountPrice);
      const priceB = parseFloat(b.discountPrice);
      if (order === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
    return sortedProductsCopy;
  };

  // Handle sort button click
  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Function to handle changes in min and max price inputs
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  // Function to handle changes in rating filter
  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    setRatingFilter(rating);
  };

  // Function to handle changes in category filter
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  let m = `/search-results?keyword=${query}`;
  const applyFilters = () => {
    // Apply filters based on minPrice, maxPrice, and ratingFilter
    // For now, let's just log the applied filters

    if (minPrice !== "") {
      m += `&minPrice=${minPrice}`;
    }
    if (maxPrice !== "") {
      m += `&maxPrice=${maxPrice}`;
    }

    // Apply rating filter
    if (ratingFilter !== null) {
      m += `&rating=${ratingFilter}`;
    }

    if (selectedCategory !== "") {
      m += `&category=${selectedCategory}`;
    }
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);
    console.log("Rating Filter:", ratingFilter);
    console.log("Selected Category:", selectedCategory);

    navigate(m);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setRatingFilter(null);
    setSelectedCategory("");
    navigate(m);
  };

  useEffect(() => {
    if (sortOrder) {
      const sorted = sortProductsByPrice(sortOrder);
      setSortedProducts(sorted);
    }
  }, [sortOrder, filteredProducts]); // Re-run effect when sortOrder or filteredProducts change

  useEffect(() => {
    // Update state variables based on URL parameters
    setMinPrice(minimumPrice || "");
    setMaxPrice(maximumPrice || "");
    setRatingFilter(rating || null);
    setSelectedCategory(category || "");
  }, []); // Run only on component mount

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={`px-[70px]`}>
            <div className="flex items-center justify-between mb-4 pt-[120px]">
              <div className="flex items-center absolute left-10 px-[10mm]">
                <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
                  {/* Small box */}
                </div>
                <h1 className="ml-2 text-[#FE8373] font-bold text-[21px]">
                  Search Result
                </h1>
              </div>
            </div>

            <div className="flex flex-row justify-evenly pt-8">
              <div className="bg-white shadow w-[23%] p-6 rounded-xl">
                {/* Sort by Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold">Sort by Price</div>
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 text-sm rounded-md bg-[#EFEFEF] shadow hover:bg-[#FF8474] hover:text-white transition duration-100"
                      onClick={() => handleSort("asc")}
                    >
                      Asc
                    </button>
                    <button
                      className="px-3 py-1 text-sm rounded-md bg-[#EFEFEF] shadow hover:bg-[#FF8474] hover:text-white transition duration-100"
                      onClick={() => handleSort("desc")}
                    >
                      Desc
                    </button>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <div className="font-semibold text-lg mb-2">Price Range</div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Min Price"
                      className="px-3 py-1 border rounded-2xl w-1/2 hover:border-[#006665] focus:border-[#006665] text-[12px]"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max Price"
                      className="px-3 py-1 border rounded-2xl w-1/2 hover:border-[#006665] focus:border-[#006665] text-[12px]"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-4">
                  <div className="text-lg font-semibold mb-2">
                    Rating Filter
                  </div>
                  <select
                    className="px-3 py-1 border w-full rounded-2xl custom-select1 hover:border-[#006665] focus:border-[#006665]"
                    onChange={handleRatingChange}
                    value={ratingFilter}
                  >
                    <option value="0">All Ratings</option>
                    <option value="5">5 stars</option>
                    <option value="4">4 stars & above</option>
                    <option value="3">3 stars & above</option>
                    <option value="2">2 stars & above</option>
                    <option value="1">1 star & above</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <div className="text-lg font-semibold mb-2">
                    Category Filter
                  </div>
                  <select
                    className="px-3 py-1 border rounded-2xl w-full custom-select1 hover:border-[#006665] focus:border-[#006665]"
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                  >
                    {!selectedCategory && (
                      <option value="">All Categories</option>
                    )}
                    {categoriesData.map((category) => (
                      <option key={category.id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Apply and Clear Filters buttons */}
                <div className="flex justify-center space-x-3 pt-6">
                  <div
                    className={`${styles.button6} py-2 text-sm text-gray-500 rounded-3xl hover:border-gray-600 hover:text-[#006665] transition duration-300`}
                    onClick={clearFilters}
                  >
                    Clear
                  </div>
                  <div
                    className={`${styles.button6} py-2 text-sm text-white bg-[#006665] rounded-3xl hover:bg-[#077773] transition duration-300`}
                    onClick={applyFilters}
                  >
                    Apply
                  </div>
                </div>
              </div>

              <div className="px-[90px]">
                <div className="flex-row grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-3 xl:gap-[30px] mb-12 border-0">
                  {/* Add filter section for min and max price */}
                  {/* Conditional rendering based on sorted products */}
                  {((sortOrder && sortedProducts) || filteredProducts)?.map(
                    (product, index) => (
                      <ProductCard data={product} key={index} />
                    )
                  )}
                  {((sortOrder && sortedProducts) || filteredProducts)
                    ?.length === 0 && (
                    <div>No products found for the search term.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
