//Login Page

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginAdmin from "../components/Logins/LoginAdmin";

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
      <LoginAdmin />
    </div>
  );
}

export default LoginPage;
