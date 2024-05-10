import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { ProductCard } from "./ProductCard/ProductCard";
import { useParams } from "react-router-dom";

const SearchResult = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { query } = useParams();

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

  useEffect(() => {
    if (sortOrder) {
      const sorted = sortProductsByPrice(sortOrder);
      setSortedProducts(sorted);
    }
  }, [sortOrder, filteredProducts]); // Re-run effect when sortOrder or filteredProducts change

  return (
    <div>
      <div className={`${styles.section3} ${styles.heading}`}>
        <div className="flex items-center mb-4">
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
