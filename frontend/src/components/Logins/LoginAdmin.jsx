import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import { message } from "antd";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [visible, setVisible] = useState(false);
  const [usernameClicked, setUsernameClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);

  const checkAutofill = () => {
    if (document.activeElement) {
      const activeElement = document.activeElement;
      setIsAutofilled(activeElement.value !== "");
    }
  };

  const handleFocus = (field) => {
    if (field === "username") {
      setUsernameClicked(true);
    } else if (field === "password") {
      setPasswordClicked(true);
    }
  };

  const handleBlur = (field) => {
    if (field === "username") {
      setUsernameClicked(false);
    } else if (field === "password") {
      setPasswordClicked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/admin/login-admin`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        message.success("Login Success!");
        navigate("/admin/dashboard");
        window.location.reload(true);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-r from-[#FFEAE8] to-[#E8F3F4] lg:flex-row login-div">
      <div className="p-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src="/NAMSTechLogo.png" alt="NAMS Tech Logo" />
          <h2 className="mt-6 text-4xl font-bold text-center text-slate-700">
            Welcome <span className="text-[#FF8474]">A</span><span className="text-[#006665]">dmin</span>!
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="p-8 bg-white shadow-lg rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="username"
                  name="Username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => handleFocus("username")}
                  onBlur={() => handleBlur("username")}
                  className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm transition-all duration-200"
                />
                <label
                  htmlFor="username"
                  className={`absolute left-5 ${
                    isAutofilled || usernameClicked || username
                      ? "transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500"
                  }`}
                >
                  Username
                </label>
              </div>

              <div className="relative">
                <div className="relative mt-1">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm transition-all duration-200"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute cursor-pointer right-2 top-2/4 transform -translate-y-2/4 z-20"
                      size={17}
                      style={{ color: passwordClicked ? "#006665" : "black" }}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute cursor-pointer right-2 top-2/4 transform -translate-y-2/4 z-20"
                      size={17}
                      style={{ color: passwordClicked ? "#006665" : "black" }}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
                <label
                  htmlFor="password"
                  className={`absolute left-5 ${
                    isAutofilled || passwordClicked || password
                      ? " transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500"
                  }`}
                >
                  Password
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-gradient-to-r from-[#077773] to-[#006665] hover:from-[#FF8474] hover:to-[#FFA99E] focus:outline-none transition-all duration-200"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
