import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebook, FaGoogle } from "react-icons/fa"; // Import the appropriate icons
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("false");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="bg-black text-white w-full py-2 fixed top-0">
        <h1 className="text-2xl font-bold">Your Website Name</h1>
      </header>

      {/* Left side with the image */}
      <div className="lg:w-1/8 lg:pr-8">
        <img src="/2ndLife_Logo.png" alt="2ndLife Logo" className="mx-auto" />
        {/* Optionally, you can add content or styling here for the image side */}
      </div>

      {/* Right side with the login form */}
      <div className="lg:w-1/2 lg:pl-10 flex flex-col items-center">
        {" "}
        {/* Modified line */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-950">
            Log in to 2ndLife
          </h2>
        </div>
        <div className="div mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="div bg-white py-8 px-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 foucs:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 foucs:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className={`${styles.normalFlex} justify-between`}>
                <div className={`${styles.normalFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 vorder-gray-300 rounded"
                  />
                  <label
                    htmlFor="remeber-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href=".forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>

              <div className="flex items-center">
                <div className="border-t border-gray flex-grow"></div>
                <div className="px-4 text-gray-700">or</div>
                <div className="border-t border-gray flex-grow"></div>
              </div>

              <div className="mt-4 flex space-x-4">
                <button
                  type="button"
                  className="group relative flex-1 h-[40px] flex items-center justify-center py-2 px-4 border border-gray-350 text-sm font-medium rounded-md text-black hover:bg-gray-100"
                >
                  <FaFacebook className="mr-2" />
                  Facebook
                </button>

                <button
                  type="button"
                  className="group relative flex-1 h-[40px] flex items-center justify-center py-2 px-4 border border-gray-350 text-sm font-medium rounded-md text-black hover:bg-gray-100"
                >
                  <FaGoogle className="mr-2" />
                  Google
                </button>
              </div>

              <div className={`${styles.normalFlex} w-full`}>
                <h4>Not have any account?</h4>
                <Link to="/sign-up" className="text-blue-600 pl-2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
