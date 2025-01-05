import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const onSubmit = (data) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(data);
    const formData = {
      userId: userId,
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };
    axios
      .put("http://localhost:3333/users/resetPassword", formData)
      .then((res) => {
        console.log(res);
        setPasswordUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
      document.getElementById("resetPassword-modal").close()
    setPasswordUpdated(false)
  }
console.log(passwordUpdated);
  return (
    <div>
      <dialog id="resetPassword-modal" className="modal">
        <div className="modal-box">
          {!passwordUpdated ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-3xl font-bold my-3">Reset Password</p>
              <label className="input input-bordered flex items-center gap-2 my-3 mt-8">
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
                  placeholder="Old Password"
                  className="grow"
                  {...register("oldPassword", {
                    required: "oldPassword is required",
                  })}
                />
                {errors.oldPassword && (
                  <span className="text-red-600">
                    {errors.oldPassword.message}
                  </span>
                )}
              </label>
              <label className="input input-bordered flex items-center gap-2 my-3 mt-8">
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
                  placeholder="New Password"
                  className="grow"
                  {...register("newPassword", {
                    required: "New password is required",
                    validate: (value) =>
                      value !== getValues("oldPassword") ||
                      "New password must be different from the old password",
                  })}
                />
                {errors.newPassword && (
                  <span className="text-red-600">
                    {errors.newPassword.message}
                  </span>
                )}
              </label>
              <div className="justify-end flex gap-2 mt-8">
                <button className="btn" type="button" onClick={() => document.getElementById('resetPassword-modal').close()}>
                  Cancel
                </button>
                <button className="btn" type="submit">
                  Change
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p>Password Updated Successfully</p>
              <button type="button" className="btn mt-8" onClick={handleCancel}> close </button>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default ResetPassword;
