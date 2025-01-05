import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile({ setLoginBtn, loginBtn }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);

    if (user?.firstName) {
      setLoginBtn("Logout");
    } else {
      setLoginBtn("Login");
    }
  }, []);

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.firstName) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLoginBtn("Login");
      navigate('/')
    } else {
      document.getElementById("login-modal").showModal();
      setLoginBtn("Logout");
    }
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          {loginBtn === "Logout" && (
            <div>
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              {user && user?.userRolesDetails?.roleName === "Admin" && (
                <li>
                  <Link to="/users" className="justify-between">
                    Users
                  </Link>
                </li>
              )}
            </div>
          )}
          <li>
            <a onClick={handleLogin}>{loginBtn}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
