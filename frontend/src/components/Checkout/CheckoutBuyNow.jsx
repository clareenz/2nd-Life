import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { getProductById } from "../../redux/actions/product";
import { message } from "antd";

const CheckoutBuyNow = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isLoading, error, product } = useSelector((state) => state.products);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [cart,setCart] = useState([]);
  useEffect(() => {
    // Dispatch action to get product by its ID
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  // Update cart when product changes
  useEffect(() => {
    if (product) {
      // Update cart with product information
      setCart([{ ...product, qty: 1 }]);
    }
  }, [product]);
  window.scrollTo(0, 0);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // Calculate subtotal based on prices of products in cart
  const subTotalPrice = product?.discountPrice

  const discountPercentage = couponCodeData ? discountPrice : "";

  const shipping = 0;
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const paymentSubmit = async () => {
    if (!address || !zipCode || !country || !province || !city) {
      message.error("Please choose your delivery address!");
      return;
    }

    const shippingAddress = {
      address,
      zipCode,
      country,
      province,
      city,
    };

    const orderData = {
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
      cart,
    };

    const checkoutData = {
      name: user?.name,
      email: user?.email,
      phone: user?.phoneNumber,
      address: {
        postalCode: zipCode,
        state: province,
        city: city,
        line2: address,
        country,
      },
      lineItems: cart, // Add qty field to product
      successUrl: "https://2ndlife-namstech.vercel.app/order/success",
      cancelUrl: "https://2ndlife-namstech.vercel.app/",
    };
    

    try {
      const response = await axios.post(
        `${server}/payment/create-checkout-session`,
        checkoutData
      );
      console.log(response.data);
      // Handle the response, for example, redirect the user to the PayMongo checkout page
      message.success(response.data.message);
      const checkout_url = response.data.response.data.attributes.checkout_url;
      const checkoutId = response.data.response.data.id;
      console.log(checkoutId);
      createOrder(checkoutId, orderData, shippingAddress);
      window.location.href = checkout_url;
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const createOrder = async (checkoutID, orderData, shippingAddress) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const order = {
      cart: orderData?.cart,
      shippingAddress: shippingAddress,
      user: user && user,
      totalPrice: orderData?.totalPrice,
      paymentInfo: {
        id: checkoutID,
        status: "not paid",
        type: "Paymongo",
      },
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        console.log(res.data.orders);
        localStorage.setItem("cartItems", JSON.stringify([]));
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    try {
      const { data } = await axios.get(
        `${server}/coupon/get-coupon-value/${name}`
      );
      const shopId = data.couponCode?.shopId;
      const couponCodeValue = data.couponCode?.value;
      if (data.couponCode && product.shopId === shopId) {
        const discountPrice = (product.discountPrice * couponCodeValue) / 100;
        setDiscountPrice(discountPrice);
        setCouponCodeData(data.couponCode);
        setCouponCode("");
      } else {
        message.error("Coupon code is not valid for this product.");
        setCouponCode("");
      }
    } catch (error) {
      message.error("Invalid coupon code.");
      setCouponCode("");
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-8 ">
      <div className="w-[90%] 1000px:w-[80%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            province={province}
            setProvince={setProvince}
            city={city}
            setCity={setCity}
            address={address}
            setAddress={setAddress}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPrice={discountPrice}
          />
        </div>
      </div>
      <div
        className={`${styles.button1} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  province,
  setProvince,
  city,
  setCity,
  address,
  setAddress,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-2xl p-5 pb-8 shadow">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`px-3 !w-[95%] border h-[30px] rounded-full focus:border-[#006665]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`px-3 !w-[95%] border h-[30px] rounded-full focus:border-[#006665]`}
            />
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className="px-3 !w-[95%] border h-[30px] rounded-full focus:border-[#006665]"
              min="0"
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`px-3 !w-[95%] border h-[30px] rounded-full focus:border-[#006665]`}
              min="0"
            />
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] px-3 border h-[30px] rounded-full custom-select1 hover:border-[#006665] focus:border-[#006665]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Province</label>
            <select
              className="w-[95%] px-3 border h-[30px] rounded-full custom-select1 hover:border-[#006665] focus:border-[#006665]"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your Province
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">City/Municipality</label>
            <input
              type="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className={`px-3 !w-[95%] border h-[30px] rounded-full focus:border-[#006665]`}
            />
          </div>

          <div className="w-[50%]">
            <label className="block pb-2">Barangay/Street/House Number</label>
            <input
              type="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`px-3 !w-[95%] border h-[30px] rounded-full focus:border-[#006665]`}
            />
          </div>
        </div>
      </form>
      <h5 className="text-[15px] cursor-pointer inline-block pt-1">
        Choose From Saved Address
      </h5>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPrice,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-2xl p-5 pb-8 shadow">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">₱{subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">₱{shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between pb-3 border-b">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPrice ? "₱" + discountPrice.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">₱{totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] px-3`}
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`${styles.button4} mt-8 w-full`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default CheckoutBuyNow;
