import React from "react";
import ProductForm from "./ProductForm";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const formSubmit = (data) => {
    const formData = {
      name: data.name,
      image: data.image,
      images: data?.images,
      brand: data?.brand,
      category: data?.category,
      description: data?.description,
      reviews: data?.reviews,
      rating: data?.rating,
      numReviews: data?.numReviews,
      sp: data?.sp,
      mrp: data?.mrp,
      countInStock: 12,
      image: data?.image?.[0]?.name,
      network: {
        technology: data?.technology,
      },
      launch: {
        announced: data?.announced,
        status: data?.status,
      },
      colours: data?.colours,
      size: [
        {
          memory: 128,
          mrp: 20999,
          sp: 17999,
        },
        {
          memory: 256,
          mrp: 22999,
          sp: 19999,
        },
      ],
      body: {
        dimensions: data?.dimensions,
        weight: data?.weight,
        build: data?.build,
        sim: data?.sim,
      },
      display: {
        type: data?.type,
        size: data?.size,
        resolution: data?.resolution,
        protection: data?.protection,
      },
      platform: {
        os: data?.os,
        chipset: data?.chipset,
        cpu: data?.cpu,
        gpu: data?.gpu,
      },
      memory: {
        cardSlot: data?.cardSlot,
        internal: data?.internal,
      },
      mainCamera: {
        dual: data?.mainCamera?.dual,
        features: data?.mainCamera?.features,
        video: data?.mainCamera?.video,
      },
      selfieCamera: {
        single: data?.selfieCamera?.single,
        features: data?.selfieCamera?.features,
        video: data?.selfieCamera?.video,
      },
      sound: {
        loudspeaker: data?.loudspeaker,
        jack: data?.jack,
      },
      comms: {
        wlan: data?.wlan,
        bluetooth: data?.bluetooth,
        positioning: data?.positioning,
        nfc: data?.nfc,
        radio: data?.radio,
        usb: data?.usb,
      },
      features: {
        sensors: data?.sensors,
      },
      Battery: {
        type: data?.type,
        charging: data?.charging,
      },
    };
    console.log(formData);
    axios
      .post("http://localhost:3333/api/product/create", formData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="breadcrumbs bg-white px-8 text-black text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <p>Add Product</p>
          </li>
        </ul>
      </div>
      <p className="font-bold bg-white text-black pt-4 text-xl">Add Product</p>
      <ProductForm formSubmit={formSubmit} />
    </div>
  );
}

export default AddProduct;
