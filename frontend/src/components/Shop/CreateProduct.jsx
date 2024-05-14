import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PiWarningCircleLight } from "react-icons/pi";

const { Option } = Select;

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isResetHovered, setIsResetHovered] = useState(false);
  const [isCreateHovered, setIsCreateHovered] = useState(false);

  const [images, setImages] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (error) {
      message.error(error);
    }
    if (success) {
      message.success("Product created successfully!");
      navigate("/dashboard-products");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = ({ fileList }) => {
    setImages(fileList);
  };

  const onFinish = (values) => {
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image.originFileObj);
    });
    newForm.append("name", values.name);
    newForm.append("description", values.description);
    newForm.append("category", values.category);
    newForm.append("tags", values.tags);
    newForm.append("originalPrice", values.originalPrice || 0)
    newForm.append("discountPrice", values.discountPrice);
    newForm.append("stock", values.stock);
    newForm.append("shopId", seller._id);
    dispatch(createProduct(newForm));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div
      className="w-[100%] 800px:w-[80%] bg-white  shadow h-[88.5vh] mt-2 rounded-xl p-6 absolute"
      style={{ scrollbarWidth: "xs", overflowY: "auto" }}
    >
      <h5 className="text-[30px] font-Poppins text-center pb-8 pt-3">
        Create Product
      </h5>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className=""
      >
        <div className="flex flex-row space-x-3">
          <div className="input-wrapper w-[50%]">
            <label htmlFor="name">
              <span className="text-red-500">*</span>Name:
            </label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input product name" }]}
            >
              <Input
                id="name"
                placeholder="Enter your product name..."
                className="custom-input rounded-2xl"
              />
            </Form.Item>
          </div>
          <div className="input-wrapper w-[50%]">
            <label htmlFor="category">
              <span className="text-red-500">*</span>Category:
            </label>
            <Form.Item
              name="category"
              rules={[
                { required: true, message: "Please select product category" },
              ]}
            >
              <Select
                className="custom-select"
                id="category"
                placeholder="Choose a category"
              >
                {categoriesData.map((category) => (
                  <Option key={category.title} value={category.title}>
                    {category.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <div className="input-wrapper w-[50%]">
            <label htmlFor="tags">Tags:</label>
            <Form.Item name="tags">
              <Input
                id="tags"
                placeholder="Enter your product tags..."
                className="custom-input rounded-2xl"
              />
            </Form.Item>
          </div>
          <div className="input-wrapper w-[50%]">
            <label htmlFor="originalPrice">
              <span className="text-red-500"></span>Original Price:{" "}
            </label>
            <Form.Item
              name="originalPrice"
            >
              <Input
                id="originalPrice"
                type="number"
                placeholder="Enter your product price..."
                className="custom-input rounded-2xl"
              />
              <span className="text-[12px] text-gray-400 flex items-center">
                <PiWarningCircleLight className="mr-1 mb-5" />
                Providing an original price (higher amount than the displayed
                price) can boost sales, just ensure accurate pricing input.
              </span>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <div className="input-wrapper w-[50%]">
            <label htmlFor="discountPrice">
              <span className="text-red-500">*</span>Price:{" "}
              <span className="text-gray-400">(to be displayed)</span>
            </label>
            <Form.Item
              name="discountPrice"
              rules={[
                {
                  required: true,
                  message: "Please input product price with discount",
                },
              ]}
            >
              <Input
                id="discountPrice"
                type="number"
                placeholder="Enter your product price with discount..."
                className="custom-input rounded-2xl"
              />
            </Form.Item>
          </div>
          <div className="input-wrapper w-[50%]">
            <label htmlFor="stock">
              <span className="text-red-500">*</span>Product Stock:
            </label>
            <Form.Item
              name="stock"
              rules={[
                { required: true, message: "Please input product stock" },
              ]}
            >
              <Input
                id="stock"
                type="number"
                placeholder="Enter your product stock..."
                className="custom-input rounded-2xl"
              />
            </Form.Item>
          </div>
        </div>
        <div className="input-wrapper w-[50%]">
          <label htmlFor="description">
            <span className="text-red-500">*</span>Description:
          </label>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input product description" },
            ]}
          >
            <Input.TextArea
              id="description"
              rows={8}
              placeholder="Enter your product description..."
              className="custom-input rounded-2xl"
            />
          </Form.Item>
        </div>

        <div className="input-wrapper">
          <label htmlFor="images">
            <span className="text-red-500">*</span>Upload Images:
          </label>
          <Form.Item
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              fileList={images}
              onChange={handleImageChange}
            >
              {images.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>

        <div>
          <p className="text-gray-400">Recommended Specification:</p>
          <p className="pl-5 text-gray-400">
            • At least 2 images with the actual product
          </p>
          <p className="pl-5 text-gray-400">
            • Dimensions of at least 300 x 300 pixels
          </p>
        </div>
        <br />
        <div className="justify-evenly space-x-2">
          <Button
            className="rounded-2xl"
            onClick={() => form.resetFields()}
            style={{
              marginLeft: "8px",
              borderColor: isResetHovered ? "#006665" : "",
              color: isResetHovered ? "#006665" : "#006665",
              transition: "background-color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={() => setIsResetHovered(true)}
            onMouseLeave={() => setIsResetHovered(false)}
          >
            Reset
          </Button>
          <Button
            className="rounded-2xl"
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: isCreateHovered ? "#077773" : "#006665",
              borderColor: isCreateHovered ? "#077773" : "#006665",
              transition: "background-color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={() => setIsCreateHovered(true)}
            onMouseLeave={() => setIsCreateHovered(false)}
          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProduct;
