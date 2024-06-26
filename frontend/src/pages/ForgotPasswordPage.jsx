import React, { useEffect } from "react";
import ForgotPassword from "../components/Password/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { server } from "../server";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const{ isAuthenticated } = useSelector((state) => state.user);
  
    useEffect(() => {
      if(isAuthenticated === true){
        navigate(`${server}/user/forgot-password`);
      }
    }, [])
  
  
    return (
      <div className="w-full h-screen bg-gray-50">
        <ForgotPassword />
      </div>
    );
  }
  
  export default ForgotPasswordPage;