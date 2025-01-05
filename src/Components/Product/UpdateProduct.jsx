import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProduct, updateProduct } from "./productSlice";

function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({})

  const id = useParams()  

  useEffect(() => {
    const getProductById = async () => {
        var res = await dispatch(getProduct(id?.id))
        if(res?.payload){
            setProduct(res?.payload?.data)
        }
    }
    getProductById()
  }, [dispatch, id])
  

  const formSubmit = (data) => {
console.log(data);

    const updateFormData = {
        id : id?.id,
       formData :  {
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
      }
    };

    var res = dispatch(updateProduct(updateFormData))
    if(res?.payload){
        console.log(res?.payload?.data);
        
    }
    // axios
    //   .post("http://localhost:3333/api/product/create", formData)
    //   .then((res) => {
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  
  return (
    <div>
      <div className="breadcrumbs bg-white px-8 text-black text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/product/${product?._id}`}>Product</Link>
          </li>
          <li>
            <p>Update Product</p>
          </li>
        </ul>
      </div>
      <p className="font-bold bg-white text-black pt-4 text-xl">Update Product</p>
      <ProductForm formSubmit={formSubmit} product={product}/>
    </div>
  );
}

export default UpdateProduct;
