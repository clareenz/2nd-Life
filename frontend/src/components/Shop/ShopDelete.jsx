import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { Modal } from "antd";
import ExclamationCircleOutlined from "@ant-design/icons";
import { deleteShop } from "../../redux/actions/sellers";

const ShopDelete = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const showDeleteModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    dispatch(deleteShop());
    setVisible(false);
    navigate("/");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full pt-[20px]">
        <p className="text-red-500 font-semibold mb-4 text-center">
          Warning: This action cannot be undone. Proceed with caution.
        </p>
        <button
          danger
          onClick={showDeleteModal}
          className={`mb-4 ${styles.button6} bg-[#006665] text-white hover:bg-[#FF8474]`}
        >
          Delete Account
        </button>
      </div>
      <Modal
        title="Delete Account"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          className: "custom-ok-button-class rounded-2xl",
        }}
        cancelButtonProps={{
          className: "custom-cancel-button-class rounded-2xl",
        }}
      >
        <div className="flex flex-col items-center">
          <ExclamationCircleOutlined className="text-5xl text-red-500 mb-4" />
          <p className="text-center">
            Are you sure you want to delete your account, {seller.name}?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ShopDelete;
