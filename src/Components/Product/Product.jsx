import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsById,
  updateProductStock,
} from "./productSlice";
import { addCartItems, getCartItems } from "../Cart/cartSlice";

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCart = async (product) => {
    console.log(product);
    const res = await dispatch(addCartItems(product._id));
    if (res?.payload) {
      console.log(res, "product cart");
      fetchCartItems();
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const searchKeyword = useSelector((state) => {
    return state?.search.keyword;
  });

  const fetchProducts = async () => {
    try {
      const res = await dispatch(getProducts());
      if (res?.payload) {
        setProducts(res.payload.data);
        console.log("product");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      const filteredProducts = products?.filter((ele) =>
        ele?.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setfilteredProducts(filteredProducts);
    } else {
      setfilteredProducts(products);
    }
  }, [searchKeyword, products]);

  const handleAddProduct = () => {
    navigate("/product/add-product");
  };

  const fetchCartItems = async () => {
    try {
      const res = await dispatch(getCartItems());
      if (res?.payload) {
        setCartItems(res?.payload?.data[0]?.products);
      }
    } catch (error) {
      console.error("Error fetching cartItems:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [dispatch]);

  useEffect(() => {
    const ids = cartItems?.map((product) => product.productId).join(",");
    dispatch(getProductsById(ids));
  }, [dispatch, cartItems]);

  return (
    <div className="flex !bg-slate-200 px-4">
      {/* <div className="max-w-72 container">Filters</div> */}
      <div className="w-full">
        {user && user?.userRolesDetails?.roleName === "Admin" && (
          <div className="flex justify-end mx-3">
            <button className="btn mt-2" onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
        )}
        {filteredProducts.map((ele) => {
          return (
            <ProductCard product={ele} key={ele.id} handleCart={handleCart} />
          );
        })}
      </div>
    </div>
  );
}

export default Product;
