import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import axios from "axios";
import { updateShopInformation } from "../../redux/actions/sellers";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { Form, Input, Button, Row, Col } from "antd";
import styles from "../../styles/styles";
import { server } from "../../server";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipCode] = useState(seller?.zipCode || "");
  const [email, setEmail] = useState(seller?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller) {
      setName(seller.name);
      setDescription(seller.description);
      setAddress(seller.address);
      setPhoneNumber(seller.phoneNumber);
      setZipCode(seller.zipCode);
      setEmail(seller.email);
    }
  }, [seller]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(loadSeller());
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setName(seller?.name || "");
    setDescription(seller?.description || "");
    setAddress(seller?.address || "");
    setPhoneNumber(seller?.phoneNumber || "");
    setZipCode(seller?.zipCode || "");
    setEmail(seller?.email || "");
    setPassword("");
  };

  const handleSubmit = async () => {
    if (!password) {
      toast.error("Please enter your password to update your information.");
      return;
    }

    try {
      await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(loadSeller());
      toast.success("Shop information updated successfully!");
      setPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update shop information"
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5 shadow-sm bg-white p-6 rounded-2xl">
        <div className="flex items-center justify-center w-full">
          <div className="relative p-3 mb-3">
            <img
              src={avatar ? URL.createObjectURL(avatar) : seller?.avatar?.url}
              alt="Shop Avatar"
              className="w-[200px] h-[200px] rounded-full cursor-pointer object-cover"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
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
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name,
            description,
            address,
            phoneNumber,
            zipCode,
            email,
          }}
        >
          <Row gutter={[14, 4]}>
            <Col span={12}>
              <Form.Item
                label="Shop Name"
                name="name"
                rules={[{ required: true, message: "Please enter shop name" }]}
              >
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${styles.input} px-4 custom-input`}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${styles.input} px-4 custom-input`}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Shop Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter shop address" },
                ]}
              >
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`${styles.input} px-4 custom-input`}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`${styles.input} px-4 custom-input`}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Zip Code"
                name="zipCode"
                rules={[{ required: true, message: "Please enter zip code" }]}
              >
                <Input
                  type="number"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className={`${styles.input} px-4 custom-input`}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles.input} px-4 custom-input`}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.input} px-4 custom-input`}
                  suffix={
                    <Button
                      type="link"
                      icon={
                        showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )
                      }
                      onClick={togglePasswordVisibility}
                    />
                  }
                  style={{ outline: "none" }} // Add this line to remove the focus outline
                />
              </Form.Item>
            </Col>
            <Col span={24} className="flex justify-end">
              <Button
                className={`${styles.button6} mr-2`}
                onClick={handleCancel}
                style={{
                  borderColor: "#077773",
                  color: "#006665",
                  backgroundColor: "transparent",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
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
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className={`${styles.button6} bg-[#FF8474] text-white`}
                style={{
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFA99E";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF8474";
                  e.currentTarget.style.color = "white";
                }}
              >
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ShopSettings;
