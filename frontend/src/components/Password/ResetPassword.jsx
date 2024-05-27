import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { message } from "antd";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password) => {
    // Regex to match at least one uppercase, one lowercase, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    if (!validatePassword(newPassword)) {
      message.error("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
      return;
    }
    try {
      const response = await axios.post(`${server}/user/reset-password/${token}`, { newPassword });
      message.success(response.data.message);
      setNewPassword(""); // Clear password fields after successful submission
      setConfirmPassword("");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center py-12 sm:px-6 lg:px-8">
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
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 square-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                    {showNewPassword ? (
                      <FaEyeSlash className="h-5 w-5 cursor-pointer" onClick={handleToggleNewPassword} />
                    ) : (
                      <FaEye className="h-5 w-5 cursor-pointer" onClick={handleToggleNewPassword} />
                    )}
                  </div>
                </div>
              </div>

              {/* Confirm Password input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 square-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                    {showConfirmPassword ? (
                      <FaEyeSlash className="h-5 w-5 cursor-pointer" onClick={handleToggleConfirmPassword} />
                    ) : (
                      <FaEye className="h-5 w-5 cursor-pointer" onClick={handleToggleConfirmPassword} />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-fe8373 hover:bg-006665"
                >
                  Reset Password
                </button>
              </div>

              {/* Login link */}
              <div className="text-center mt-4">
                <Link to="/login" className="font-medium text-006665 hover:text-fe8373">
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
