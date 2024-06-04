import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Input,
  Select,
  Menu,
  Dropdown,
  message,
  Space,
  Switch,
} from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Loader from "../Layout/Loader";
import styles from "../../styles/styles";
import { server } from "../../server";

const { Option } = Select;

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [isCreateHovered, setIsCreateHovered] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = React.useRef(null);

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then(() => {
        message.success("Coupon code deleted successfully!");
        setCoupons(coupons.filter((coupon) => coupon._id !== id)); // Update state after deletion
      })
      .catch(() => {
        message.error("Failed to delete coupon code!");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          expirationDate,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then(() => {
        message.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

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
    name: true,
    value: true,
    minAmount: true,
    maxAmount: true,
    expirationDate: true,
    action: true,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      maxWidth: 150,
      align: "center",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: visibleColumns.id ? (text) => text : null,
    },
    {
      title: "Coupon Code",
      dataIndex: "name",
      key: "name",
      maxWidth: 150,
      align: "center",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: visibleColumns.name ? (text) => text : null,
    },
    {
      title: "Value (%)",
      dataIndex: "value",
      key: "value",
      minWidth: 150,
      align: "center",
      ...getColumnSearchProps("value"),
      sorter: (a, b) => a.value - b.value,
      render: visibleColumns.value ? (text) => text : null,
    },
    {
      title: "Min Amount",
      dataIndex: "minAmount",
      key: "minAmount",
      minWidth: 150,
      align: "center",
      ...getColumnSearchProps("minAmount"),
      sorter: (a, b) => a.minAmount - b.minAmount,
      render: visibleColumns.minAmount ? (text) => text : null,
    },
    {
      title: "Max Amount",
      dataIndex: "maxAmount",
      key: "maxAmount",
      minWidth: 150,
      align: "center",
      ...getColumnSearchProps("maxAmount"),
      sorter: (a, b) => a.maxAmount - b.maxAmount,
      render: visibleColumns.maxAmount ? (text) => text : null,
    },
    {
      title: "Exp Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
      minWidth: 150,
      align: "center",
      ...getColumnSearchProps("expirationDate"),
      sorter: (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate),
      render: visibleColumns.expirationDate ? (text) => text : null,
    },
    {
      title: "Action",
      key: "action",
      minWidth: 150,
      align: "center",
      render: visibleColumns.action
        ? (text, record) => (
            <Button className="custom-button1" onClick={() => handleDelete(record.id)}>
              <AiOutlineDelete size={15} />
            </Button>
          )
        : null,
    },
  ];

  const data = coupons.map((item) => ({
    id: item._id,
    name: item.name,
    value: item.value,
    minAmount: item.minAmount,
    maxAmount: item.maxAmount,
    expirationDate: item.expirationDate.slice(0, 10),
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
    <div className="px-4 pl-[70px] xl:pl-[3px] lg:pl-[5px] md:pl-[80px]">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pt-1 mt-6 bg-white rounded-xl shadow-md">
          <div className="w-full flex justify-between">
            <div className="flex flex-row px-3 sm:px-[40px]">
              <h1 className="text-2xl py-3">Coupons</h1>
              <div className="flex p-4">
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
            <div
              className={`w-[90px] border border-006665  h-[35px] my-3 flex items-center justify-center rounded-full cursor-pointer m-5 bg-[#FF8474] text-white hover:bg-[#FC9A8E]`}
              onClick={() => setOpen(true)}
            >
              <span className="p-1 px-2 text-sm">Create</span>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns.filter((column) => visibleColumns[column.key])}
              dataSource={data}
              pagination={{ pageSize: 10 }}
            />
          </div>
          <Modal
            title="Create Coupon Code"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
          >
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="mb-3">
                <label>
                  <span className="text-red-500">*</span> Name
                </label>
                <Input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your coupon code name..."
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>
                  <span className="text-red-500">*</span> Discount Percentage
                </label>
                <Input
                  type="text"
                  name="value"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter your coupon code value..."
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>Min Amount</label>
                <Input
                  type="number"
                  name="minAmount"
                  value={minAmount}
                  min="0"
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="Enter your coupon code min amount..."
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>Max Amount</label>
                <Input
                  type="number"
                  name="maxAmount"
                  value={maxAmount}
                  min="0"
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="Enter your coupon code max amount..."
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>
                  <span className="text-red-500">*</span> Expiration Date
                </label>
                <Input
                  type="date"
                  name="expirationDate"
                  required
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="custom-input rounded-2xl"
                />
              </div>
              <div className="mb-3">
                <label>Selected Product</label>
                <Select
                  className="custom-select rounded-2xl w-full"
                  value={selectedProducts}
                  onChange={(value) => setSelectedProducts(value)}
                  placeholder="Choose a selected product"
                >
                  {products &&
                    products.map((product) => (
                      <Option value={product.name} key={product.name}>
                        {product.name}
                      </Option>
                    ))}
                </Select>
              </div>
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
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AllCoupons;
