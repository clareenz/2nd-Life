import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { server } from "../../server";

const ReportSeller = () => {
  const [shopId, setShopId] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const shopIdFromUrl = searchParams.get("shopId");
    setShopId(shopIdFromUrl);
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    setMessage("");

    const data = {
      reason: reason === "Other" ? otherReason : reason,
    };

    try {
      const response = await axios.post(`${server}/report/report-shop/${shopId}`, data);
      setMessage(response.data.message);
      setReason('');
      setOtherReason('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessage('An error occurred while reporting the Shop.');
      }
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Report Shop
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="shopId"
              className="block text-left font-semibold text-gray-700 mb-2"
            >
              Seller ID
            </label>
            <input
              type="text"
              id="shopId"
              value={shopId}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-full h-11 text-sm bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="reason"
              className="block text-left font-semibold text-gray-700 mb-2"
            >
              Reason for Report
            </label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 text-sm h-11 custom-select1 rounded-full"
            >
              <option value="">Select a reason</option>
              <option value="Inappropriate image">Inappropriate image</option>
              <option value="Nudity">Nudity</option>
              <option value="Spam">Spam</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {reason === "Other" && (
            <div>
              <label
                htmlFor="otherReason"
                className="block text-left font-semibold text-gray-700 mb-2"
              >
                State your reason
              </label>
              <input
                type="text"
                id="otherReason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-full h-11 text-sm hover:border-[#006665] focus:border-[#006665]"
              />
            </div>
          )}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBackButtonClick}
              className="border hover:border-[#006665] rounded-full py-2 px-4 transition-all"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#006665] text-white py-2 px-4 rounded-full transition-all hover:bg-[#005652]"
            >
              Submit
            </button>
          </div>
        </form>
        {message && (
          <p className="text-green-600 mt-4 text-center">{message}</p>
        )}
        {errors.length > 0 && (
          <ul className="text-red-600 mt-4">
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportSeller;
