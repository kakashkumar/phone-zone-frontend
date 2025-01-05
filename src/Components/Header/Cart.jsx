import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()
  const handleCartList = () => {
    navigate(`/cartlist`)
   }

   const cartProducts = useSelector((state) => {
    return state?.product?.getProductsByIdData
   })

   const cartItems = useSelector((state) => {
    return state?.cart?.getCartItemsData
   })
   
   const reformedCartItems = cartItems?.map((ele) => {
     return ele?.products[0]
   })
   const calculateSubTotal = (cartProducts, cartItems) => {
    return cartProducts?.reduce((accumulator, item) => {
        // Find the quantity for the current item in cartItems
        const cartItem = reformedCartItems?.find(x => x.productId === item._id);
        console.log(cartItems);
        
        const quantity = cartItem?.quantity;

        // Log for debugging
        console.log(`Item ID: ${item._id}, Price: ${item.price}, Quantity: ${quantity}`);
        
        // Calculate subtotal for the item and add to the accumulator
        return accumulator + (item?.price || 0) * quantity;
    }, 0);
};

const subTotal = calculateSubTotal(cartProducts, cartItems)
  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">{reformedCartItems?.length}</span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-300 z-[1] mt-3 w-52 shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">{reformedCartItems?.length} Items</span>
            <span className="text-info">Subtotal: ${subTotal}</span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block" onClick={handleCartList}>View cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
