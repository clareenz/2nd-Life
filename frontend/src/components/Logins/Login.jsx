import { React, useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebook, FaGoogle } from "react-icons/fa"; // Import the appropriate icons
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false); // State to track email input click
  const [passwordClicked, setPasswordClicked] = useState(false); // State to track password input click
  const [isAutofilled, setIsAutofilled] = useState(false);

  // Function to check if the input fields are autofilled
  const checkAutofill = () => {
    if (document.activeElement) {
      const activeElement = document.activeElement;
      setIsAutofilled(activeElement.value !== "");
    }
  };

  const handleFocus = (field) => {
    if (field === "email") {
      setEmailClicked(true);
    } else if (field === "password") {
      setPasswordClicked(true);
    }
  };

  const handleBlur = (field) => {
    if (field === "email") {
      setEmailClicked(false);
    } else if (field === "password") {
      setPasswordClicked(false);
    }
  };

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
        message.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkAutofill();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [email, password]); // Listen for changes in email and password fields

  // Facebook Login Logic
  useEffect(() => {
    // Load and initialize the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.FB_APP_ID, // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v20.0", // Use the correct Graph API version
      });

      // Check login status
      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Handle the response from FB.getLoginStatus
  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
      // Logged into your app and Facebook.
      console.log("Welcome! Fetching your information....");
      window.FB.api("/me", 'GET', { fields: "id,name,email" }, function (response) {
        document.getElementById("profile").innerHTML =
          "Good to see you, " +
          response.name +
          ". I see your email address is " +
          response.email;
      });
    } else if (response.status === "not_authorized") {
      // The person is logged into Facebook, but not your app.
      console.log("Please log into this app.");
    } else {
      // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
      console.log("Please log into Facebook.");
    }
  };

  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        statusChangeCallback(response);
      },
      { scope: "email" }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 lg:flex-row login-div">
      {/* Left side with the image */}
      <div className="lg:w-flex md:w-1/3 sm:w-1/3 w-1/4">
        <img src="/2ndLife_Logo.png" alt="2ndLife Logo" />
      </div>

      {/* Right side with the login form */}
      <div className="lg:w-1/2 ">
        {/* Modified line */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Log in to 2ndLife
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-flex sm:max-w-sm">
          <div className="px-4 py-8 bg-white shadow  sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  Email address
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
                    className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm relative"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className={`absolute cursor-pointer right-2 top-2/4 transform -translate-y-2/4 z-20`}
                      size={17}
                      style={{ color: passwordClicked ? "#006665" : "black" }}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className={`absolute cursor-pointer right-2 top-2/4 transform -translate-y-2/4 z-20`}
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

              <div className={`${styles.normalFlex} justify-between`}>
                <div className={`${styles.normalFlex} focus:ring-[#006665]`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="w-4 h-4 text-[#006665] rounded focus:ring-[#006665] border-gray-300"
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
                    className="font-sm text-006665 hover:text-fe8373"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-fe8373 hover:bg-006665"
                >
                  Log in
                </button>
              </div>

              <div className="flex items-center">
                <div className="flex-grow border-t border-gray"></div>
                <div className="px-4 text-gray-700">or</div>
                <div className="flex-grow border-t border-gray"></div>
              </div>

              <div
                className="fb-login-button"
                data-width="flex mt-4 space-x-4"
                data-size=""
                data-button-type=""
                data-layout=""
                data-auto-logout-link="true"
                data-use-continue-as="false"
              >
                <button
                  type="button"
                  onClick={handleFBLogin}
                  className="group relative flex-1 h-[40px] flex items-center justify-center py-2 px-4 border border-gray-350 text-sm font-medium rounded-3xl text-black hover:bg-gray-100"
                >
                  <FaFacebook className="mr-2" />
                  Facebook
                </button>

                <button
                  type="button"
                  className="group relative flex-1 h-[40px] flex items-center justify-center py-2 px-4 border border-gray-350 text-sm font-medium rounded-3xl text-black hover:bg-gray-100"
                >
                  <FaGoogle className="mr-2" />
                  Google
                </button>
              </div>

              <div className={`${styles.normalFlex} w-full`}>
                <h4>Don't have an account?</h4>
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
