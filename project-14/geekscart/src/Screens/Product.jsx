import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

import { useParams } from "react-router-dom";
import {
  Star,
  CheckCircle,
  Globe,
  Calendar,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useGetProductData, useIsProductInCart } from "../Hooks";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Store/appSlice";

const Product = () => {
  const { id} = useParams();
  const dispatch=useDispatch();
  const cartData=useSelector(state=> state.app.cart)
  const allProductData=useGetProductData();
  const productData=allProductData.find(data=> data.id == id);
  const isProductInCart=useIsProductInCart(id);
  const handleAddToCart=(productData)=>{
      if(isProductInCart){
         dispatch(removeFromCart(productData))
      }
      else{
        dispatch(addToCart(productData))
      }
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gray-900 text-white p-8 md:p-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {productData.title}
            </h1>
            <p className="text-lg mb-4 text-gray-300">
              {productData.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Last updated {productData.updatedAt} </span>
              </div>
            </div>
          </div>

          <div className="bg-white text-gray-900 p-6 rounded-xl border border-gray-200 shadow-xl self-start">
            <img
              src={productData.images[0]}
              alt="Thumbnail"
              className="w-full rounded-lg mb-4"
            />
            <div className="text-3xl font-bold mb-4">${productData.price}</div>

            <div className="flex flex-col gap-3">
              <button
                onClick={()=>{
                  handleAddToCart(productData)
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <ShoppingCart size={20} />{" "}
              {isProductInCart ?"Remove from Cart" : "Add to Cart"}
              </button>
              <button
               
                className="w-full border border-gray-900 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                <Heart size={20} />
                Wishlist
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
              30-Day Money-Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
