/* The products detail page
 *  start time: 45:20 (2nd vid)
 */

import React, { useEffect, useState } from "react";
import { Header }  from "../components/Layout/Header";
import {Footer} from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams } from "react-router-dom";
import SuggestedProduct from "../components/Products/SuggestedProduct"
import { useSelector } from 'react-redux';


const ProductDetailsPage = () => {
  const {allProducts} = useSelector((state) => state.products);
  const {id} = useParams();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === id);
    setData(data);
  }, [data,allProducts]);

  return (
    <div>
      <Header />
      <ProductDetails data={data}  />
      {
        data && <SuggestedProduct data= {data}/>
      }
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
