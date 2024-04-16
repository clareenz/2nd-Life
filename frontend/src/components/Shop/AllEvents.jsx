import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Input, InputNumber } from "antd";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEventsShop, deleteEvent, updateEvent } from "../../redux/actions/event"; // Import updateEvent
import Loader from "../Layout/Loader";

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

  const handleEdit = (record) => {
    setEditedEvent({ ...record, eventId: record.id });
    setEditedEventName(record.name);
    setEditedEventPrice(record.price);
    setEditedEventStock(record.stock);
    setEditModalVisible(true);
  };

  const handleEditModalOk = async () => {
    const updatedEvent = { ...editedEvent, name: editedEventName, price: editedEventPrice, stock: editedEventStock };
    await dispatch(updateEvent(updatedEvent.eventId, updatedEvent)); // Wait for the update operation to complete
    setEditModalVisible(false);
    // Fetch the updated event list again after the update operation is completed
    dispatch(getAllEventsShop(seller._id));
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  const columns = [
    { title: "Product Id", dataIndex: "id", key: "id", width: 150, align: "center" },
    { title: "Name", dataIndex: "name", key: "name", width: 180, align: "center" },
    { title: "Price", dataIndex: "price", key: "price", width: 100, align: "center" },
    { title: "Stock", dataIndex: "stock", key: "stock", width: 80, align: "center" },
    { title: "Sold out", dataIndex: "sold", key: "sold", width: 130, align: "center" },
    {
      title: "Preview",
      key: "Preview",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Link to={`/product/${record.name.replace(/\s+/g, "-")}`}>
          <Button  icon={<AiOutlineEye />} size="small" />
        </Link>
      ),
    },
    {
      title: "Edit",
      key: "Edit",
      width: 120,
      align: "center",
      render: (text, record) => (
        <Button onClick={() => handleEdit(record)}>
          <AiOutlineEdit size={20} />
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "Delete",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Button type="danger" icon={<AiOutlineDelete />} size="small" onClick={() => handleDelete(record.id)} />
      ),
    },
  ];

  const data = events ? events.map((item) => ({
    id: item._id,
    name: item.name,
    price: `Php ${item.discountPrice}`,
    stock: item.stock,
    sold: 10,
  })) : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white rounded-xl shadow-md">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            style={{scrollbarWidth: "none", overflowY: "auto"}}
          />
          <Modal
            title="Edit Event"
            visible={editModalVisible}
            onOk={handleEditModalOk}
            onCancel={handleEditModalCancel}
          >
            <Input
              value={editedEventName}
              onChange={(e) => setEditedEventName(e.target.value)}
              placeholder="Event Name"
            />
            <InputNumber
              value={editedEventPrice}
              onChange={(value) => setEditedEventPrice(value)}
              placeholder="Event Price"
            />
            <InputNumber
              value={editedEventStock}
              onChange={(value) => setEditedEventStock(value)}
              placeholder="Event Stock"
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default AllEvents;
