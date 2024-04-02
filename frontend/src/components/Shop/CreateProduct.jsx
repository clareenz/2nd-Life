import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    newForm.append("originalPrice", values.originalPrice);
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
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[88.5vh] mt-2 rounded-lg p-6 absolute"
      style={{ scrollbarWidth: "none", overflowY: "auto" }}
    >
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className=""
      >
        <div className="input-wrapper">
          <label htmlFor="name">Name:</label>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input id="name" placeholder="Enter your product name..." />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="description">Description:</label>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please input product description!" }]}
          >
            <Input.TextArea id="description" rows={8} placeholder="Enter your product description..." />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="category">Category:</label>
          <Form.Item
            name="category"
            rules={[{ required: true, message: "Please select product category!" }]}
          >
            <Select id="category" placeholder="Choose a category">
              {categoriesData.map((category) => (
                <Option key={category.title} value={category.title}>
                  {category.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="tags">Tags:</label>
          <Form.Item name="tags">
            <Input id="tags" placeholder="Enter your product tags..." />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="originalPrice">Original Price:</label>
          <Form.Item name="originalPrice">
            <Input id="originalPrice" type="number" placeholder="Enter your product price..." />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="discountPrice">Price (With Discount):</label>
          <Form.Item
            name="discountPrice"
            rules={[{ required: true, message: "Please input product price with discount!" }]}
          >
            <Input id="discountPrice" type="number" placeholder="Enter your product price with discount..." />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="stock">Product Stock:</label>
          <Form.Item
            name="stock"
            rules={[{ required: true, message: "Please input product stock!" }]}
          >
            <Input id="stock" type="number" placeholder="Enter your product stock..." />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="images">Upload Images:</label>
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
        <div className="justify-evenly space-x-2">
          <Button onClick={() => form.resetFields()} style={{ marginLeft: "8px" }}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProduct;
