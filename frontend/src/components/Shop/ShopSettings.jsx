import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { AiOutlineCamera } from "react-icons/ai";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [form] = Form.useForm();
  const [oldPassword, setOldPassword] = useState("");


  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

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
      toast.error(error.response.data.message);
    }
  };

  const onFinish = async (values) => {

    try {
      await axios.put(`${server}/shop/update-seller-info`, values, {
        withCredentials: true,
      });
      dispatch(loadSeller());
      toast.success("Shop info updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-shop-password`,
        { oldPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}/${seller.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
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
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            name: seller.name,
            description: seller.description || "",
            address: seller.address,
            phoneNumber: seller.phoneNumber,
            zipCode: seller.zipCode,
          }}
        >
          <Form.Item
            label="Shop Name"
            name="name"
            rules={[{ required: false, message: "Please enter shop name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Shop Description" name="description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Shop Address"
            name="address"
            rules={[{ required: false, message: "Please enter shop address" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Shop Phone Number"
            name="phoneNumber"
            rules={[
              { required: false, message: "Please enter phone number" },
              {
                pattern: /^\d+$/,
                message: "Please enter only digits",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Shop Zip Code"
            name="zipCode"
            rules={[{ required: false, message: "Please enter zip code" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            rules={[{ required: false, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Update Shop
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ShopSettings;
