import React, { useEffect, useState } from "react";
import { AddressList } from "../Address/AddressList";
import axios from "axios";
import PaymentList from "../Payment/PaymentList";
import CartList from "../Cart/CartList";
import CheckOutItems from "../Cart/CheckOutItems";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const CheckOut = ({ state }) => {
  const [isSelected, setIsSelected] = useState("address");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const selectedAddress = JSON.parse(
    localStorage.getItem("user")
  )?.defaultAddress;

  const [defaultAddress, setDefaultAddress] = useState(selectedAddress);

  const params = useParams();

  const location = useLocation();

  console.log(location.state);

  useEffect(() => {
    if (defaultAddress) {
      document.getElementById("payment").checked = true;
      setIsSelected("payment");
    } else {
      document.getElementById("address").checked = true;
      setIsSelected("address");
    }
  }, []);

  // useEffect(() => {
  //   setSelectedProducts(cartProductsDetails?.filter(x => checkedItems?.includes(x._id)))
  // },[checkedItems])

  const handleDefaultAddress = (addressSelected) => {
    const formData = {
      defaultAddress: addressSelected,
    };
    const id = JSON.parse(localStorage.getItem("user"))._id;
    axios
      .put(`http://localhost:3333/users/UpdateUser?id=${id}`, formData)
      .then((res) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(res.data));
        setDefaultAddress(addressSelected);
        setIsSelected("payment");
        document.getElementById("payment").checked = true;
      })
      .catch((err) => console.log(err));
  };
  console.log(location?.state);

  useEffect(() => {
    setSubTotal(
      calculateSubTotal(location?.state?.products, location?.state?.cartItems)
    );
  }, [location?.state?.products]);

  const calculateSubTotal = (cartProducts, cartItems) => {
    return cartProducts?.reduce((accumulator, item) => {
      // Find the quantity for the current item in cartItems
      const cartItem = cartItems?.find((x) => x.productId === item._id);
      let quantity = 1;
      if (cartItem) {
        quantity = cartItem?.quantity;
      }

      // Log for debugging
      console.log(
        `Item ID: ${item._id}, Price: ${item.price}, Quantity: ${quantity}`
      );

      // Calculate subtotal for the item and add to the accumulator
      return accumulator + (item?.price || 0) * quantity;
    }, 0);
  };

  return (
    <div className="">
      <div className="breadcrumbs px-8 text-black text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {location.state?.path === "product" ? (
            <li>
              <Link to={`/product/${location.state.products[0]._id}`}>
                Product
              </Link>
            </li>
          ) : (
            <li>
              <Link to={`/cartlist`}>Cart List</Link>
            </li>
          )}
          <li>
            <p>Check Out</p>
          </li>
        </ul>
      </div>
      <div className="join join-vertical w-3/5 !bg-white !text-black overflow-y-auto">
        <div className="collapse  join-item ">
          <input
            type="radio"
            name="my-accordion-4"
            defaultChecked
            id="address"
            onChange={() =>
              setIsSelected(
                document.getElementById("address").checked && "address"
              )
            }
          />
          <div className="collapse-title text-xl font-medium flex items-start justify-between">
            {isSelected != "address" ? (
              <p className="">1. Delivery Address</p>
            ) : (
              <p className="">1. Select your address</p>
            )}
            {isSelected != "address" && (
              <p className="justify-items-end relative w-96">
                <span className="label-text !text-black">{`${defaultAddress.flatHouseNo}, ${defaultAddress.areaStreet}, ${defaultAddress.landmark} ${defaultAddress.city}, ${defaultAddress.state}, ${defaultAddress.country}, ${defaultAddress.pincode}`}</span>
              </p>
            )}
          </div>
          <div className="collapse-content">
            <AddressList handleDefaultAddress={handleDefaultAddress} />
          </div>
        </div>
        <div className="collapse  join-item ">
          <input
            type="radio"
            name="my-accordion-4"
            id="payment"
            onChange={() =>
              setIsSelected(
                document.getElementById("payment").checked && "payment"
              )
            }
          />
          <div className="collapse-title text-xl font-medium flex items-start justify-between">
            {isSelected != "payment" ? (
              <p className="">2. Payment Method</p>
            ) : (
              <p className="">2. Select Payment Method</p>
            )}
            {isSelected != "payment" && (
              <p className="justify-items-end relative w-96">Pay on Delivery</p>
            )}
          </div>
          <div className="collapse-content">
            <PaymentList />
          </div>
        </div>
        <div className="collapse  join-item">
          <input
            type="radio"
            name="my-accordion-4"
            id="delivery"
            onChange={() =>
              setIsSelected(
                document.getElementById("delivery").checked && "delivery"
              )
            }
          />
          <div className="collapse-title text-xl font-medium flex items-start justify-between">
            {isSelected != "delivery" ? (
              <p className="">3. Items and Delivery</p>
            ) : (
              <p className="">3. Review the items and Delivery</p>
            )}
          </div>
          <div className="collapse-content">
            {location?.state?.products?.map((product) => {
              const count = location?.state?.cartItems?.find(
                (x) => x.productId === product._id
              )?.quantity;
              return (
                <CheckOutItems
                  product={product}
                  count={count}
                  subTotal={subTotal}
                />
              );
            })}
            <div>
              <div className="card bg-white !border-2 !rounded-md mt-3">
                <div className="card-body flex flex-row">
                  <div className="card-actions">
                    <button className="btn btn-warning">
                      Place your order
                    </button>
                  </div>
                  <div className="ml-5">
                    <h2 className="card-title">Order Total:₹ {subTotal}</h2>
                    <p>
                      By placing your order, you agree to terms and conditions
                      of use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
