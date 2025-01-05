import React, { useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../Product/productSlice";
import { Link, useNavigate } from "react-router-dom";

function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState();
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const [checkedItems, setCheckedItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProductsDetails = useSelector((state) => {
    return state?.product?.getProductsByIdData;
  });

  const fetchCartItems = async () => {
    try {
      const res = await dispatch(getCartItems());
      if (res?.payload) {
        console.log(res?.payload?.data);

        setCartItems(
          res?.payload?.data?.map((ele) => {
            return ele.products[0];
          })
        );
      }
    } catch (error) {
      console.error("Error fetching cartItems:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [dispatch]);
  console.log(cartItems, "cartlit");

  useEffect(() => {
    const ids = cartItems?.map((product) => product.productId).join(",");
    if (ids) {
      dispatch(getProductsById(ids));
    }
  }, [dispatch, cartItems]);

  const handleChange = async (e, id) => {
    const data = {
      id,
      body: {
        quantity: e.target.value,
      },
    };
    const res = await dispatch(updateCartItemQuantity(data));
    if (res?.payload) {
      // Optionally handle the response
    }
    setQuantity(e.target.value); // Update the quantity state
  };

  const handleDeleteCartItem = async (id) => {
    const res = await dispatch(deleteCartItem(id));
    if (res?.payload) {
      fetchCartItems();
    }
  };

  // Handle checkbox toggle for each item
  const handleCheck = (id) => {
    setCheckedItems((prev) => {
      // Check if the ID is already in the checkedItems array
      if (prev.includes(id)) {
        // If it is, remove it (uncheck)
        return prev.filter((itemId) => itemId !== id);
      } else {
        // If not, add it (check)
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    setCheckedProducts(
      cartProductsDetails?.filter((x) => checkedItems?.includes(x._id))
    );
  }, [checkedItems]);

  useEffect(() => {
    setSubTotal(calculateSubTotal(checkedProducts, cartItems));
  }, [checkedProducts]);

  const calculateSubTotal = (cartProducts, cartItems) => {
    return cartProducts?.reduce((accumulator, item) => {
      // Find the quantity for the current item in cartItems
      const cartItem = cartItems?.find((x) => x.productId === item._id);

      const quantity = cartItem?.quantity;

      // Log for debugging
      console.log(
        `Item ID: ${item._id}, Price: ${item.price}, Quantity: ${quantity}`
      );

      // Calculate subtotal for the item and add to the accumulator
      return accumulator + (item?.price || 0) * quantity;
    }, 0);
  };

  const handleCheckout = () => {
    navigate(`/product/checkout`, {
      state: {
        products: checkedProducts,
        path: "cart",
        cartItems: cartItems?.filter((x) =>
          checkedItems?.includes(x.productId)
        ),
      },
    });
  };

  if (cartItems.length <= 0) {
    return (
      <div className="relative flex">
        <p className="text-black fixed top-2/4 left-2/4">
          Cart Items are empty
        </p>
      </div>
    );
  }

  return (
    <div className="join join-vertical w-full" id="CartList">
      <div className="breadcrumbs bg-base px-8 text-black text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <p>Cart List</p>
          </li>
        </ul>
      </div>
      <div className="bg-base mt-10 p-3">
        <div className="flex justify-between">
          <h2 className="text-black text-xl px-4 flex content-start font-bold">
            Shopping Cart
          </h2>
          <div className="text-black flex items-center">
            <p className="mr-4">
              SubTotal ({checkedItems.length} items) : ₹ {subTotal}
            </p>
            <button className="btn" onClick={handleCheckout}>
              Check Out
            </button>
          </div>
        </div>
        {cartItems != null &&
          cartProductsDetails?.map((item) => {
            const count = cartItems?.find(
              (x) => x.productId === item._id
            )?.quantity;
            return (
              <div
                key={item._id}
                className="card lg:card-side bg-base-100 shadow-xl columns-xs w-full my-3 mt-8 !bg-white"
              >
                <label className="flex flex-row items-center gap-5 mb-3 mx-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={checkedItems.includes(item._id)} // Corrected line
                    onChange={() => handleCheck(item._id)} // Simplified line
                    disabled={item?.countInStock <= 0} // Disable if out of stock
                  />
                  <div className="hero !bg-white mt-5">
                    <div className="flex flex-col lg:flex-row gap-4 w-full !text-black">
                      <figure className="!min-w-72 !max-w-48">
                        <img
                          className="!max-w-48"
                          src={item.image}
                          alt="Album"
                        />
                      </figure>
                      <div className="flex flex-col items-start content-start">
                        <p className="text-l font-bold">{item.description}</p>
                        <p className="py-1">
                          {item?.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                        <p className="py-1">Eligible for free delivery</p>
                        <p className="py-1">Colour - Black</p>
                        <p className="py-1">Size - 128GB</p>
                        <p className="py-1">Price - {item.price}/-</p>
                        <div className="flex flex-row gap-3 items-end">
                          <select
                            className="select select-bordered max-w-xs text-white"
                            defaultValue={count}
                            onChange={(e) => handleChange(e, item._id)} // Update state on change
                          >
                            {[...Array(10).keys()].map((num) => (
                              <option key={num} value={num + 1}>
                                {num + 1}
                              </option>
                            ))}
                          </select>
                          <a
                            className="link"
                            onClick={() => handleDeleteCartItem(item._id)}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CartList;
