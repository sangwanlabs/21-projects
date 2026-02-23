import { createSlice } from "@reduxjs/toolkit";
export const appSlice=createSlice({
    name:"app",
    initialState:{
      products:[],
      cart:{},
      wishlist:{}
    },
    reducers:{
        setProductData:(state,action)=>{
            state.products=action.payload
        },
        addToCart:(state,action)=>{
            state.cart[action.payload.id]={...action.payload}
        },
        removeFromCart:(state,action)=>{
            delete state.cart[action.payload.id]
        }
    }
})
export const {setProductData,addToCart,removeFromCart}=appSlice.actions 
export default appSlice.reducer