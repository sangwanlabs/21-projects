import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProductData } from './Store/appSlice';
function useGetProductData(){
   const dispatch=useDispatch();
   const productData=useSelector(state=> state.app.products)
    async function getData(){
        if(productData.length !== 0) return;
        let apiData= await fetch("https://api.escuelajs.co/api/v1/products");
        let jsonData=await apiData.json();
        dispatch(setProductData(jsonData))
    }
    useEffect(()=>{
        getData();
    },[])
    return productData;
}
function useIsProductInCart(id){
  const cartData=useSelector(state=> state.app.cart);
  const cartArray=Object.keys(cartData);
  const isPresent=cartArray.includes(id);
  if(isPresent){
    return true;
  }
  else{
    return false;
  }
}
export {useGetProductData,useIsProductInCart}