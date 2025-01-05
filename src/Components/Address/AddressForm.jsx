import React from "react";
import { useForm } from "react-hook-form";

export const AddressForm = ({ onhandleSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "",
      fullName: "",
      mobileNumber: "",
      pincode: "",
      address1: "",
      address2: "",
      landmark: "",
      city: "",
      state: "",
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onhandleSubmit)} className="">
        <label className="form-control w-full max-w-md !text-white">
          <div className="label">
            <span className="label-text text-black">Country</span>
          </div>
          <select
            className="select select-bordered w-full max-w-md"
            {...register("country", { required: "country is Required" })}
          >
            <option disabled selected>
              Country/Region
            </option>
            <option>India</option>
            <option>USA</option>
            <option>Australia</option>
            {errors.country && (
              <span className="text-red-600">{errors.country.message}</span>
            )}
          </select>
        </label>
        <label className="form-control w-full max-w-md !text-white">
          <div className="label">
            <span className="label-text text-black">
              Full Name (First and LastName)
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full max-w-md"
            {...register("fullName", { required: "fullName is required" })}
          />
        </label>
        <label className="form-control w-full max-w-md !text-white">
          <div className="label">
            <span className="label-text text-black">Mobile Number</span>
          </div>
          <input
            type="number"
            placeholder=""
            className="input input-bordered w-full max-w-md !text-white"
            {...register("mobileNumber", {
              required: "mobileNumber is required",
            })}
          />
        </label>
        <label className="form-control w-full max-w-md !text-white">
          <div className="label">
            <span className="label-text text-black">Pincode</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full max-w-md !text-white"
            {...register("pincode", { required: "pincode is required" })}
          />
        </label>
        <label className="form-control w-full max-w-md">
          <div className="label">
            <span className="label-text text-black">Address 1</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full max-w-md !text-white"
            {...register("address1", { required: "address1 is required" })}
          />
        </label>
        <label className="form-control w-full max-w-md">
          <div className="label">
            <span className="label-text text-black">Address 2</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full max-w-md !text-white"
            {...register("address2", { required: "address2 is required" })}
          />
        </label>
        <label className="form-control w-full max-w-md">
          <div className="label">
            <span className="label-text text-black">Landmark</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full max-w-md !text-white"
            {...register("landmark", { required: "landmark is required" })}
          />
        </label>
        <div className="flex gap-3 w-full max-w-md">
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text text-black">Town/City</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full max-w-md !text-white"
              {...register("city", { required: "city is required" })}
            />
          </label>
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text text-black">State</span>
            </div>
            <select
              className="select select-bordered w-full max-w-md !text-white"
              {...register("state", { required: "state is Required" })}
            >
              <option disabled selected>
                Select State
              </option>
              <option>Karnataka</option>
              <option>Tamil Nadu</option>
              <option>Andra Pradesh</option>
              {errors.state && (
                <span className="text-red-600">{errors.state.message}</span>
              )}
            </select>
          </label>
        </div>
        <div className="justify-end flex ">
          <button
            className="btn mt-5 "
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
