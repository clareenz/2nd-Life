import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
import Loader from "../Layout/Loader";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  };

  const columns = [
    { title: "Product Id", dataIndex: "id", key: "id", width: 150, align: "center" },
    { title: "Name", dataIndex: "name", key: "name", width: 180, align: "center" },
    { title: "Price", dataIndex: "price", key: "price", width: 100, align: "center" },
    { title: "Stock", dataIndex: "stock", key: "stock", width: 80, align: "center" },
    { title: "Sold out", dataIndex: "sold", key: "sold", width: 130, align: "center" },
    {
      title: "Preview",
      key: "preview",
      width: 100,
      align: "center",
      render: (text, record) => (
        <Link to={`/events/`}>
          <Button  icon={<AiOutlineEye />} size="small" />
        </Link>
      ),
    },
    {
      title: "Delete",
      key: "delete",
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
        </div>
      )}
    </>
  );
};

export default AllEvents;
