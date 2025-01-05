import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "./userSlice";

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  console.log(errors);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      email: data.email,
      phone: data.phoneNumber,
      address: data.address,
      gender: data.gender,
      isAdmin: false,
    };
    const res = await dispatch(registerUser(formData));
    if (res?.payload) {
      return (
        <div className="toast">
          <div className="alert alert-success">
            <span>Registered Successfully.</span>
          </div>
        </div>
      );
    }
    document.getElementById("register-modal").close();
    console.log(res);
  };
  return (
    <div>
      <dialog id="register-modal" className="modal">
        <div className="modal-box">
          <h1 className="text-3xl font-bold my-3"> Register </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-x-2 flex flex-col"
          >
            <label className="input input-bordered flex items-center gap-2 my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="FirstName"
                {...register("firstName", {
                  required: "FirstName is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-600">{errors.firstName.message}</span>
              )}
            </label>
            <label className="input input-bordered flex items-center gap-2 my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="LastName"
                {...register("lastName", { required: "LastName is required" })}
              />
              {errors.lastName && (
                <span className="text-red-600">{errors.lastName.message}</span>
              )}
            </label>
            <label className="input input-bordered flex items-center gap-2 my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </label>
            <label className="input input-bordered flex items-center gap-2 my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                className="grow"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </label>
            <label className="input input-bordered flex items-center gap-2 my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="confirm Password"
                className="grow"
                {...register("confirmPassword", {
                  required: "Confirm Password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>
            <textarea
              className="textarea textarea-bordered my-3"
              placeholder="Address"
              {...register("address", { required: "Address is Required" })}
            ></textarea>
            {errors.address && (
              <span className="text-red-600">{errors.address.message}</span>
            )}
            <label className="input input-bordered flex items-center gap-2 my-3">
              <input
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone number is Required",
                })}
              ></input>
              {errors.phoneNumber && (
                <span className="text-red-600">
                  {errors.phoneNumber.message}
                </span>
              )}
            </label>
            <select
              className="select select-bordered w-full max-w-xs my-3"
              {...register("gender", { required: "gender is Required" })}
            >
              <option disabled selected>
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
              {errors.gender && (
                <span className="text-red-600">{errors.gender.message}</span>
              )}
            </select>
            {errors.gender && (
              <span className="text-red-600">{errors.gender.message}</span>
            )}

            <button className="btn my-3" type="submit">
              Register
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => document.getElementById("register-modal").close()}
            >
              Cancel
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
