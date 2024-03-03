/*
 *  start time: 3:40:47 (2nd vid)
 */

import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("zipCode", zipCode);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);
    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 lg:flex-row sm:px-6 lg:px-8 login-div">
      {/* Left side with the image */}
      <div className="lg:w-1/8 lg:pr8">
        <img src="/2ndLife_Logo.png" alt="2ndLife Logo" className="mx-auto" />
      </div>

      {/* Right side with the login form */}
      <div className="lg:w-1/2">
        {/* Modified line */}
        <div className="sm:mx-auto sm:w-full sm:max-w-[35rem]">
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Register as a Seller
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[30rem]">
          <div className="px-4 py-8 bg-white shadow  sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Shop Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-400 border-b border-gray-300 shadow-sm appearance-none square-md foucs:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phone-number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-400 border-b border-gray-300 shadow-sm appearance-none square-md foucs:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-400 border-b border-gray-300 shadow-sm appearance-none square-md foucs:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="address"
                    name="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-400 border-b border-gray-300 shadow-sm appearance-none square-md foucs:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Zip Code*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="zip-code"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-400 border-b border-gray-300 shadow-sm appearance-none square-md foucs:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-400 border-b border-gray-300 shadow-sm appearance-none square-md foucs:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute cursor-pointer right-2 top-2"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute cursor-pointer right-2 top-2"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              {/* Avatar */}
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg bg-white hover:bg-gray-50"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-fe8373 hover:bg-006665"
                >
                  Submit
                </button>
              </div>

              <div className={`${styles.normalFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to="/shop-login" className="text-blue-600 pl-2">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
