//Login Page

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginAdmin from "../components/Logins/LoginAdmin";

const LoginPage= () => {

  const navigate = useNavigate();
  const{ isAdmin,loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isAdmin === true) {
      navigate(`/admin/dashboard`);
    }
    console.log(isAdmin);
  }, [loading,isAdmin]);
  
  

  return (
    <div className="w-full h-screen bg-gray-50">
      <LoginAdmin />
    </div>
  );
}

export default LoginPage;
