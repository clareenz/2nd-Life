//Login Page

import React, { useEffect } from "react";
import Login from "../components/Logins/Login.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Header2 } from "../components/Layout/Header.jsx";
import { Footer2 } from "../components/Layout/Footer.jsx";

const LoginPage= () => {

  const navigate = useNavigate();
  const{ isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  

  return (
    <div className="w-full h-screen bg-gray-50">
      <Header2 />
      <Login />
      <Footer2 />
    </div>
  );
}

export default LoginPage;
