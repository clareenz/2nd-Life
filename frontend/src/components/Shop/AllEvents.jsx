import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Input,
  InputNumber,
  Space,
  Switch,
  Menu,
  Dropdown,
} from "antd";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllEventsShop,
  deleteEvent,
  updateEvent,
} from "../../redux/actions/event";
import Loader from "../Layout/Loader";
import Highlighter from "react-highlight-words";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch, seller._id]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [editedEventName, setEditedEventName] = useState("");
  const [editedEventPrice, setEditedEventPrice] = useState(0);
  const [editedEventStock, setEditedEventStock] = useState(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  const handleEdit = (record) => {
    setEditedEvent({ ...record, eventId: record.id });
    setEditedEventName(record.name);
    setEditedEventPrice(record.price);
    setEditedEventStock(record.stock);
    setEditModalVisible(true);
  };

  const handleEditModalOk = async () => {
    const updatedEvent = {
      ...editedEvent,
      name: editedEventName,
      price: editedEventPrice,
      stock: editedEventStock,
    };
    await dispatch(updateEvent(updatedEvent.eventId, updatedEvent));
    setEditModalVisible(false);
    dispatch(getAllEventsShop(seller._id));
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleDelete = async (id) => {
    setDeleteModalVisible(true);
    setEventIdToDelete(id);
  };

  const handleDeleteConfirmed = async () => {
    await dispatch(deleteEvent(eventIdToDelete));
    dispatch(getAllEventsShop(seller._id));
    setDeleteModalVisible(false);
  };

  const handleDeleteCanceled = () => {
    setDeleteModalVisible(false);
  };

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
              <Link to={`/events/`} style={{ marginRight: 8 }}>
                <Button className="custom-button1" icon={<AiOutlineEye />} size={15} />
              </Link>
              <Button className="custom-button1"
                onClick={() => handleEdit(record)}
                style={{ marginRight: 8 }}
              >
                <AiOutlineEdit size={15} />
              </Button>
              <Button className="custom-button1" onClick={() => handleDelete(record.id)}>
                <AiOutlineDelete size={15} />
              </Button>
            </>
          )
        : null,
    },
  ];

  const data = events
    ? events.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
      }))
    : [];

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
    <div className="px-4 pl-[70px] xl:pl-[3px] lg:pl-[5px] md:pl-[25px]">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pt-1 mt-6 bg-white rounded-xl shadow-md">
          <div className="flex flex-row justify-between">
            <div className="w-full flex">
              <h1 className="text-2xl  px-3 sm:px-[40px] py-3">All Events</h1>
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

          <div style={{  overflowY: "auto" }}>
            <Table
              columns={columns.filter((column) => visibleColumns[column.key])}
              dataSource={data}
              pagination={{ pageSize: 10 }}
              style={{ scrollbarWidth: "none", overflowX: "auto" }}
            />
          </div>
          <Modal
            title="Edit Event"
            visible={editModalVisible}
            onOk={handleEditModalOk}
            onCancel={handleEditModalCancel}
            okText="Save Changes"
            cancelText="Cancel"
            okButtonProps={{
              className: "custom-ok-button-class rounded-2xl",
            }}
            cancelButtonProps={{
              className: "custom-cancel-button-class rounded-2xl",
            }}
          >
            <div>
              <label htmlFor="productName">Product Name</label>
              <Input
                value={editedEventName}
                onChange={(e) => setEditedEventName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Price">Price</label>
              <Input
                type="number"
                value={editedEventPrice}
                onChange={(e) => setEditedEventPrice(e.target.value)}
                placeholder="Product Price"
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Stock">Stock</label>
              <Input
                type="number"
                value={editedEventStock}
                onChange={(e) => setEditedEventStock(e.target.value)}
                placeholder="Product Stock"
                style={{ width: "100%" }}
              />
            </div>
          </Modal>
          <Modal
            title="Confirm Deletion"
            visible={deleteModalVisible}
            onOk={handleDeleteConfirmed}
            onCancel={handleDeleteCanceled}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className: "custom-ok-button-class rounded-2xl",
              style: { backgroundColor: "#006665", color: "#fff" },
            }}
            cancelButtonProps={{
              className: "custom-cancel-button-class rounded-2xl",
            }}
          >
            <p>Are you sure you want to delete this event?</p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AllEvents;
