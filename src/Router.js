import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./Components/Header/UserProfile";
import axios from "axios";
import { ProductDetail } from "./Components/Product/ProductDetail";
import Product from "./Components/Product/Product";
import AddProduct from "./Components/Product/AddProduct";
import { CheckOut } from "./Components/CheckOut/CheckOut";
import CartList from "./Components/Cart/CartList";
import Login from "./Components/Header/Users/Login";
import MainContainer from "./Components/MainLayout/MainContainer";
import UpdateProduct from "./Components/Product/UpdateProduct";
import UsersList from "./Components/Header/UsersList";
import UserDetails from "./Components/Header/UserDetails";

function Router() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainContainer />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/product/add-product" element={<AddProduct />}></Route>
        <Route path="/product/checkout" element={<CheckOut />}></Route>
        <Route path="/cartlist" element={<CartList />}></Route>
        <Route path="/product/update-product/:id" element={<UpdateProduct />}></Route>
        <Route path="/users" element={<UsersList />}></Route>
        <Route path="/users/userDetail/:id" element={<UserDetails/>}></Route>
      </Routes>
    </div>
  );
}

export default Router;
