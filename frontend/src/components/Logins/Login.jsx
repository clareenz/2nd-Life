import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebook, FaGoogle } from "react-icons/fa"; // Import the appropriate icons
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 lg:flex-row sm:px-6 lg:px-8 login-div">
      {/* Left side with the image */}
      <div className="lg:w-1/8 lg:pr-8">
        <img
          src="/2ndLife_Logo.png"
          alt="2ndLife Logo"
          className="mx-auto w-full h-auto lg:w-auto lg:h-auto"
        />
      </div>

      {/* Right side with the login form */}
      <div className="lg:w-1/2">
        {/* Modified line */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Log in to 2ndLife
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow  sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    className="block w-full px-3 py-2 placeholder-gray-400 border-b border-gray-300 shadow-sm appearance-none square-md foucs:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
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
              <div className={`${styles.normalFlex} justify-between`}>
                <div className={`${styles.normalFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 vorder-gray-300"
                  />
                  <label
                    htmlFor="remember-me"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="font-medium text-006665 hover:text-fe8373"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-fe8373 hover:bg-006665"
                >
                  Log in
                </button>
              </div>

              <div className="flex items-center">
                <div className="flex-grow border-t border-gray"></div>
                <div className="px-4 text-gray-700">or</div>
                <div className="flex-grow border-t border-gray"></div>
              </div>

              <div className="flex mt-4 space-x-4">
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
                <Link
                  to="/sign-up"
                  className="pl-2 text-006665 hover:text-fe8373"
                >
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
