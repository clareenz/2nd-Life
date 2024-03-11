import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to forgot password endpoint
    try {
      const response = await axios.post(`${server}/forgot-password`, { email });
      toast.success(response.data.message);
      setEmail(""); // Clear email field after successful submission
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Right side with the form */}
      <div className="lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Forgot Password
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email input */}
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
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 square-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  />
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

export default ForgotPassword;