import { Button, Dropdown, Input, Menu, Space, Switch, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiPackageDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import Highlighter from "react-highlight-words";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [deliveredOrder, setDeliveredOrder] = useState([]);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  useEffect(() => {
    setDeliveredOrder(orders);
  }, [orders]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  // Calculate total revenue
  const totalRevenue = deliveredOrder.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  // Calculate average order value
  const averageOrderValue =
    deliveredOrder.length > 0 ? totalRevenue / deliveredOrder.length : 0;

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
            style={{
              width: 90,
              backgroundColor: "#006665",
              borderColor: "#006665",
              color: "#fff",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
            className="custom-button"
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
      width: 130,
      align: "center",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: visibleColumns.id ? (text) => text : null,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      align: "center",
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
      width: 130,
      align: "center",
      ...getColumnSearchProps("itemsQty"),
      sorter: (a, b) => a.itemsQty - b.itemsQty,
      render: visibleColumns.itemsQty ? (text) => text : null,
    },
    {
      title: "Total (₱)",
      dataIndex: "total",
      key: "total",
      width: 130,
      align: "center",
      ...getColumnSearchProps("total"),
      sorter: (a, b) => a.total - b.total,
      render: visibleColumns.total ? (text) => text : null,
    },
    {
      title: "Details",
      key: "action",
      width: 130,
      align: "center",
      render: visibleColumns.action
        ? (text, record) => (
            <Link to={`/order/${record.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          )
        : null,
    },
  ];

  const data = deliveredOrder.map((item) => ({
    id: item._id,
    itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
    total: item.totalPrice,
    status: item.status,
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
    <div className="w-full">
      <h3 className="text-[25px] font-Poppins pb-4 px-[40px]">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="overview-card">
          <div className="flex flex-row items-center justify-between p-2">
            <div className="flex items-center">
              <FcMoneyTransfer size={25} className="mr-2" fill="#00000085" />
              <h3 className="!text-[18px] leading-5 !font-[400] text-[#00000085]">
                Account Balance{" "}
              </h3>
            </div>
            <div className="">
              <Link to="/dashboard-withdraw-money">
                <h5 className="text-[#077f9c]">Withdraw</h5>
              </Link>
            </div>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ₱ {availableBalance}
          </h5>
        </div>

        <div className="overview-card">
          <div className="flex flex-row items-center justify-between p-2">
            <div className="flex items-center">
              <BiSolidShoppingBags size={25} className="mr-2" fill="orange" />
              <h3 className="!text-[18px] leading-5 !font-[400] text-[#00000085]">
                All Orders
              </h3>
            </div>
            <div>
              <Link to="/dashboard-orders">
                <h5 className="text-[#077f9c]">View Orders</h5>
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {orders && orders.length}
              </h5>
            </div>
            <div className="text-[10px] pt-2">
              <h5 className="text-[#00000085]">
                Total Revenue: ₱ {totalRevenue.toFixed(2)}
              </h5>
              <h5 className="text-[#00000085]">
                Average Order Value: ₱ {averageOrderValue.toFixed(2)}
              </h5>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <div className="flex flex-row items-center justify-between p-2">
            <div className="flex items-center">
              <PiPackageDuotone size={25} className="mr-2" fill="brown" />
              <h3 className="!text-[18px] leading-5 !font-[400] text-[#00000085]">
                All Products
              </h3>
            </div>
            <div>
              <Link to="/dashboard-products">
                <h5 className="text-[#077f9c]">View Products</h5>
              </Link>
            </div>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
        </div>
      </div>
      <br />
      <div className="justify-center">
        <h3 className="text-[25px] font-Poppins pb-4 px-[50px]">
          Latest Orders
        </h3>
      </div>
      <div className="">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full min-h-[45vh] bg-white rounded-3xl shadow-md">
            <div className="flex flex-col justify-between">
              <div className="flex justify-end p-4 px-[50px]">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <EllipsisOutlined style={{ fontSize: "24px" }} />
                  </a>
                </Dropdown>
              </div>

              <div style={{ overflowX: "auto" }} className="">
                <Table
                  dataSource={data}
                  columns={columns.filter(
                    (column) => visibleColumns[column.key]
                  )}
                  pagination={{ pageSize: 10 }}
                  rowKey="id"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHero;
