import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useResolvedPath } from "react-router-dom";
import { getUserById, updateUser } from "./Users/userSlice";

function UserDetails() {
  const [user, setUser] = useState({});
  const [editFlag, setEditFlag] = useState(false);

  const id = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetail = async (id) => {
      const res = await dispatch(getUserById(id));

      if (res?.payload) {
        console.log(res?.payload);

        setUser(res?.payload);
      }
    };
    fetchUserDetail(id);
  }, [id]);

  const userData = useSelector((state) => {
    return state?.user?.userData;
  });

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
      role: user?.userRolesDetails?.roleName || "",
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
      role: user?.userRolesDetails?.roleName || "",
    });
  }, [user, reset]);

  const handleEdit = () => {
    setEditFlag(true);
  };

  const onSubmit = async (data) => {
    const id = JSON.parse(localStorage.getItem("user"))._id;
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      gender: data.gender,
      address: data.address,
      role: data.role,
    };
    const updateData = {
      id,
      formData,
    };
    var res = await dispatch(updateUser(updateData));
    if (res?.payload) {
      setEditFlag(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="breadcrumbs  text-black text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <p>User Details</p>
          </li>
        </ul>
      </div>
      <h1 className="items-start text-2xl font-extrabold my-3">User Detail</h1>
      <div className="justify-end flex gap-2">
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

        <select
          className="select select-bordered"
          {...register("role", { required: "role is Required" })}
          disabled={editFlag === false}
        >
          <option disabled selected>
            Select Role
          </option>
          <option>Admin</option>
          <option>User</option>
          {errors.role && (
            <span className="text-red-600">{errors.role.message}</span>
          )}
        </select>
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

export default UserDetails;
