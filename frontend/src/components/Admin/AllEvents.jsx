import {
  Button,
  Table,
  Modal,
  Input,
  InputNumber,
  Space,
  Switch,
  Dropdown,
  Menu,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";
import Highlighter from "react-highlight-words";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import Loader from "../Layout/Loader";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state

  useEffect(() => {
    axios
      .get(`${server}/event/admin-all-events`, { withCredentials: true })
      .then((res) => {
        setEvents(res.data.events);
        setLoading(false); // Set loading to false after data fetching
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false); // Set loading to false on error
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
    stock: true,
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
      dataIndex: "stock",
      key: "stock",
      width: 150,
      align: "center",
      ...getColumnSearchProps("stock"),
      sorter: (a, b) => a.stock - b.stock,
      render: visibleColumns.stock ? (text) => text : null,
    },
    {
      title: "Sold",
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
      width: 150,
      align: "center",
      render: visibleColumns.action
        ? (text, record) => (
            <>
              <Link to={`/product/${record.id}`} style={{ marginRight: 8 }}>
                <Button className="custom-button1" icon={<AiOutlineEye />} size={15} />
              </Link>
            </>
          )
        : null,
    },
  ];
  const dataSource = events.map((item) => ({
    key: item._id,
    id: item._id,
    name: item.name,
    price: item.discountPrice,
    stock: item.stock,
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
    <div className="w-full px-4 pl-[70px] xl:pl-[3px] lg:pl-[5px] md:pl-[25px]">
      <div className="pt-6">
        <div className=" pt-1 bg-white rounded-2xl shadow-md">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <div className="flex flex-row">
                <div className="w-full flex justify-between">
                  <h3 className="text-[25px] font-Poppins px-3 sm:px-[40px] py-4">All Events</h3>
                </div>
                <div className="flex p-4 px-[20px]">
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
                  dataSource={dataSource}
                  columns={columns.filter(
                    (column) => visibleColumns[column.key]
                  )}
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
