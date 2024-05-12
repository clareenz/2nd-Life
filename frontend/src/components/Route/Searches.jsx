import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { ProductCard } from "./ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import { categoriesData } from "../../static/data";

const SearchResult = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword");

  // State variables to store min and max price values
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // State variable for rating filter
  const [ratingFilter, setRatingFilter] = useState(null);

  // Filter products based on the query
  const filteredProducts =
    allProducts &&
    allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

  // State to manage sorting
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  // State to store sorted products
  const [sortedProducts, setSortedProducts] = useState([]);

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  useEffect(() => {
    if (sortOrder) {
      const sorted = sortProductsByPrice(sortOrder);
      setSortedProducts(sorted);
    }
  }, [sortOrder, filteredProducts]); // Re-run effect when sortOrder or filteredProducts change

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
          {/* Button to open modal */}
          <button onClick={toggleModal}>Open Modal</button>
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
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <p>Modal content goes here...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
