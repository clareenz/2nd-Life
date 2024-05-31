import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Space, Modal, Button, Select } from "antd";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const { Option } = Select;

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${server}/withdraw/get-all-withdraw-request`, {
        withCredentials: true,
      });
      setData(response.data.withdraws);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (record) => {
    setOpen(true);
    setWithdrawData(record);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
          status: withdrawStatus,
        },
        { withCredentials: true }
      );
      toast.success("Withdraw request updated successfully!");
      setOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating withdraw request:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Withdraw Id",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Shop Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Shop Id",
      dataIndex: "shopId",
      key: "shopId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Request given at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Update Status",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.status === "Processing" && (
            <BsPencil
              size={20}
              className="cursor-pointer"
              onClick={() => handleUpdate(record)}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-white">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          loading={loading}
          scroll={{ x: "max-content" }}
        />
      </div>
      <Modal
        title="Update Withdraw status"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Update
          </Button>,
        ]}
      >
        <div className="flex items-center justify-center">
          <Select
            style={{ width: 200, marginRight: 16 }}
            value={withdrawStatus}
            onChange={(value) => setWithdrawStatus(value)}
          >
            <Option value="Processing">Processing</Option>
            <Option value="Succeed">Succeed</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default AllWithdraw;
