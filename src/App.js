import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Header/Users/Login";
import { Register } from "./Components/Header/Users/Register";
import UserProfile from "./Components/Header/UserProfile";
import Router from "./Router";
import ResetPassword from "./Components/Header/Users/ResetPassword";
import MainContainer from "./Components/MainLayout/MainContainer";
import { ProductDetail } from "./Components/Product/ProductDetail";
import ProductForm from "./Components/Product/ProductForm";
import { AddAddress } from "./Components/Address/AddAddress";

function App() {
  const [loginBtn, setLoginBtn] = useState('')
  return (
    <div className="App bg-slate-100 min-h-screen">
      <Header loginBtn={loginBtn} setLoginBtn={setLoginBtn}/>
      <Login setLoginBtn={setLoginBtn}/>
      <Register />
      <ResetPassword />
      <AddAddress />
      <Router />
    </div>
  );
}

export default App;
