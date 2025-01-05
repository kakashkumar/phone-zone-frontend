import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({});
  const [editFlag, setEditFlag] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    axios
      .get(`http://localhost:3333/users/userProfile?id=${userId}`)
      .then((res) => {
        setUser(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      gender: user?.gender || "",
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      gender: user?.gender || "",
    });
  }, [user, reset]);

  const handleEdit = () => {
    setEditFlag(true);
  };

  const onSubmit = (data) => {
    console.log(data);
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      gender: data.gender,
      address: data.address,
    };
    const id = JSON.parse(localStorage.getItem("user"))._id;
    axios
      .put(`http://localhost:3333/users/UpdateUser?id=${id}`, formData)
      .then((res) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(res.data));
        setEditFlag(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto">
      <div className="breadcrumbs  text-black text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <p>Profile Details</p>
          </li>
        </ul>
      </div>
      <h1 className="items-start text-2xl font-extrabold my-3">Your Profile</h1>
      <div className="justify-end flex gap-2">
        <button
          className="btn"
          onClick={() =>
            document.getElementById("resetPassword-modal").showModal()
          }
        >
          Reset Password
        </button>
        <button className="btn" onClick={handleEdit}>
          Edit
        </button>
      </div>
      <p className="items-start text-2xl flex font-bold gap-4 my-3">
        General Information
      </p>
      <form
        className="grid grid-cols-3 gap-4 my-8 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="input input-bordered flex items-center gap-2">
          FirstName :
          <input
            type="text"
            className="grow"
            placeholder="Name"
            {...register("firstName", { required: "Name is required" })}
            disabled={editFlag === false}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label className="input input-bordered flex items-center gap-2">
          LastName :
          <input
            type="text"
            className="grow"
            placeholder="Name"
            {...register("lastName", { required: "Name is required" })}
            disabled={editFlag === false}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email :
          <input
            type="text"
            className="grow"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            disabled
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Phone :
          <input
            type="text"
            className="grow"
            placeholder="Phone"
            {...register("phone", { required: "Phone is required" })}
            disabled={editFlag === false}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </label>
        <select
          className="select select-bordered"
          {...register("gender", { required: "gender is Required" })}
          disabled={editFlag === false}
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
        <textarea
          className="textarea textarea-bordered"
          placeholder="Address"
          {...register("address", { required: "Address is Required" })}
          disabled={editFlag === false}
        ></textarea>
        {errors.address && (
          <span className="text-red-600">{errors.address.message}</span>
        )}
        {editFlag && (
          <div className="justify-end flex gap-2 col-span-3 mt-8">
            <button
              className="btn"
              type="button"
              onClick={() => setEditFlag(false)}
            >
              {" "}
              Cancel
            </button>
            <button className="btn" type="submit">
              {" "}
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
