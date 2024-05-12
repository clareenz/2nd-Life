import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { ProductCard } from "./ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { Link, useNavigate } from "react-router-dom";

const SearchResult = () => {
  const { allProducts } = useSelector((state) => state.products);
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
          parseFloat(product.originalPrice) >= parseFloat(minimumPrice)) &&
        (!maximumPrice ||
          parseFloat(product.originalPrice) <= parseFloat(maximumPrice));

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
      const priceA = parseFloat(a.originalPrice);
      const priceB = parseFloat(b.originalPrice);
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
    <div>
      <div className={`${styles.section3} ${styles.heading}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="bg-[#006665] w-4 rounded-md h-9 flex items-center justify-center">
            {/* Small box */}
          </div>
          <h1 className="ml-2 text-[#FE8373] font-bold">Search Result</h1>
          {/* Sort buttons */}
          <div>
            <button onClick={() => handleSort("asc")}>
              Sort by Price (Asc)
            </button>
            <button onClick={() => handleSort("desc")}>
              Sort by Price (Desc)
            </button>
          </div>
        </div>

        <div className="flex-row grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {/* Add filter section for min and max price */}
          <div>
            <div>Price Range</div>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                placeholder="Min Price"
                style={{ width: "100px" }}
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              -
              <input
                type="number"
                placeholder="Max Price"
                style={{ width: "100px" }}
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>

            {/* Add rating filter */}
            <div>
              <div>Rating Filter</div>
              <select onChange={handleRatingChange} value={ratingFilter}>
                <option value="">All Ratings</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars & above</option>
                <option value="3">3 stars & above</option>
                <option value="2">2 stars & above</option>
                <option value="1">1 star & above</option>
              </select>
            </div>

            <div>
              <div>Category Filter</div>
              <select onChange={handleCategoryChange} value={selectedCategory}>
                {!selectedCategory && <option value="">All Categories</option>}
                {categoriesData.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Button to apply filters */}
            <button onClick={applyFilters}>Apply Filters</button>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>

          {/* Conditional rendering based on sorted products */}
          {((sortOrder && sortedProducts) || filteredProducts)?.map(
            (product, index) => (
              <ProductCard data={product} key={index} />
            )
          )}
          {((sortOrder && sortedProducts) || filteredProducts)?.length ===
            0 && <div>No products found for the search term.</div>}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
