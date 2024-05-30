import { React, useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [emailClicked, setEmailClicked] = useState(false); // State to track email input click
  const [passwordClicked, setPasswordClicked] = useState(false); // State to track password input click
  const [nameclicked, setNameClicked] = useState(false);
  const [confirmPasswordClicked, setConfirmPasswordClicked] = useState(false);
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
    } else if (field === "name") {
      setNameClicked(true);
    } else if (field === "confirmPassword") {
      setConfirmPasswordClicked(true);
    }
  };

  const handleBlur = (field) => {
    if (field === "email") {
      setEmailClicked(false);
    } else if (field === "password") {
      setPasswordClicked(false);
    } else if (field === "name") {
      setNameClicked(false);
    } else if (field === "confirmPassword") {
      setConfirmPasswordClicked(false);
    }
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    console.log(e.target.files[0])
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

   
  };

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~`^()\-_={}[\]:;'"<>,.\\/|])[A-Za-z\d@$!%*?&~`^()\-_={}[\]:;'"<>,.\\/|]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    // Validate password strength
    if (!validatePassword()) {
      toast.error(
        "Password must be at least 6 characters and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
      );
      return;
    }

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    console.log(avatar);
    axios
      .post(`${server}/user/create-user`, { name, email, password, avatar })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAvatar("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkAutofill();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [email, password, name, confirmPassword]); // Listen for changes in email and password fields

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 lg:flex-row login-div">
      {/* Left side with the image */}
      <div className="w-1/4 lg:w-flex md:w-1/3 sm:w-1/3">
        <img src="/2ndLife_Logo.png" alt="2ndLife Logo" />
      </div>

      {/* Right side with the form */}
      <div className="lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Create an account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-flex sm:max-w-sm">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm relative"
                />
                <label
                  htmlFor="name"
                  className={`absolute left-5 ${
                    isAutofilled || nameclicked || name
                      ? "transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500 text-center"
                  }`}
                >
                  Full Name
                </label>
              </div>

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
                      className="absolute z-20 transform cursor-pointer right-2 top-2/4 -translate-y-2/4"
                      size={17}
                      style={{ color: passwordClicked ? "#006665" : "black" }}
                      onClick={() => setVisible(false)}
                    ></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute z-20 transform cursor-pointer right-2 top-2/4 -translate-y-2/4"
                      size={17}
                      style={{ color: passwordClicked ? "#006665" : "black" }}
                      onClick={() => setVisible(true)}
                    ></AiOutlineEyeInvisible>
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

              {/* Confirm Password input */}
              <div className="relative">
                <div className="relative mt-1">
                  <input
                    type={visible ? "text" : "confirmPassword"}
                    name="confirmPassword"
                    autoComplete="new-password"
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
                      style={{ color: passwordClicked ? "#006665" : "black" }}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute z-20 transform cursor-pointer right-2 top-2/4 -translate-y-2/4"
                      size={17}
                      style={{ color: passwordClicked ? "#006665" : "black" }}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-5 ${
                    isAutofilled || confirmPasswordClicked || confirmPassword
                      ? " transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500"
                  }`}
                >
                  Confirm Password
                </label>
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="flex items-center mt-2">
                  <span className="inline-block h-8 overflow-hidden rounded-full">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <RxAvatar className="w-8 h-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="flex items-center justify-center px-4 py-2 ml-5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm bg hover:bg-gray-100"
                  >
                    <span>Upload a photo</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileInputChange}
                      className="sr-only"
                      size={10000000} // Limit the file size to 10 MB
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-fe8373 hover:bg-006665"
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.normalFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link
                  to="/login"
                  className="text-006665 pl-2 hover:text-[#FF8474]"
                >
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

export default Signup;
