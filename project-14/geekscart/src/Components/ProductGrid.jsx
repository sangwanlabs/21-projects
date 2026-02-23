import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetProductData } from "../Hooks";
const ProductGrid = () => {
  const productData=useGetProductData();
  console.log("sdfwdsfsdf",productData.map((product)=>
            product
         ));
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productData && productData.map((product)=>
            <ProductCard  key={product.id} product={product}/>
         )} 
      </div>
    </div>
  );
};

export default ProductGrid;


