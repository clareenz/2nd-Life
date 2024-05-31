import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  Input,
  Space,
  Dropdown,
  Menu,
  message,
  Switch
} from "antd";
import {  AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";


const AllProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
    name: true,
    price: true,
    Stock: true,
    sold: true,
    action: true,
  });

  const columns = [
    {
      title: "Product ID",
      dataIndex: "id",
      key: "id",
      width: 150,
      align: "center",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: visibleColumns.id ? (text) => text : null,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      align: "center",
      ...getColumnSearchProps("name"),
      filters: [
        { text: "A", value: "A" },
        { text: "B", value: "B" },
        // Add more filters as needed
      ],
      onFilter: (value, record) => record.name.startsWith(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: visibleColumns.name ? (text) => text : null,
    },
    {
      title: "Price (₱)",
      dataIndex: "price",
      key: "price",
      width: 150,
      align: "center",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
      render: visibleColumns.price ? (text) => text : null,
    },
    {
      title: "Stock",
      dataIndex: "Stock",
      key: "Stock",
      width: 150,
      align: "center",
      ...getColumnSearchProps("Stock"),
      sorter: (a, b) => a.Stock - b.Stock,
      render: visibleColumns.Stock ? (text) => text : null,
    },
    {
      title: "Sold out",
      dataIndex: "sold",
      key: "sold",
      width: 150,
      align: "center",
      ...getColumnSearchProps("sold"),
      sorter: (a, b) => a.sold - b.sold,
      render: visibleColumns.sold ? (text) => text : null,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      render: visibleColumns.action
        ? (text, record) => (
            <Link to={`/product/${record.id}`}>
              <Button icon={<AiOutlineEye size={20} />} />
            </Link>
          )
        : null,
    },
  ];

  const row = data.map((item) => ({
    key: item._id,
    id: item._id,
    name: item.name,
    price: item.discountPrice,
    Stock: item.stock,
    sold: item.sold_out,
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
    <div className="w-full mx-8 pt-1 mt-10 bg-white rounded-2xl shadow-md">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-row">
            <div className="w-full flex justify-between">
              <h3 className="text-2xl px-[40px] py-3">All Products</h3>
            </div>
            <div className="flex p-4 px-[50px]">
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
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns.filter((column) => visibleColumns[column.key])}
              dataSource={row}
              pagination={{ pageSize: 10 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
