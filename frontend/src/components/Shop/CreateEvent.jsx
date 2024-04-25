import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";
import { Form, Input, Select, Button, DatePicker, message, Upload } from "antd";
import { BorderOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isResetHovered, setIsResetHovered] = useState(false);
  const [isCreateHovered, setIsCreateHovered] = useState(false);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
    if (success) {
      message.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleStartDateChange = (dateString) => {
    const startDate = new Date(dateString);
    if (!isNaN(startDate)) {
      const minEndDate = new Date(
        startDate.getTime() + 3 * 24 * 60 * 60 * 1000
      );
      setStartDate(startDate);
      setEndDate(null);
      const endDateInput = document.getElementById("end-date");
      if (endDateInput) {
        endDateInput.min = minEndDate.toISOString().slice(0, 10);
      }
    }
  };

  const handleEndDateChange = (date, dateString) => {
    setEndDate(dateString);
  };

  const handleImageChange = ({ fileList }) => {
    setImages(fileList);
  };

  const onFinish = (values) => {
    const {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
    } = values;

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image.originFileObj);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate);
    newForm.append("Finish_Date", endDate);
    dispatch(createevent(newForm));
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
      className="w-[90%] 800px:w-[50%] bg-white shadow h-[88.5vh] mt-2 rounded-xl p-6 absolute"
      style={{ scrollbarWidth: "none", overflowY: "auto" }}
    >
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className=""
      >
        <div className="input-wrapper">
          <label htmlFor="name">
            <span className="text-red-500">*</span>Name:
          </label>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter event product name" },
            ]}
          >
            <Input
              placeholder="Enter your event product name..."
              className="custom-input rounded-2xl"
            />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="description">
            <span className="text-red-500">*</span>Description:
          </label>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter event product description",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter your event product description..."
              className="custom-input rounded-2xl"
            />
          </Form.Item>
        </div>

        <div className="input-wrapper">
          <label htmlFor="Category">
            <span className="text-red-500">*</span>Category:
          </label>
          <Form.Item
            className="custom-input rounded-2xl"
            name="category"
            rules={[
              { required: true, message: "Please select product category" },
            ]}
          >
            <Select
              id="category"
              placeholder="Choose a category"
              className="custom-select"
            >
              {categoriesData.map((category) => (
                <Option key={category.title} value={category.title}>
                  {category.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="input-wrapper">
          <label htmlFor="Tags">Tags:</label>
          <Form.Item name="tags">
            <Input
              id="tags"
              placeholder="Enter your product tags..."
              className="custom-input rounded-2xl"
            />
          </Form.Item>
        </div>

        <div className="input-wrapper">
          <label htmlFor="Original Price">Original Price:</label>
          <Form.Item
            name="originalPrice"
            rules={[
              {
                required: true,
                message: "Please input product price with discount",
              },
            ]}
          >
            <Input
              id="originalPrice"
              type="number"
              placeholder="Enter your product price..."
              className="custom-input rounded-2xl"
            />
          </Form.Item>
        </div>

        <div className="input-wrapper">
          <label htmlFor="discountPrice">
            <span className="text-red-500">*</span>Price (With Discount):
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

        <div className="input-wrapper">
          <label htmlFor="stock">
            <span className="text-red-500">*</span>Product Stock:
          </label>
          <Form.Item
            name="stock"
            rules={[{ required: true, message: "Please input product stock" }]}
          >
            <Input
              id="stock"
              type="number"
              placeholder="Enter your product stock..."
              className="custom-input rounded-2xl"
            />
          </Form.Item>
        </div>

        <div>
          <label htmlFor="Event start date">
            <span className="text-red-500">*</span>Start Date:
          </label>
          <Form.Item
            name="startDate"
            rules={[
              { required: true, message: "Please select event start date" },
            ]}
          >
            <DatePicker
              onChange={(date, dateString) => handleStartDateChange(dateString)}
              className="custom-date-picker rounded-2xl "
              style={{}}
            />
          </Form.Item>
        </div>

        <div>
          <label htmlFor="Event End date">
            <span className="text-red-500">*</span>End Date:
          </label>
          <Form.Item
            name="endDate"
            rules={[
              { required: true, message: "Please select event end date" },
            ]}
          >
            <DatePicker
              id="end-date"
              onChange={(date, dateString) =>
                handleEndDateChange(date, dateString)
              }
              className="custom-date-picker rounded-2xl"
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
            <div className="custom-upload-wrapper">
              {" "}
              {/* Add a wrapper div */}
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
            </div>
          </Form.Item>
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

export default CreateEvent;
