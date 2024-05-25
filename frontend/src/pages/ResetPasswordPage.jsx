import React, { useEffect } from "react";
import ResetPassword from "../components/Password/ResetPassword";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { server } from "../server";


const ResetPasswordPage = () => {

    const navigate = useNavigate();
    const{ isAuthenticated } = useSelector((state) => state.user);
  
    useEffect(() => {
      if(isAuthenticated === true){
        navigate(`${server}/user/reset-password/:token`);
      }
    }, [])

  
    return (
      <div className="w-full h-screen bg-gray-50">
        <ResetPassword />
      </div>
    );
  }
  
  export default ResetPasswordPage;