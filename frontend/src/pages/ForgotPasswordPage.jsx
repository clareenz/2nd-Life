import React, { useEffect } from "react";
import ForgotPassword from "../components/Password/ForgotPassword.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const{ isAuthenticated } = useSelector((state) => state.user);
  
    useEffect(() => {
      if(isAuthenticated === true){
        navigate("/");
      }
    }, [])
  
  
    return (
      <div className="w-full h-screen bg-gray-50">
        <ForgotPassword />
      </div>
    );
  }
  
  export default ForgotPasswordPage;