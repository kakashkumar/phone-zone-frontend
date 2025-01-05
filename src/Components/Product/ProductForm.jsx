import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductForm({ formSubmit, product }) {
  const [page, setPage] = useState("page1");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      description: "",
      image: "",
      sp: "",
      mrp: "",
      countInStock: "",
      technology: "",
      announced: "",
      status: "",
      dimensions: "",
      build: "",
      sim: "",
      weight: "",
      type: "",
      size: "",
      resolution: "",
      protection: "",
      os: "",
      chipset: "",
      cpu: "",
      gpu: "",
      cardSlot: "",
      internal: "",
      megaPixel: "",
      aperture: "",
      features: "",
      video: "",
      smegaPixel: "",
      saperture: "",
      sfeatures: "",
      svideo: "",
      loudSpeaker: "",
      jack: "",
      wlan: "",
      bluetooth: "",
      positioning: "",
      nfc: "",
      radio: "",
      usb: "",
      sensors: "",
      specialFeatures: "",
      batteryType: "",
      batteryCapacity: "",
      charging: "",
    },
  });

  useEffect(() => {
    console.log("product", product);
    if (product) {
      reset({
        name: product?.name || "",
        brand: product?.brand || "",
        category: product?.category || "",
        description: product?.description || "",
        image: product?.image || "",
        sp: product?.sp || "",
        mrp: product?.mrp || "",
        countInStock: product?.countInStock || "",
        technology: product?.network?.technology || "",
        announced: product?.launch?.announced || "",
        status: product?.launch?.status || "",
        dimensions: product?.body?.dimensions || "",
        build: product?.body?.build || "",
        sim: product?.body?.sim || "",
        weight: product?.body?.weight || "",
        type: product?.display?.type || "",
        size: product?.display?.size || "",
        resolution: product?.display?.resolution || "",
        protection: product?.display?.protection || "",
        os: product?.platform?.os || "",
        chipset: product?.platform?.chipset || "",
        cpu: product?.platform?.cpu || "",
        gpu: product?.platform?.gpu || "",
        cardSlot: product?.memory?.cardslot || "",
        internal: product?.memory?.internal || "",
        megaPixel: product?.mainCamera?.megapixel || "",
        aperture: product?.mainCamera?.aperture || "",
        features: product?.mainCamera?.features || "",
        video: product?.mainCamera?.video || "",
        smegaPixel: product?.selfieCamera?.smegapixel || "",
        saperture: product?.selfieCamera?.saperture || "",
        sfeatures: product?.selfieCamera?.sfeatures || "",
        svideo: product?.selfieCamera?.svideo || "",
        loudSpeaker: product?.sound?.loudspeaker || "",
        jack: product?.sound?.jack || "",
        wlan: product?.comms?.wlan || "",
        bluetooth: product?.comms?.bluetooth || "",
        positioning: product?.comms?.positioning || "",
        nfc: product?.comms?.nfc || "",
        radio: product?.comms?.radio || "",
        usb: product?.comms?.usb || "",
        sensors: product?.features?.sensors || "",
        specialFeatures: product?.features?.specialfeatures || "",
        batteryType: "",
        batteryCapacity: product?.battery?.batteryCapacity || "",
        charging: product?.battery?.charging || "",
      });
    }
  }, [product, reset]);

  return (
    <div className="shadow-xl w-full !bg-white h-fit px-7 py-3">
      <form
        key={product?._id || "default-form"}
        onSubmit={handleSubmit(formSubmit)}
      >
        {page === "page1" ? (
          <div className="page1">
            <p className="text-left font-bold text-black">
              General Information
            </p>
            <div className="grid grid-cols-4 gap-4 ">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Product Name</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", { required: "Name is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Brand</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("brand", { required: "Brand is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Category</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("category", {
                    required: "Category is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Description</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">SellingPrice</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("sp", { required: "Selling Price is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">
                    MarketRetailPrice
                  </span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("mrp", { required: "MRP is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">CountInStock</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("countInStock", {
                    required: "Count In stock is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Image</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  {...register("image", {
                    required: "image is required",
                  })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Network</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Technology</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("technology", {
                    required: "Technology is required",
                  })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Launch</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Announced</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("announced", {
                    required: "Announced is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Status</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("status", { required: "Status is required" })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Body</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Dimensions</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("dimensions", {
                    required: "Dimensions is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Build</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("build", { required: "Build is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Sim</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("sim", { required: "Sim is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Weight</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("weight", { required: "Weight is required" })}
                />
              </label>
            </div>
            <div className="flex justify-end mt-3">
              <button
                className="btn flex justify-end"
                onClick={() => setPage("page2")}
              >
                Next
              </button>
            </div>
          </div>
        ) : page === "page2" ? (
          <div className="page2">
            <p className="text-left font-bold mt-5 text-black">Display</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Type</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("type", { required: "Type is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Size</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("size", { required: "Size is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Resolution</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("resolution", {
                    required: "Resolution is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Protection</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("protection", {
                    required: "Protection is required",
                  })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Platform</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Os</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("os", { required: "OS is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Chipset</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("chipset", { required: "Chipset is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Cpu</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("cpu", { required: "CPU is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Gpu</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("gpu", { required: "GPU is required" })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Memory</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">CardSlot</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("cardSlot", {
                    required: "Card Slot is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Internal</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("internal", {
                    required: "Internal is required",
                  })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Main Camera</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">MegaPixel</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("megaPixel", {
                    required: "MegaPixel is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Aperture</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("aperture", {
                    required: "Aperture is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Features</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("features", {
                    required: "Features is required",
                  })}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Video</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("video", { required: "Video is required" })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Selfie Camera</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">MegaPixel</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("smegaPixel", {
                    required: "Mega Pixel is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Aperture</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("saperture", {
                    required: "Aperture is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Features</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("sfeatures", {
                    required: "Features is required",
                  })}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Video</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("svideo", { required: "Video is required" })}
                />
              </label>
            </div>
            <div className="flex justify-between mt-3">
              <button className="btn" onClick={() => setPage("page1")}>
                Prev
              </button>
              <button className="btn" onClick={() => setPage("ff")}>
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-left font-bold mt-5 text-black">Sound</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">LoudSpeaker</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("loudSpeaker", {
                    required: "Loud Speaker is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Jack</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("jack", { required: "Jack is required" })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Comms</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Wlan</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("wlan", { required: "Wlan is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Bluetooth</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("bluetooth", {
                    required: "Bluetooth is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Positioning</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("positioning", {
                    required: "Positioning is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">NFC</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("nfc", { required: "NFC is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Radio</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("radio", { required: "Radio is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Usb</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("usb", { required: "USB is required" })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Features</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Sensors</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("sensors", { required: "Sensors is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">SpecialFeatures</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("specialFeatures", {
                    required: "Special Features is required",
                  })}
                />
              </label>
            </div>
            <p className="text-left font-bold mt-5 text-black">Battery</p>
            <div className="grid grid-cols-4 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">BatteryType</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("batteryType", { required: "Type is required" })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">BatteryCapacity</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("capacity", {
                    required: "Capacity is required",
                  })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Charging</span>
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  {...register("charging", {
                    required: "Charging is required",
                  })}
                />
              </label>
            </div>
            <div className="mt-3 flex justify-between">
              <button className="btn" onClick={() => setPage("page2")}>
                Prev
              </button>
              <div className="flex gap-2">
                <button className="btn" type="submit">
                  {product ? "Update" : "Add"}
                </button>
                {product ? (
                  <button
                    className="btn"
                    type="button"
                    onClick={() => navigate(`/product/${product?._id}`)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button className="btn" type="button" onClick={() => navigate("/")}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProductForm;
