import React from 'react'
import Home from './screens/Home'
import Product from './Screens/Product'
import Cart from './screens/Cart'
import Wishlist from './screens/Wishlist'
import {Routes, Route} from "react-router-dom"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  )
}

export default App