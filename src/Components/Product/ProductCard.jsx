import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, handleCart }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl columns-xs w-full my-3 mt-8 !bg-white">
      <figure className="!min-w-72 !max-w-48">
        <img className="!max-w-48" src={product.image} alt="Album" />
      </figure>
      <div className="card-body !text-black">
        <h2 className="card-title">
          {" "}
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h2>
        <div className="rating">
          <input
            type="radio"
            name={`${product._id}rating-1`}
            className="mask mask-star bg-amber-600"
          />
          <input
            type="radio"
            name={`${product._id}rating-1`}
            className="mask mask-star bg-amber-600"
            defaultChecked
          />
          <input
            type="radio"
            name={`${product._id}rating-1`}
            className="mask mask-star bg-amber-600"
          />
          <input
            type="radio"
            name={`${product._id}rating-1`}
            className="mask mask-star bg-amber-600"
          />
          <input
            type="radio"
            name={`${product._id}rating-1`}
            className="mask mask-star bg-amber-600"
          />
        </div>
        <p className="items-start flex font-normal">{product.description}</p>
        <p className="items-start flex font-normal text-lg">
          {" "}
          <b> ₹ </b> {product.price}
        </p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleCart(product)}
            disabled={product.countInStock <= 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
