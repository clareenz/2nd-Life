import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Space, Switch, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import Loader from "../Layout/Loader";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  useEffect(() => {
    setFilteredData(orders);
  }, [orders]);

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
    status: true,
    itemsQty: true,
    total: true,
    action: true,
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 150,
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: visibleColumns.id ? (text) => text : null,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 150,
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: visibleColumns.status
        ? (status) => (
            <Tag color={status === "Delivered" ? "green" : "red"}>{status}</Tag>
          )
        : null,
    },
    {
      title: "Items Qty",
      dataIndex: "itemsQty",
      key: "itemsQty",
      align: "center",
      width: 150,
      ...getColumnSearchProps("itemsQty"),
      sorter: (a, b) => a.itemsQty - b.itemsQty,
      render: visibleColumns.itemsQty ? (text) => text : null,
    },
    {
      title: "Total (₱)",
      dataIndex: "total",
      key: "total",
      align: "center",
      width: 150,
      ...getColumnSearchProps("total"),
      sorter: (a, b) => a.total - b.total,
      render: visibleColumns.total ? (text) => text : null,
    },
    {
      title: "Details",
      key: "action",
      align: "center",
      width: 150,
      render: visibleColumns.action
        ? (text, record) => (
            <Link to={`/order/${record.id}`}>
              <Button className="custom-button1">
                <span className="text-12px">View</span>
              </Button>
            </Link>
          )
        : null,
    },
  ];

  const data = filteredData.map((item) => ({
    id: item._id,
    status: item.status,
    itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
    total: item.totalPrice,
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
      <div className=" pt-6">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full min-h-[45vh] bg-white rounded-3xl shadow-md">
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="text-[25px] font-Poppins px-3 sm:px-[40px] py-4">
                  All Orders
                </h1>
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
            <div style={{ overflowY: "auto" }}>
              <Table
                dataSource={data}
                columns={columns.filter((column) => visibleColumns[column.key])}
                pagination={{ pageSize: 10 }}
                rowKey="id"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
