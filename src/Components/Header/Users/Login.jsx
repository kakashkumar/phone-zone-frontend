import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin, checkEmail, resetPassword } from "./userSlice";

function Login({ setLoginBtn }) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const [emailExist, setEmailExist] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(true);
  const [apiErrors, setApiErrors] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEmailSubmit = async (data) => {
    try {
      const res = await dispatch(checkEmail(data.email));
      setRegisteredEmail(res?.payload?.is_email_registered);
  
      if (res?.payload?.data?.is_email_registered === true) {
        setEmailExist(true);
      } else {
        setEmailExist(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onPasswordSubmit = async (data) => {
    console.log(data);
    const formData = {
      email: data.email,
      password: data.password,
    };
    const res = await dispatch(userLogin(formData))
    console.log(res)
    localStorage.setItem("token", res?.payload?.token);
    localStorage.setItem("user", JSON.stringify(res?.payload?.user));
    navigate("/");
    document.getElementById("login-modal").close();
  };

  const handleRegisterPage = () => {
    document.getElementById("register-modal").showModal();
    document.getElementById("login-modal").close();
  };

  const onResetPasswordSubmit = async (data) => {
    const res = await dispatch(resetPassword(FormData))
    setResetSuccessMessage(res?.payload?.data.message);
    document.getElementById("login-modal").close();
    document.getElementById("reset-success-modal").showModal();
    setForgotPasswordModal(false);
    setLoginBtn("Login");

  };

  return (
    <div>
      <dialog id="login-modal" className="modal">
        <div className="modal-box">
          <h1 className="text-3xl font-bold my-3"> Login </h1>
          {!emailExist && (
            <form
              onSubmit={handleSubmit(onEmailSubmit)}
              className="gap-x-2 flex flex-col"
            >
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
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              {!registeredEmail && (
                <p>
                  Not Registered?{" "}
                  <a onClick={handleRegisterPage}>Click here to Register</a>{" "}
                </p>
              )}
              <button className="btn my-3" type="submit">
                Continue
              </button>
            </form>
          )}

          {emailExist && !forgotPasswordModal && (
            <form
              onSubmit={handleSubmit(onPasswordSubmit)}
              className="gap-x-2 flex flex-col"
            >
              <p>
                {" "}
                {getValues("email")}{" "}
                <a onClick={() => setEmailExist(false)}>Change?</a>
              </p>
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
                  {...register("password", {
                    required: "Password is Required",
                  })}
                />
                {errors.password ? (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                ) : (
                  apiErrors && (
                    <span className="text-red-600">
                      {apiErrors.response?.errors?.message}
                    </span>
                  )
                )}
              </label>
              <a onClick={() => setForgotPasswordModal(true)}>
                Forgot Password?
              </a>
              <button className="btn my-3" type="submit">
                Login
              </button>
              <button
                className="btn my-3"
                type="button"
                onClick={() => document.getElementById("login-modal").close()}
              >
                Cancel
              </button>
            </form>
          )}
          {forgotPasswordModal && (
            <form
              onSubmit={handleSubmit(onResetPasswordSubmit)}
              className="gap-x-2 flex flex-col"
            >
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
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <button className="btn my-3" type="submit">
                Reset
              </button>
            </form>
          )}
        </div>
      </dialog>
      <dialog id="reset-success-modal" className="modal">
        <div className="modal-box">
          <h1>{resetSuccessMessage}</h1>
          <button
            className="btn my-3"
            onClick={() =>
              document.getElementById("reset-success-modal").close()
            }
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
