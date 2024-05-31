import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";
import { FcMoneyTransfer } from "react-icons/fc";
import { LiaStoreSolid } from "react-icons/lia";
import { Button, Dropdown, Input, Menu, Space, Switch, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { BsCartCheck } from "react-icons/bs";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);


  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = adminEarning?.toFixed(2);

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
    createdAt: true,
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: 150,
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: visibleColumns.id ? (text) => text : null,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Items Qty",
      dataIndex: "itemsQty",
      key: "itemsQty",
      width: 130,
      ...getColumnSearchProps("itemsQty"),
      sorter: (a, b) => a.itemsQty - b.itemsQty,
      render: visibleColumns.itemsQty ? (text) => text : null,
    },
    {
      title: "Total (₱)",
      dataIndex: "total",
      key: "total",
      width: 130,
      ...getColumnSearchProps("total"),
      sorter: (a, b) => a.total - b.total,
      render: visibleColumns.total ? (text) => text : null,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 130,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice,
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  const data = filteredData.map((item) => ({
    id: item._id,
    status: item.status,
    itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
    total: item.totalPrice,
    createdAt: item?.createdAt.slice(0, 10),
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
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-8">
          <h3 className="text-[25px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="overview-card">
              <div className="flex flex-row items-center justify-between p-2">
                <FcMoneyTransfer size={25} className="mr-2" fill="#00000085" />
                <h3
                  className={`!text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Total Earning
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                ₱ {adminBalance}
              </h5>
            </div>

            <div className="overview-card">
              <div className="flex flex-row items-center justify-between p-2">
                <div className="flex items-center">
                  <LiaStoreSolid size={25} className="mr-2" fill="orange" />
                  <h3
                    className={`!text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    All Sellers
                  </h3>
                </div>
                <div>
                  <Link to="/admin-sellers">
                    <h5 className=" text-[#077f9c]">View Sellers</h5>
                  </Link>
                </div>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {sellers && sellers.length}
              </h5>
            </div>

            <div className="overview-card">
              <div className="flex flex-row items-center justify-between p-2">
                <div className="flex items-center">
                  <BsCartCheck
                    size={25}
                    className="mr-2"
                    fill="brown"
                  />
                  <h3
                    className={`!text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    All Orders
                  </h3>
                </div>
                <div>
                  <Link to="/admin-orders">
                    <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
                  </Link>
                </div>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminOrders && adminOrders.length}
              </h5>
            </div>
          </div>

          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded-2xl">
            <div className="table-controls">
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <EllipsisOutlined style={{ fontSize: "24px" }} />
                </a>
              </Dropdown>
            </div>
            <div style={{  overflowY: "auto" }}>
              <Table
                dataSource={row}
                columns={columns.filter((column) => visibleColumns[column.key])}
                pagination={{ pageSize: 10 }}
                rowKey="id"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
