import React, { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { server } from "../../server";

const ShopDelete = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [shopName, setShopName] = useState("");
  const [customReason, setCustomReason] = useState(false);
  const [shopId, setShopId] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const showDeleteModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/shop/check-shop-exists`, {
        email,
      });

      if (!data.shopId) {
        alert("Shop not found.");
        return;
      }

      setShopName(data.shopName);
      setShopId(data.shopId);
      setVisible(true);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while checking the shop.");
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    if (!confirmed || !reason.trim()) {
      alert("Please confirm your shop and fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/shop/request-delete-shop`, {
        shopId,
        reason,
      });
      alert(data.message);
      setVisible(false);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    setCustomReason(e.target.value === "Other");
  };

  const confirmShop = () => {
    setConfirmed(true);
    setVisible(true);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full pt-20">
        <p className="text-red-500 font-semibold mb-4 text-center">
          Warning: This action cannot be undone. Proceed with caution.
        </p>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 px-4 h-10 border custom-input min-w-[35%] rounded-full"
        />
        <button
          onClick={handleEmailSubmit}
          className="bg-[#006665] text-white hover:bg-[#FF8474] py-2 px-4 rounded-full"
        >
          Request Account Deletion
        </button>
      </div>
      <Modal
        title="Request Account Deletion"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        {confirmed ? (
          <div className="flex flex-col items-center">
            <p className="text-center">
              Are you sure you want to request the deletion of your account, {shopName}?
            </p>
            <select
              className="mt-4 p-2 borderpx-3 py-1 border w-full rounded-2xl custom-select1 hover:border-[#006665] focus:border-[#006665]"
              value={reason}
              onChange={handleReasonChange}
            >
              <option value="" disabled>
                Select Reason
              </option>
              <option value="Reason 1">Retirement, career change, or other personal reasons</option>
              <option value="Reason 2">financially viable</option>
              <option value="Reason 3">Issues with the e-commerce platform</option>
              <option value="Reason 5">Moving to another e-commerce platform</option>
              <option value="Reason 6">Negative customer feedback</option>
              <option value="Other">Other</option>
            </select>
            {customReason && (
              <textarea
                placeholder="Reason for deletion"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-4 p-2 border hover:border-[#006665] focus:border-[#006665] rounded-md w-full"
                rows={4}
              ></textarea>
            )}
            <button
              onClick={handleOk}
              className="mt-4 bg-[#006665] text-white hover:bg-[#FF8474] py-2 px-4 rounded-full"
            >
              Confirm Deletion
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-center">
              Please confirm that you want to request the deletion of your account associated with {shopName}.
            </p>
            <button
              onClick={confirmShop}
              className="mt-4 bg-[#006665] text-white hover:bg-[#FF8474] py-2 px-4 rounded-full"
            >
              Confirm Shop
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ShopDelete;
