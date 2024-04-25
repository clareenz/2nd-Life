import axios from "axios";
import React, { useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { message } from "antd";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const ShopPassword = () => {
  const { seller } = useSelector((state) => state.seller);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "oldPassword":
        setOldPasswordVisible(!oldPasswordVisible);
        break;
      case "newPassword":
        setNewPasswordVisible(!newPasswordVisible);
        break;
      case "confirmPassword":
        setConfirmNewPasswordVisible(!confirmPasswordVisible);
        break;
      default:
        break;
    }
  };

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~`^()\-_={}[\]:;'"<>,.\\/|])[A-Za-z\d@$!%*?&~`^()\-_={}[\]:;'"<>,.\\/|]{6,}$/;
    return regex.test(newPassword);
  };

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      message.error("Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    await axios
      .put(
        `${server}/shop/update-shop-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        message.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleCancel = () => {
    // Reset form fields to their initial state
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5 shadow-sm bg-white p-6 rounded-2xl">
        <div className="w-full px-10 pt-6">
          <h1 className="block text-[25px] font-[600] text-[#000000ba] pb-2">
            Change Password
          </h1>
          <div className="w-full pt-9">
            <form
              aria-required
              onSubmit={passwordChangeHandler}
              className="flex flex-col"
            >
              {/* Current Password Input */}
              <div className="w-full 800px:w-[500px] relative">
                <label className="block pb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={oldPasswordVisible ? "text" : "password"}
                    className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm px-4`}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required={newPassword !== "" || confirmPassword !== ""}
                  />
                  <button
                    type="button"
                    className="absolute transform -translate-y-1/2 top-4 right-8 px-3"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                  >
                    {oldPasswordVisible ? (
                      <AiOutlineEyeInvisible size={17} />
                    ) : (
                      <AiOutlineEye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password Input */}
              <div className="w-full 800px:w-[500px] relative">
                <label className="block pb-2">New Password</label>
                <div className="relative">
                  <input
                    type={newPasswordVisible ? "text" : "password"}
                    className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm px-4`}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required={oldPassword !== ""}
                  />
                  <button
                    type="button"
                    className="absolute transform -translate-y-1/2 top-4 right-8 px-3"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {newPasswordVisible ? (
                      <AiOutlineEyeInvisible size={17} />
                    ) : (
                      <AiOutlineEye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Input */}
              <div className="w-full 800px:w-[500px] relative">
                <label className="block pb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm px-4`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={oldPassword !== "" && newPassword !== ""}
                  />
                  <button
                    type="button"
                    className="absolute transform -translate-y-1/2 top-4 right-8 px-3"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {confirmPasswordVisible ? (
                      <AiOutlineEyeInvisible size={17} />
                    ) : (
                      <AiOutlineEye size={17} />
                    )}
                  </button>
                </div>
              </div>
              {/* Buttons for Cancel and Save Changes */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                {/* Cancel Button */}
                <div
                  className={`${styles.button6} border-[#077773]`}
                  style={{
                    margin: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "25px",
                    cursor: "pointer",
                    color: "#006665",
                    backgroundColor: "transparent",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onClick={handleCancel}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#006665";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#006665";
                  }}
                >
                  Cancel
                </div>

                {/* Save Changes Button */}
                <input
                  className={`${styles.button6} w-[150px] text-white text-center bg-[#FF8474] cursor-pointer`}
                  required
                  value="Save Changes"
                  type="submit"
                  onClick={passwordChangeHandler}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFA99E";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF8474";
                    e.currentTarget.style.color = "white";
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPassword;
