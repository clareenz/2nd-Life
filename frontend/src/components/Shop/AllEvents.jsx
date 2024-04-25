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
      render: (text, record) => (
        <Link to={`/events/`}>
          <Button  icon={<AiOutlineEye />} size={15} />
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
          <AiOutlineEdit size={15} />
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "Delete",
      width: 120,
      align: "center",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.id)}>
          <AiOutlineDelete size={15} />
        </Button>
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
                className="custom-input rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Price">Price</label>
              <Input
                type="number"
                value={editedEventPrice}
                onChange={(e) => setEditedEventPrice(e.target.value)}
                placeholder="Product Price"
                style={{ width: "100%" }} // Adjust the width of the input number
                className="custom-input rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Stock">Stock</label>
              <Input
                type="number"
                value={editedEventStock}
                onChange={(e) => setEditedEventStock(e.target.value)}
                placeholder="Product Stock"
                style={{ width: "100%" }} // Adjust the width of the input number
                className="custom-input rounded-2xl"
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AllEvents;
