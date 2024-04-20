import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button, useMediaQuery } from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState(name)

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

const handleSubmit = (e) => {
  e.preventDefault();

  // Check if the password field is empty
  if (!password) {
    toast.error("Please input your password to update your information.");
    return;
  }

  dispatch(updateUserInformation(name, email, phoneNumber, password));
  setDisplayName(name);
  toast.success("Changed Successfully!");
};

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadUser());
        toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    // Reset form fields to their initial state
    setName("");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <div className="w-full">
      <div className="flex justify-end p-4 mr-3">
        <p className="text-gray-600 text-flex">
          Welcome! <span style={{ color: "#DB4444" }}>{displayName}</span>
        </p>
      </div>
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex w-auto justify-evenly">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-12">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="block w-full pb-3 800px:flex">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 shadow-sm`}
                   // required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0 shadow-sm`}
                    //required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="block w-full pb-3 800px:flex">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 shadow-sm`}
                    //required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`${styles.input} !w-[95%] mb-1 800px:mb-0 shadow-sm`}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute transform -translate-y-1/2 top-4 right-8"
                      onClick={() => togglePasswordVisibility("showPassword")}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={17} />
                      ) : (
                        <AiOutlineEye size={17} />
                      )}
                    </button>
                  </div>
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
                    e.currentTarget.style.backgroundColor = "transparent "; // Reset background color on mouse out
                    e.currentTarget.style.color = "#006665"; // Reset text color on mouse out
                  }}
                >
                  Cancel
                </button>

                {/* Save Changes Button */}
                <input
                  className={`${styles.button2} w-[150px] text-white text-center text-[#006665]  cursor-pointer`}
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

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
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

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div className="pt-12 pl-8">
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
    <div className="pt-1 pl-8">
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

const ChangePassword = () => {
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

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success(res.data.success);

      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCancel = () => {
    // Reset form fields to their initial state
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
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
                className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required={newPassword !== "" || confirmPassword !== ""}
              />
              <button
                type="button"
                className="absolute transform -translate-y-1/2 top-4 right-8"
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
                className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required={oldPassword !== ""}
              />
              <button
                type="button"
                className="absolute transform -translate-y-1/2 top-4 right-8"
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
                className={`${styles.input} !w-[95%] mb-4 800px:0 shadow-sm`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={oldPassword !== "" && newPassword !== ""}
              />
              <button
                type="button"
                className="absolute transform -translate-y-1/2 top-4 right-8"
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
            <button
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
            </button>

            {/* Save Changes Button */}
            <input
              className={`${styles.button2} w-[150px] text-white text-center text-[#006665]  cursor-pointer`}
              required
              value="Save Changes"
              type="submit"
              onClick={passwordChangeHandler}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#FF8474";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#006665";
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-flex h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="flex justify-end w-full p-3">
              <RxCross1
                size={17}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[20px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="block w-full p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] focus:border-[#006665]"
                    >
                      <option value="" className="block pb-2 border">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] focus:border-[#006665]"
                    >
                      <option value="" className="block pb-2 border">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-[95%] pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input} focus:border-[#006665]`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-[95%] pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input} focus:border-[#006665]`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-[95%] pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input} focus:border-[#006665]`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value || "")}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] focus:border-[#006665]"
                    >
                      <option value="" className="block pb-2 border">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-[60%] pb-2 mx-auto text-center round-md">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer text-[#006665] border border-[#006665] hover:border-[#FF8474] hover:text-[#FF8474]`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between w-full pt-3">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button2} !rounded-md text-[12px] p-1 w-[60px] h-auto mr-1`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>

      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-flex bg-white h-min 800px:h-[50px] rounded-[10px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="flex items-center pl-8">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="flex items-center pl-8">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={20}
                className="cursor-pointer hover:text-red-600"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[15px] text-gray-500">
          You do not have any saved addresses!
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;
