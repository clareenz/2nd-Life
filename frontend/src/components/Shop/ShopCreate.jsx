import { React, useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [emailClicked, setEmailClicked] = useState(false); // State to track email input click
  const [passwordClicked, setPasswordClicked] = useState(false); // State to track password input click
  const [nameclicked, setNameClicked] = useState(false);
  const [phoneNumberClicked, setPhoneNumberClicked] = useState(false);
  const [addressClicked, setAddressClicked] = useState(false);
  const [zipCodeClicked, setZipCodeClicked] = useState(false);
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
    } else if (field === "phoneNumber") {
      setPhoneNumberClicked(true);
    } else if (field === "address") {
      setAddressClicked(true);
    } else if (field === "zipCode") {
      setZipCodeClicked(true);
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
    } else if (field === "phoneNumner") {
      setPhoneNumberClicked(false);
    } else if (field === "address") {
      setAddressClicked(false);
    } else if (field === "zipCode") {
      setZipCodeClicked(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~`^()\-_={}[\]:;'"<>,.\\/|])[A-Za-z\d@$!%*?&~`^()\-_={}[\]:;'"<>,.\\/|]{6,}$/;
    return regex.test(password);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkAutofill();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [email, password, name, confirmPassword]); // Listen for changes in email and password fields

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 lg:flex-row login-div">
      {/* Left side with the image */}
      <div className="lg:w-flex md:w-1/3 sm:w-1/3 w-1/4">
        <img src="/2ndLife_Logo.png" alt="2ndLife Logo" />
      </div>

      {/* Right side with the form */}
      <div className="lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create an account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-flex sm:max-w-sm">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Shop Name */}
              <div className="relative flex flex-row">
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
                  Shop Name
                </label>
              </div>

              {/* Phone Number */}
              <div className="relative">
                <input
                  type="number"
                  name="phoneNumber"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={() => handleFocus("phoneNumber")}
                  onBlur={() => handleBlur("phoneNumber")}
                  className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm relative"
                />
                <label
                  htmlFor="phoneNumber"
                  className={`absolute left-5 ${
                    isAutofilled || phoneNumberClicked || phoneNumber
                      ? "transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500 text-center"
                  }`}
                >
                  Phone Number
                </label>
              </div>

              {/* Email Address */}
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

              {/* Address */}
              <div className="relative">
                <input
                  type="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onFocus={() => handleFocus("address")}
                  onBlur={() => handleBlur("address")}
                  className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm relative"
                />
                <label
                  htmlFor="address"
                  className={`absolute left-5 ${
                    isAutofilled || addressClicked || address
                      ? "transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500 text-center"
                  }`}
                >
                  Address
                </label>
              </div>

              {/* Zip Code*/}
              <div className="relative">
                <input
                  type="number"
                  name="zipCode"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  onFocus={() => handleFocus("zipCode")}
                  onBlur={() => handleBlur("zipCode")}
                  className="block w-full px-6 py-2 placeholder-gray-400 border bg-white border-gray-300 shadow-sm appearance-none rounded-3xl focus:outline-none focus:ring-[#006665] focus:border-[#006665] sm:text-sm relative"
                />
                <label
                  htmlFor="zipCode"
                  className={`absolute left-5 ${
                    isAutofilled || zipCodeClicked || zipCode
                      ? "transition transform -translate-y-[18px] bg-white h-3 top-2 text-xs px-1 text-[#006665] z-10"
                      : "bottom-2.5 text-sm transition text-gray-500 text-center"
                  }`}
                >
                  Zip Code
                </label>
              </div>

              <div className="relative">
                <div className="mt-1 relative">
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
                      className="absolute cursor-pointer right-2 top-2/4 transform -translate-y-2/4 z-20"
                      size={17}
                      style={{ color: passwordClicked ? "#006665" : "black" }}
                      onClick={() => setVisible(false)}
                    ></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute cursor-pointer right-2 top-2/4 transform -translate-y-2/4 z-20"
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
                <div className="mt-1 relative">
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
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg bg-white hover:bg-gray-100"
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
                  to="/shop-login"
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

export default ShopCreate;
