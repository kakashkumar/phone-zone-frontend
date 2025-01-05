import React, { useEffect, useState } from "react";
import Address from "./Address";
import Search from "./Search";
import Cart from "./Cart";
import Profile from "./Profile";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userList } from "./Users/userSlice";

export const Header = ({ loginBtn, setLoginBtn }) => {
  const [show, setShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [profileShow, setProfileShow] = useState("");
  const [user, setUser] = useState({});

  const [showRegister, setShowRegister] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);
  const handleUpdateModalClose = () => setUpdateModalShow(false);
  const handleUpdateModalOpen = () => setUpdateModalShow(true);
  const handleProfileHide = () => setProfileShow(false);
  const handleUserDefault = () => setUser({});

  const id = JSON.parse(localStorage.getItem("user"))?._id;

  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3333/users/userProfile?id=${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [profileShow, id]);

  useEffect(() => {
    dispatch(userList())
  })

  return (
    <div>
      <div className="navbar bg-primary">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Phone-Zone
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Search />
          <Address user={user} />
          <Cart />
          <Profile
            loginBtn={loginBtn}
            setLoginBtn={setLoginBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
