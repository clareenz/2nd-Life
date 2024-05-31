import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/user";
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
  message,
} from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        message.error("Failed to delete user.");
      });

    dispatch(getAllUsers());
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
    email: true,
    role: true,
    joinedAt: true,
    action: true,
  });

  const columns = [
    {
      title: "User ID",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      align: "center",
      ...getColumnSearchProps("email"),
      filters: [
        { text: "A", value: "A" },
        { text: "B", value: "B" },
        // Add more filters as needed
      ],
      onFilter: (value, record) => record.email.startsWith(value),
      sorter: (a, b) => a.name.localeCompare(b.email),
      render: visibleColumns.email ? (text) => text : null,
    },
    {
      title: "User Role",
      dataIndex: "role",
      key: "role",
      width: 150,
      align: "center",
      ...getColumnSearchProps("role"),
      sorter: (a, b) => a.role - b.role,
      render: visibleColumns.role ? (text) => text : null,
    },
    {
      title: "Joined At",
      dataIndex: "joinedAt",
      key: "joinedAt",
      width: 150,
      align: "center",
      ...getColumnSearchProps("joinedAt"),
      sorter: (a, b) => a.joinedAt - b.joinedAt,
      render: visibleColumns.joinedAt ? (text) => text : null,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center",
      render: visibleColumns.action
        ? (text, record) => (
            <Button
              icon={<AiOutlineDelete size={20} />}
              onClick={() => {
                setUserId(record.id);
                setOpen(true);
              }}
            />
          )
        : null,
    },
  ];

  const data = users ? users.map((user) => ({
    key: user._id,
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    joinedAt: user.createdAt.slice(0, 10),
  })) : [];

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
      <div className="flex flex-row">
        <div className="w-full flex justify-between">
          <h3 className="text-2xl px-[40px] py-3">All Users</h3>
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
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
      <Modal
        title="Confirm Deletion"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
          Are you sure you want to delete this user?
        </h3>
        <div className="w-full flex items-center justify-center">
          <Button
            className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
            onClick={() => {
              setOpen(false);
              handleDelete(userId);
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>  
  );
};

export default AllUsers;
