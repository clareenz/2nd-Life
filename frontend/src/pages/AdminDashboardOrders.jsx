import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";
import { Button, Dropdown, Input, Menu, Space, Switch, Table, Tag } from "antd";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Layout/AdminSidebar";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();
  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

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
      ellipsis: true,
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: visibleColumns.id ? (text) => text : null,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: visibleColumns.status ? (status) => (
        <Tag color={status === "Delivered" ? "green" : "red"}>{status}</Tag>
      ): null,
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
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: visibleColumns.createdAt ? (text) => text : null,
    },
  ];

  const data = adminOrders?.map((item) => ({
    key: item._id,
    id: item._id,
    itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
    total: item?.totalPrice,
    status: item?.status,
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
    <div>
      <AdminHeader />
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center flex-col">
              <h3 className="text-[22px] font-Poppins pb-2">All Orders</h3>
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
              <div style={{ overflowY: "auto" }}className="px-35px">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
