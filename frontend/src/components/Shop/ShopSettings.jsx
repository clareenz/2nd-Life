import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { Form, Input, Button, Row, Col } from "antd";
import styles from "../../styles/styles";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (values) => {
    try {
      // If password is not provided in the form values, use the existing password
      const updatedPassword = values.password ? values.password : password;
  
      await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name: values.name,
          address: values.address,
          zipCode: values.zipCode,
          phoneNumber: values.phoneNumber,
          description: values.description,
          password: updatedPassword, // Use updatedPassword here
        },
        { withCredentials: true }
      );
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
  
      const sellerId = seller._id;
      await axios.put(`${server}/product/update-shop-products`, {
        sellerId,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  
  return (
    <div className="pr-2 flex flex-col items-center w-full min-h-screen">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5 shadow bg-white p-6 rounded-2xl">
        <div className="flex items-center justify-center w-full">
          <div className="relative p-3 mb-3">
            <img
              src={
                avatar
                  ? avatar
                  : `${seller.avatar?.url}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer object-cover"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[15px] right-[30px]">
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
        <br/>
        {/* shop info */}
        <Form
          layout="vertical"
          onFinish={updateHandler}
          initialValues={{
            name: seller?.name,
            description: seller?.description,
            address: seller?.address,
            phoneNumber: seller?.phoneNumber,
            zipCode: seller?.zipCode,
          }}
        >
          <Row gutter={[14, 4]}>
            <Col span={12}>
              <Form.Item label="Shop Name" name="name" rules={[{ required: true, message: "Please enter shop name" }]}>
                <Input className={`${styles.input} px-4 custom-input`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <Input className={`${styles.input} px-4 custom-input`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Shop Address" name="address" rules={[{ required: true, message: "Please enter shop address" }]}>
                <Input className={`${styles.input} px-4 custom-input`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Please enter phone number" }]}>
                <Input type="number" className={`${styles.input} px-4 custom-input`} min="0" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Zip Code" name="zipCode" rules={[{ required: true, message: "Please enter zip code" }]}>
                <Input type="number" min="0" className={`${styles.input} px-4 custom-input`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password" name="password">
                <Input.Password className={`${styles.input} px-4 custom-input`} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div type="primary" htmlType="submit" className={`${styles.button6} sm:ml-[200px] lg:ml-[380px] text-white bg-[#006665] rounded-3xl text-[14px] hover:bg-[#077773]`}>
                Update Shop
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ShopSettings;
