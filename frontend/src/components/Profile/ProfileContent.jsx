/* Edit the phone number part, limit it in the correct or acceptable
length of phone number in the philippines.
And if possible, edit the fields as well coz they look ugly. Tenkyu Nikkaa
 * need to fix logic sa orders kasi we don't have tracking stuff
 * start time: 1:55:11 (2nd vid)
 */

import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import { useMediaQuery } from '@material-ui/core';

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);

  useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    // Reset form fields to their initial state
    setName("");
    setEmail("");
    setPhoneNumber("");
    setZipCode("");
    setAddress1("");
    setAddress2("");
  };

  return (
    <div className="w-full">
      <div className="flex justify-end p-4">
        <p className="text-flex text-gray-600 mr-[50px]">
          Welcome! <span style={{ color: "#DB4444" }}>{user && user.name}</span>
        </p>
      </div>

      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-flex">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>

          <br />
          <br />
          <div className="w-full px-12">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-1">
                <div className="w-[100%] 800px:w-[500px]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                    //required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[500px]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:0 shadow-sm`}
                    //required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-1">
                <div className="w-[100%] 800px:w-[500px]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-2 800px:0 shadow-sm`}
                    // required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[500px]">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                    // required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[500px]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                    //required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[500px]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                    // required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <button //cancel button
                  style={{
                    width: "150px",
                    height: "50px",
                    margin: "3px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "25px",
                    cursor: "pointer",
                    color: "#006665",
                    backgroundColor: "transparent", // Set initial background color to transparent
                    //  border: "2px solid #fe8373", // Set the border color
                    transition: "background-color 0.3s ease, color 0.3s ease", // Add a smooth transition effect for background color and text color
                  }}
                  onClick={handleCancel}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#006665"; // Change background color on hover
                    e.currentTarget.style.color = "#ffffff"; // Change text color on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"; // Reset background color on mouse out
                    e.currentTarget.style.color = "#006665"; // Reset text color on mouse out
                  }}
                >
                  Cancel
                </button>

                {/* Save Changes Button */}
                <input
                  className={`${styles.button2} w-[190px] text-white text-center text-[#006665]  cursor-pointer`}
                  required
                  value="Save Changes"
                  type="submit"
                  onClick={handleSubmit}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF8474"; // Change background color on hover
                    e.currentTarget.style.color = "#ffffff"; // Change text color on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"; // Reset background color on mouse out
                    e.currentTarget.style.color = "#006665";
                  }}
                />
              </div>
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* password */}
      {active === 3 && (
        <div>
          <Password />
        </div>
      )}

      {/* inbox */}
      {active === 4 && (
        <div>
          <inbox />
        </div>
      )}

      {/* track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* payment */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* user address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "₱" + item.totalPrice,
        status: item.orderStatus,
      });
    });

    const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div className="pl-8 pt-12">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form is valid
    const isPasswordFieldsEmpty =
      !currentPassword && !newPassword && !confirmNewPassword;

    // Check if the current password matches the default
    const isCurrentPasswordCorrect = currentPassword === DEFAULT_PASSWORD; // Replace DEFAULT_PASSWORD with your actual default password

    // Check if the new password and confirm new password match
    const doPasswordsMatch = newPassword === confirmNewPassword;

    // Update the form validity based on the checks
    setIsFormValid(
      !isPasswordFieldsEmpty && isCurrentPasswordCorrect && doPasswordsMatch
    );

    // Show warning messages if needed
    if (!isCurrentPasswordCorrect) {
      // Display a warning for incorrect current password
      setCurrentPasswordWarning("Current password is incorrect.");
    } else {
      setCurrentPasswordWarning(""); // Clear the warning if current password is correct
    }

    if (!doPasswordsMatch) {
      // Display a warning for mismatched new and confirm passwords
      setPasswordMatchWarning(
        "New password and confirm password do not match."
      );
    } else {
      setPasswordMatchWarning(""); // Clear the warning if passwords match
    }
  };

  const handleCancel = () => {
    // Reset form fields to their initial state
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const togglePasswordVisibility = (passwordType) => {
    switch (passwordType) {
      case "currentPassword":
        setCurrentPasswordVisible(!currentPasswordVisible);
        break;
      case "newPassword":
        setNewPasswordVisible(!newPasswordVisible);
        break;
      case "confirmNewPassword":
        setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
        break;
      default:
        break;
    }
  };

  const [isFormValid, setIsFormValid] = useState(true);
  const [currentPasswordWarning, setCurrentPasswordWarning] = useState("");
  const [passwordMatchWarning, setPasswordMatchWarning] = useState("");
  const DEFAULT_PASSWORD = "your_actual_default_password";

  return (
    <div className="w-full">
      <>
        <br />
        <div className="w-full px-12">
          <form onSubmit={handleSubmit} aria-required={true}>
            {/* Current Password */}
            <div className="w-full 800px:w-[500px] relative">
              <label className="block pb-2">Current Password</label>
              <div className="relative">
                <input
                  type={currentPasswordVisible ? "text" : "password"}
                  className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required={newPassword !== "" || confirmNewPassword !== ""}
                />
                <button
                  type="button"
                  className="absolute top-4 right-8 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                >
                  {currentPasswordVisible ? (
                    <AiOutlineEyeInvisible size={17} />
                  ) : (
                    <AiOutlineEye size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="w-full 800px:w-[500px] relative">
              <label className="block pb-2">New Password</label>
              <div className="relative">
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required={currentPassword !== ""}
                />
                <button
                  type="button"
                  className="absolute top-4 right-8 transform -translate-y-1/2"
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

            {/* Confirm New Password */}
            <div className="w-full 800px:w-[500px] relative">
              <label className="block pb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={confirmNewPasswordVisible ? "text" : "password"}
                  className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required={currentPassword !== "" && newPassword !== ""}
                />
                <button
                  type="button"
                  className="absolute top-4 right-8 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("confirmNewPassword")}
                >
                  {confirmNewPasswordVisible ? (
                    <AiOutlineEyeInvisible size={17} />
                  ) : (
                    <AiOutlineEye size={17} />
                  )}
                </button>
              </div>
            </div>

            {!isFormValid && (
              <div className="text-gray-300 mb-4">
                Note: Password fields are required when changing the password.
              </div>
            )}

            {/* Warning for mismatched new and confirm passwords */}
            {passwordMatchWarning && (
              <div className="text-red-500 mb-4">{passwordMatchWarning}</div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <button //cancel button
                style={{
                  width: "150px",
                  height: "50px",
                  margin: "3px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "25px",
                  cursor: "pointer",
                  color: "#006665",
                  backgroundColor: "transparent", // Set initial background color to transparent
                  //  border: "2px solid #fe8373", // Set the border color
                  transition: "background-color 0.3s ease, color 0.3s ease", // Add a smooth transition effect for background color and text color
                }}
                onClick={handleCancel}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#006665"; // Change background color on hover
                  e.currentTarget.style.color = "#ffffff"; // Change text color on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"; // Reset background color on mouse out
                  e.currentTarget.style.color = "#006665"; // Reset text color on mouse out
                }}
              >
                Cancel
              </button>

              {/* Save Changes Button */}
              <input
                className={`${styles.button2} w-[190px] text-white text-center text-[#006665]  cursor-pointer`}
                required
                value="Save Changes"
                type="submit"
                onClick={handleSubmit}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF8474"; // Change background color on hover
                  e.currentTarget.style.color = "#ffffff"; // Change text color on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"; // Reset background color on mouse out
                  e.currentTarget.style.color = "#006665";
                }}
              />
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "₱" + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5 pt-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[20px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div
          className={`${styles.button1} !rounded-md !text-sm w-auto h-auto mx-7`}
        >
          <span className="text-[#fff] m-2">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[50px] rounded-[10px] flex items-center px-3 shadow justify-between">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600]">Mara Cassandra Joy</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** *** ****</h6>
          <h5 className="pl-6">01/2023</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete
            size={20}
            className="cursor-pointer text-gray-700 hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5 pt-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[20px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button1} !rounded-md !text-sm w-auto h-auto mx-7`}
        >
          <span className="text-[#fff] m-2">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[50px] rounded-[10px] flex items-center px-3 shadow justify-between">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600] text-gray-400">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6> San Agustin 1, Dasmarinas City, Cavite, Philippines</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(+63) 912 345 6789</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete
            size={20}
            className="cursor-pointer text-gray-700 hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
