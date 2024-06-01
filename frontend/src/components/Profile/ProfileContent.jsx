import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
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
import {
  Space,
  Table,
  message,
  Input,
  Menu,
  Dropdown,
  Switch,
  Modal,
  Form,
  Select,
  Button,
} from "antd";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { deleteUser } from "../../redux/actions/user";
import UserInbox from "./UserInbox";
import Highlighter from "react-highlight-words";
import {
  EllipsisOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState(name);
  const dispatch = useDispatch();

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
    <div className="w-full pt-[70px]">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex w-auto justify-evenly">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
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
                  <Input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 shadow-sm px-4 custom-input`}
                    // required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <Input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0 shadow-sm px-4 custom-input`}
                    //required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="block w-full pb-3 800px:flex">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <Input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 shadow-sm px-4 custom-input`}
                    //required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className={`${styles.input} !w-[95%] mb-1 800px:mb-0 shadow-sm px-4 custom-input`}
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
                        <div className="px-2">
                          <AiOutlineEyeInvisible size={17} />
                        </div>
                      ) : (
                        <div className="px-2">
                          {" "}
                          <AiOutlineEye size={17} />
                        </div>
                      )}
                    </button>
                  </div>
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
                  className={`${styles.button6} border-[#077773] px-2`}
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
                  className={`${styles.button6} w-[150px] text-white text-center bg-[#FF8474] cursor-pointer px-2`}
                  required
                  value="Save Changes"
                  type="submit"
                  onClick={handleSubmit}
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
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {/* Inbox */}
      {active === 4 && (
        <div>
          <UserInbox />
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

      {/* delete user account */}
      {active === 10 && (
        <div>
          <DeleteUserAccount />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = React.useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    status: true,
    itemsQty: true,
    total: true,
    actions: true,
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: 150,
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: visibleColumns.id ? (text) => text : null,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: visibleColumns.status ? (text) => text : null,
    },
    {
      title: "Items Qty",
      dataIndex: "itemsQty",
      key: "itemsQty",
      width: 130,
      ...getColumnSearchProps("itemsQty"),
      sorter: (a, b) => a.itemsQty - b.itemsQty,
      render: visibleColumns.itemsQty ? (text) => text : null,
    },
    {
      title: "Total (₱)",
      dataIndex: "total",
      key: "total",
      width: 130,
      ...getColumnSearchProps("total"),
      sorter: (a, b) => a.total - b.total,
      render: visibleColumns.total ? (text) => text : null,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: visibleColumns.actions
        ? (text, record) => (
            <Link to={`/user/order/${record.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          )
        : null,
    },
  ];

  const data = orders.map((item) => ({
    key: item._id,
    id: item._id,
    itemsQty: item.cart.length,
    total: item.totalPrice,
    status: item.status,
  }));

  const handleColumnVisibilityChange = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const menu = (
    <Menu>
      {Object.keys(visibleColumns).map((key) => (
        <Menu.Item key={key}>
          <Switch
            checked={visibleColumns[key]}
            onChange={() => handleColumnVisibilityChange(key)}
            checkedChildren={key}
            unCheckedChildren={key}
          />
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="pl-4 pt-[20px]">
      <div className="w-full min-h-[45vh] bg-white rounded-2xl shadow-md">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-[25px] font-Poppins px-[50px] py-4">
              All Orders
            </h1>
          </div>
          <div className="flex p-4 px-[30px]">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <EllipsisOutlined style={{ fontSize: "24px" }} />
              </a>
            </Dropdown>
          </div>
        </div>
        <div style={{ overflowY: "auto" }}>
          <Table
            columns={columns.filter((column) => visibleColumns[column.key])}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            rowClassName={(record) =>
              record.status === "Delivered" ? "greenColor" : "redColor"
            }
          />
        </div>
      </div>
    </div>
  );
};

const TrackOrder = () => {
  const orders = [];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => (
        <span className={status === "Delivered" ? "greenColor" : "redColor"}>
          {status}
        </span>
      ),
    },
    {
      title: "Items Qty",
      dataIndex: "itemsQty",
      key: "itemsQty",
      width: 130,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 130,
    },
    {
      title: "Actions",
      key: "actions",
      width: 130,
      render: (_, record) => (
        <Link to={`/order/${record.id}`}>
          <Button>
            <MdOutlineTrackChanges size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const data = orders.map((item) => ({
    key: item._id,
    id: item._id,
    itemsQty: item.orderItems.length,
    total: `₱${item.totalPrice}`,
    status: item.orderStatus,
  }));

  return (
    <div className="pl-4 pt-[20px]">
      <div className="w-full min-h-[45vh] bg-white rounded-2xl shadow-md">
        <div style={{ overflowY: "auto" }}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            rowClassName={(record) =>
              record.status === "Delivered" ? "greenColor" : "redColor"
            }
          />
        </div>
      </div>
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

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~`^()\-_={}[\]:;'"<>,.\\/|])[A-Za-z\d@$!%*?&~`^()\-_={}[\]:;'"<>,.\\/|]{6,}$/;
    return regex.test(newPassword);
  };

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      message.error(
        "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

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
    <div className="flex flex-col items-center w-full px-2 min-h-screen pt-[20px]">
      <div className="flex w-full 800px:w-[90%] flex-col justify-center shadow-sm bg-white p-6 rounded-2xl">
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
                  <Input
                    type={oldPasswordVisible ? "text" : "password"}
                    className={`${styles.input} !w-[100%] mb-4 800px:0 shadow-sm custom-input px-4`}
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
                  <Input
                    type={newPasswordVisible ? "text" : "password"}
                    className={`${styles.input} !w-[100%] mb-4 800px:0 shadow-sm custom-input px-4`}
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
                  <Input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className={`${styles.input} !w-[100%] mb-4 800px:0 shadow-sm custom-input px-4`}
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
                <div
                  className={`${styles.button6} border-[#077773] px-2`}
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
                  className={`${styles.button6} w-[150px] text-white text-center bg-[#FF8474] cursor-pointer px-2`}
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

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
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

    if (
      addressType === "" ||
      country === "" ||
      province === "" ||
      city === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          province,
          city,
          address,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setProvince("");
      setCity("");
      setAddress("");
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
      <Modal
        title="Add New Address"
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText="Submit"
        okButtonProps={{
          className: "custom-ok-button-class rounded-2xl",
        }}
        cancelButtonProps={{
          className: "custom-cancel-button-class rounded-2xl",
        }}
      >
        <form aria-required onSubmit={handleSubmit} className="w-full">
          <div className="block w-full pb-2">
            <label className="block pb-2">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className=" px-4 w-full border h-[30px] rounded-full custom-select1 hover:border-[#006665] focus:border-[#006665]"
            >
              <option value="">Choose your country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="block w-full pb-2">
            <label className="block pb-2 ">Province</label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className=" px-4 w-full border h-[30px] rounded-full custom-select1 hover:border-[#006665] focus:border-[#006665]"
            >
              <option value="">Choose your Province</option>
              {State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="block w-full pb-2">
            <label className="block pb-2">City</label>
            <input
              type="text"
              className=" px-4 w-full border h-[30px] rounded-full focus:border-[#006665]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="block w-full pb-2">
            <label className="block pb-2">Barangay</label>
            <input
              type="text"
              className="px-4 w-full border h-[30px] rounded-full focus:border-[#006665]"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="block w-full pb-2">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              className="px-4 w-full border h-[30px] rounded-full focus:border-[#006665]"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              min="0"
            />
          </div>
          <div className="block w-full pb-2">
            <label className="block pb-2">Address Type</label>
            <select
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
              className="px-4 w-full border h-[30px] rounded-full custom-select1 hover:border-[#006665] focus:border-[#006665]"
            >
              <option value="">Choose your Address Type</option>
              {addressTypeData.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>

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
                {item.country} {item.city} {item.zipCode}
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
                className="cursor-pointer hover:text-[#FE8373]"
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

const DeleteUserAccount = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const showDeleteModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    dispatch(deleteUser());
    setVisible(false);
    navigate("/");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-600 font-semibold mb-4 text-center">
          Warning: This action cannot be undone. Proceed with caution.
        </p>
        <Button
          type="primary"
          danger
          onClick={showDeleteModal}
          className="mb-4"
        >
          Delete Account
        </Button>
      </div>
      <Modal
        title="Delete Account"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <div className="flex flex-col items-center">
          <ExclamationCircleOutlined className="text-5xl text-red-500 mb-4" />
          <p className="text-center">
            Are you sure you want to delete your account, {user.name}?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ProfileContent;
