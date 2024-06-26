import React, { useEffect, useState } from "react";
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
  }, [dispatch, error, success, navigate]);

  const handleImageChange = ({ fileList }) => {
    setImages(fileList);
  };

  const onFinish = (values) => {
    const newForm = new FormData();
    console.log(values);
    images.forEach((image) => {
      newForm.append("images", image.originFileObj);
    });
    newForm.append("name", values.name);
    newForm.append("description", values.description);
    newForm.append("category", values.category);
    newForm.append("tags", values.tags);
    newForm.append("originalPrice", values.originalPrice);
    console.log("Original Price:", values.originalPrice); // Debugging line
    newForm.append("discountPrice", values.discountPrice);
    console.log("Discount Price:", values.discountPrice); // Debugging line
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
    <div className="px-4 pl-[10px] xl:pl-[3px] lg:pl-[5px] md:pl-[10px]">
      <div
        className=" bg-white shadow h-[85vh] w-[100%] mt-6 rounded-xl p-6"
        style={{ scrollbarWidth: "xs", overflowY: "auto" }}
      >
        <h5 className="text-[30px] font-Poppins text-center pb-8 pt-3">
          Create Product
        </h5>
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div className="flex flex-row space-x-3">
            <div className="input-wrapper w-[50%]">
              <label htmlFor="name">
                <span className="text-red-500">*</span>Name:
              </label>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
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
                <select
                  className="px-3 py-1 border w-full rounded-2xl custom-select1 hover:border-[#006665] focus:border-[#006665]"
                  id="category"
                >
                  <option value="" disabled selected>
                    Choose a category
                  </option>
                  {categoriesData.map((category) => (
                    <option key={category.title} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
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
                <span className="text-red-500">*</span>Original Price:{" "}
                <span className="text-gray-400 text-[12px]">
                  (Original price boosts sales, encouraging purchases.)
                </span>
              </label>

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
                  min="0"
                  placeholder="Enter your product price with discount..."
                  className="custom-input rounded-2xl"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-row space-x-3">
            <div className="input-wrapper w-[50%]">
              <label htmlFor="discountPrice">
                <span className="text-red-500">*</span>Price:{" "}
                <span className="text-gray-400 text-[12px]">
                  (to be displayed/selling price)
                </span>
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
                  min="0"
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
                  min="1"
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
          <div className="space-x-2 justify-evenly">
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
    </div>
  );
};

export default CreateProduct;
