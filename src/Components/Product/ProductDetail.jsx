import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProduct } from "./productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, getCartItems } from "../Cart/cartSlice";

export const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    return state?.cart?.getCartItemsData
  })

  const productDetails = useSelector((state) => {
    return state?.product
  })

  const navigate = useNavigate();

  const handleCart = async () => {
    const res = await dispatch(addCartItems(product._id));
    if (res?.payload) {
      fetchCartItems()
    }
  };
  
  const getProductAsync = async () => {
    try {
      const res = await dispatch(getProduct(id))
      if(res?.payload){
        setProduct(res?.payload?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCartItems = async () => {
    try {
      const res = await dispatch(getCartItems());
      if (res?.payload) {
       // setCartItems(res?.payload?.data[0]?.products);
      }
    } catch (error) {
      console.error("Error fetching cartItems:", error);
    }
  };
  useEffect(() => {
    getProductAsync()
    console.log('pro');
    
  }, []);
  

  const handleUpdate = (id) => {
    navigate(`/product/update-product/${id}`);
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }
  
  
  const handleCheckout = () => {
    console.log(product);
    
    navigate(`/product/checkout`,  { state: {products: [product], path: 'product', cartItems: cartItems?.filter(x => [product]?.includes(x.productId)) } });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const currentDate = new Date(); // Get the current date
  const futureDate = new Date(currentDate); // Create a copy of the current date
  futureDate.setDate(currentDate.getDate() + 3);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[futureDate.getDay()]; // getDay() returns a number from 0 (Sunday) to 6 (Saturday)

  // Get the date in "MM/DD/YYYY" format
  const date = futureDate.getDate();

  if(productDetails?.productLoading){
    return(
      <span className="loading loading-spinner loading-lg flex justify-center absolute left-2/4 top-2/4"></span>
    )
  }

  return (
    <div className="hero bg-base-200 min-h-screen !items-start !bg-slate-200 place-items-start">
      <div className="breadcrumbs px-8 text-black text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <p>Product</p>
          </li>
        </ul>
      </div>
      <div className="hero-content flex-col lg:flex-row !items-start mt-5">
        <div>
          <img
            src={product.image}
            className=" rounded-lg shadow-2xl !min-w-72 !max-w-48 "
          />
          <div>
            <div className="card bg-base-100 w-96 shadow-xl bg-white mt-8 !min-w-72 !max-w-48 text-black">
              <div className="card-body">
                <p>Grand Total : {product?.sp}</p>
                <p>
                  FREE delivery {dayName} {date}th
                </p>
                <p>{`Deliver to ${user?.firstName} ${user?.lastName} ${user?.defaultAddress?.city} ${user?.defaultAddress?.pincode}`}</p>
                <p>In stock‌</p>
                <div className="flex flex-col gap-3">
                  <button className="btn btn-primary" onClick={handleCart}>
                    Add To Cart
                  </button>
                  <button className="btn btn-primary" onClick={handleCheckout}>
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-10 flex flex-col !items-start">
          {user && user?.userRolesDetails?.roleName === "Admin" && <div className="flex flex-row gap-3 !justify-items-end">
            <button className="btn" type="button" onClick={() => handleUpdate(product?._id)}>
              Update
            </button>
            <button className="btn" type="button" onClick={() => handleDelete(product?._id)}>
              Delete
            </button>
          </div>}
          <h1 className=" py-6 text-4xl font-semibold text-left !text-black">
            {product.name} (
            <span className="py-6 !text-3xl text-left !text-black">
              {product.description}
            </span>
            )
          </h1>
          <p className="text-black font-bold">Brand : {product?.brand}</p>
          <div className="py-2 rating">
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star"
              defaultChecked
            />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star"
            />{" "}
            <span>{product.rating}</span>
          </div>
          <p className=" py-2 !text-black text-xl font-bold">
            {" "}
            ₹ {product?.sp} <span className="text-sm font-normal">17%</span>
          </p>
          <p className="py-2 !text-black line-through">MRP ₹{product?.mrp}</p>

          <p className="py-2 font-bold mt-4 !text-black">SPECIFCATIONS</p>
          <div className="overflow-x-auto">
            <table className="table text-black">
              <tbody>
                <tr>
                  <td className="font-bold">NETWORK</td>
                  <td>Technology</td>
                  <td>{product?.network?.technology}</td>
                </tr>
                <tr>
                  <td className="font-bold">LAUNCH</td>
                  <td>
                    <div>Announce</div>
                    <div>Status</div>
                  </td>
                  <td>
                    <div>{product?.launch?.announced}</div>
                    <div>{product?.launch?.status}</div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">BODY</td>
                  <td>
                    <div className="flex flex-col">
                      <span>Dimensions</span>
                      <span>Weight</span>
                      <span>Build</span>
                      <span>SIM</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{product?.body?.dimensions}</span>
                      <span>{product?.body?.weight}</span>
                      <span>{product?.body?.build}</span>
                      <span>{product?.body?.sim}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">DISPLAY</td>
                  <td>
                    <div className="flex flex-col">
                      <span>Type</span>
                      <span>Size</span>
                      <span>Resolution</span>
                      <span>Protection</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{product?.display?.type}</span>
                      <span>{product?.display?.size}</span>
                      <span>{product?.display?.resolution}</span>
                      <span>{product?.display?.protection}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">PLATFORM</td>
                  <td>
                    <div className="flex flex-col">
                      <span>OS</span>
                      <span>Chipset</span>
                      <span>CPU</span>
                      <span>GPU</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{product?.platform?.os}</span>
                      <span>{product?.platform?.chipset}</span>
                      <span>{product?.platform?.cpu}</span>
                      <span>{product?.platform?.gpu}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">MEMORY</td>
                  <td>
                    <div className="flex flex-col">
                      <span>Card Slot</span>
                      <span>Internal</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{product?.memory?.cardSlot}</span>
                      <span>{product?.memory?.internal}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">MAIN CAMERA</td>
                  <td>
                    <div className="flex flex-col">
                      <span>Megapixel</span>
                      <span>Aperture</span>
                      <span>Features</span>
                      <span>Video</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{product?.mainCamera?.mp}</span>
                      <span>{product?.mainCamera?.aperture}</span>
                      <span>{product?.mainCamera?.features}</span>
                      <span>{product?.mainCamera?.video}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">SELFIE CAMERA</td>
                  <td>
                    <div className="flex flex-col">
                      <span>Megapixel</span>
                      <span>Aperture</span>
                      <span>Features</span>
                      <span>Video</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{product?.mainCamera?.mp}</span>
                      <span>{product?.mainCamera?.aperture}</span>
                      <span>{product?.mainCamera?.features}</span>
                      <span>{product?.mainCamera?.video}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">SOUND</td>
                  <td>
                    <div className="flex flex-col">
                      <span>Loud Speaker</span>
                      <span>Jack</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{product?.sound?.loudspeaker}</span>
                      <span>{product?.sound?.jack}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">COMMS</td>
                  <td>
                    <div className="flex flex-col">
                      <span>WLAN</span>
                      <span>Bluetooth</span>
                      <span>Positioning</span>
                      <span>NFC</span>
                      <span>Radio</span>
                      <span>USB</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{product?.comms?.wlan}</span>
                      <span>{product?.comms?.bluetooth}</span>
                      <span>{product?.comms?.positioning}</span>
                      <span>{product?.comms?.nfc == true ? "Yes" : "No"}</span>
                      <span>{product?.comms?.radio}</span>
                      <span>{product?.comms?.usb}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
