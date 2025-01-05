import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getProducts } from "../Product/productSlice";
import { setSearchKeyword } from "./SearchSlice";

function Search() {

  const dispatch = useDispatch()
  const products = useSelector((state) => {
    return state?.product?.getProductsData
  })
  const handleSerch = (e) => {
    
    const filteredProducts = products.filter((ele) => ele.name.toLowerCase().includes(e.target.value.toLowerCase()))
    const filteredProductIds = filteredProducts.map((x) => x._id);
    console.log("hi", e.target.value, filteredProducts);
    const res = dispatch(setSearchKeyword(e.target.value))

  };
  return (
    <div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSerch(e);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Search;
