import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";
import { Form, Input, Select, Button, DatePicker, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
      className="w-[90%] 800px:w-[50%] bg-white shadow h-[88.5vh] mt-2 rounded-lg p-6 absolute"
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
          <label htmlFor="name">Name:</label>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter event product name" },
            ]}
          >
            <Input placeholder="Enter your event product name..." />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <label htmlFor="name">Description:</label>
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
            />
          </Form.Item>
        </div>

        <div className="input-wrapper">
          <label htmlFor="category">Category:</label>
          <Form.Item
            name="category"
            rules={[
              { required: true, message: "Please select product category!" },
            ]}
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
        
        <Form.Item
          label="Event Start Date"
          name="startDate"
          rules={[
            { required: true, message: "Please select event start date" },
          ]}
        >
          <DatePicker
            onChange={(date, dateString) => handleStartDateChange(dateString)}
          />
        </Form.Item>

        <Form.Item
          label="Event End Date"
          name="endDate"
          rules={[{ required: true, message: "Please select event end date" }]}
        >
          <DatePicker
            id="end-date"
            onChange={(date, dateString) =>
              handleEndDateChange(date, dateString)
            }
          />
        </Form.Item>

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
        <br />
        <div className="justify-evenly space-x-2">
          <Button
            onClick={() => form.resetFields()}
            style={{ marginLeft: "8px" }}
          >
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

export default CreateEvent;
