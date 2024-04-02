import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(seller && seller.description ? seller.description : "");
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await axios.put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(loadSeller());
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
          password,
        },
        { withCredentials: true }
      );
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
  
      const sellerId = seller._id;
      await axios.put(`${server}/product/update-shop-products`, {
        sellerId,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5 shadow-sm bg-white p-6 h-[80vh] rounded-2xl">
        <div className="flex items-center justify-center w-full">
          <div className="relative ">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}/${seller.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        <br/>
        {/* shop info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="flex w-full justify-between">
            <div className="w-[48%]">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Name</label>
              </div>
              <input
                type="name"
                placeholder={`${seller.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4`}
                required
              />
            </div>
            <div className="w-[48%]">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop description</label>
              </div>
              <input
                type="name"
                placeholder={`${
                  seller?.description
                    ? seller.description
                    : "Enter your shop description"
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4`}
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="w-[48%]">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Address</label>
              </div>
              <input
                type="name"
                placeholder={seller?.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4`}
                required
              />
            </div>
            <div className="w-[48%]">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Phone Number</label>
              </div>
              <input
                type="number"
                placeholder={seller?.phoneNumber}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4`}
                required
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="w-[48%]">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Zip Code</label>
              </div>
              <input
                type="number"
                placeholder={seller?.zipCode}
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4`}
                required
              />
            </div>
            <div className="w-[48%]">
              <label className="block pb-2">Enter your password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${styles.input} !w-[95%] mb-1 shadow-sm`}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute transform -translate-y-1/2 top-4 right-8"
                  onClick={() => togglePasswordVisibility("showPassword")}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={17} />
                  ) : (
                    <AiOutlineEye size={17} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="w-[100%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.button6} w-[50%] mb-2 rounded-3xl hover:text-[#006665] hover:border-[#006665] border-[#61AFAC] text-[#61AFAC] flex justify-center`}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
