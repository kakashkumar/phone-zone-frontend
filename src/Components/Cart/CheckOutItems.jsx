import React from "react";

function CheckOutItems({ product, count }) {
  console.log(count);

  return (
    <div className="!bg-white !border-2 !rounded-md mb-3">
      <div>
        <h1 className="text-xl font-bold text-green-400 px-4 pt-2">
          Arriving 17 Sept 2024
        </h1>
      </div>
      <div className="hero bg-base-200 !bg-white !place-items-start !items-start !justify-items-start">
        <div className="hero-content flex-col lg:flex-row  !items-start">
          <figure className="!min-w-32 !max-w-24">
            <img className="!max-w-24" src={product.image} alt="Album" />
          </figure>
          <div className="max-w-60 flex flex-col items-start">
            <p className="text-l font-bold">{product?.description}</p>
            <p className="pt-3">
              {" "}
              <span className="line-through">₹ {product?.mrp}</span> ₹{" "}
              {product?.price}
            </p>
            <p>{product?.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
            <div className="flex flex-row gap-3 items-end pt-3">
              <select
                className="select select-bordered max-w-xs text-white"
                defaultValue={count}
                // onChange={(e) => handleChange(e, item._id)} // Update state on change
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <a className="link">Delete</a>
            </div>
          </div>
          <div className="px-5">
            <p className="text-l font-bold">Choose Delivery Options</p>
            <label className="px-2">
              <span className="flex">
                <input
                  type="radio"
                  name={`${product?._id}`}
                  id=""
                  defaultChecked
                  className="radio "
                />
                <span className="px-2">
                  {" "}
                  Tuesday 17 Sept <br />
                  ₹40.00 Delivery
                </span>
              </span>
            </label>
            <br />
            <label className="px-2 flex-col lg:flex-row  !items-start">
              <span className="flex">
                <input
                  type="radio"
                  name={`${product?._id}`}
                  id=""
                  className="radio pt-5"
                />
                <span className="px-2">
                  {" "}
                  Tomorrow <br />
                  ₹100.00 Delivery
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutItems;
