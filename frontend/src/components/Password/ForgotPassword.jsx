import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { message } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isAutofilled, setIsAutofilled] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);

  const checkAutofill = () => {
    if (document.activeElement) {
      const activeElement = document.activeElement;
      setIsAutofilled(activeElement.value !== "");
    }
  };

  const handleFocus = (field) => {
    if (field === "email") {
      setEmailClicked(true);
    }
  };

  const handleBlur = (field) => {
    if (field === "email") {
      setEmailClicked(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send POST request to forgot password endpoint
    try {
      const response = await axios.post(`${server}/user/forgot-password`, {
        email,
      });
      message.success(response.data.message);
      setEmail(""); // Clear email field after successful submission
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Right side with the form */}
      <div className="lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Forgot Password
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-flex sm:max-w-sm">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="relative">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm relative"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-5 ${
                      isAutofilled || emailClicked || email
                        ? "transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                        : "bottom-2.5 text-sm transition text-gray-500 text-center"
                    }`}
                    >
                    Email Address
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

export default ForgotPassword;
