import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { message } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordClicked, setNewPasswordClicked] = useState(false); // State to track password input click
  const [confirmPasswordClicked, setConfirmPasswordClicked] = useState(false); // State to track password input click

  const [visible, setVisible] = useState(false);

  const handleFocus = (field) => {
    if (field === "newPassword") {
      setNewPasswordClicked(true);
    } else if (field === "confirmPassword") {
      setConfirmPasswordClicked(true);
    }
  };

  const handleBlur = (field) => {
    if (field === "newPassword") {
      setNewPasswordClicked(false);
    } else if (field === "confirmPassword") {
      setConfirmPasswordClicked(false);
    }
  };

  const validatePassword = (password) => {
    // Regex to match at least one uppercase, one lowercase, one digit, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    if (!validatePassword(newPassword)) {
      message.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return;
    }
    try {
      const response = await axios.post(
        `${server}/user/reset-password/${token}`,
        { newPassword }
      );
      message.success(response.data.message);
      setNewPassword(""); // Clear password fields after successful submission
      setConfirmPassword("");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 lg:flex-row login-div">
      {/* Right side with the form */}
      <div className="lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Reset Password
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* New Password input */}
              <div className="relative">
                <div className="relative mt-1">
                  <input
                    type={visible ? "text" : "password"}
                    name="newPassword"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => handleFocus("newPassword")}
                    onBlur={() => handleBlur("newPassword")}
                    className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm relative"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute z-20 transform cursor-pointer right-2 top-2/4 -translate-y-2/4"
                      size={17}
                      style={{
                        color: newPasswordClicked ? "#006665" : "black",
                      }}
                      onClick={() => setVisible(false)}
                    ></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute z-20 transform cursor-pointer right-2 top-2/4 -translate-y-2/4"
                      size={17}
                      style={{
                        color: newPasswordClicked ? "#006665" : "black",
                      }}
                      onClick={() => setVisible(true)}
                    ></AiOutlineEyeInvisible>
                  )}
                </div>
                <label
                  htmlFor="newPassword"
                  className={`absolute left-5 ${
                    newPasswordClicked || newPassword
                      ? " transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500"
                  }`}
                >
                  New Password
                </label>
              </div>

              {/* Confirm Password input */}
              <div className="relative">
                <div className="relative mt-1">
                  <input
                    type={visible ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                    className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm relative"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute z-20 transform cursor-pointer right-2 top-2/4 -translate-y-2/4"
                      size={17}
                      style={{
                        color: newPasswordClicked ? "#006665" : "black",
                      }}
                      onClick={() => setVisible(false)}
                    ></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute z-20 transform cursor-pointer right-2 top-2/4 -translate-y-2/4"
                      size={17}
                      style={{
                        color: newPasswordClicked ? "#006665" : "black",
                      }}
                      onClick={() => setVisible(true)}
                    ></AiOutlineEyeInvisible>
                  )}
                </div>
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-5 ${
                    confirmPasswordClicked || confirmPassword
                      ? " transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500"
                  }`}
                >
                  Confirm Password
                </label>
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-fe8373 hover:bg-006665"
                >
                  Reset Password
                </button>
              </div>

              {/* Login link */}
              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="text-[13px] text-006665 hover:text-fe8373"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
