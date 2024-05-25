import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [payProcess, setPayProcess] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  const createSource = async (orderData, user) => {
    try {
      const response = await axios.post(
        "https://api.paymongo.com/v1/sources",
        {
          amount: orderData?.totalPrice * 100, // Convert to cents
          redirect: {
            success: "http://localhost:3000/order/success",
            failed: "http://localhost:3000/payment",
          },
          billing: {
            address: { country: "PH" },
            name: user.name,
            phone: user.phoneNumber,
            email: user.email,
          },
          type: "gcash",
          currency: "PHP",
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Basic ${btoa(process.env.PAYMONGO_PUBLIC_KEY)}`,
          },
        }
      );
  
      return response.data.data.attributes.redirect.checkout_url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

  const onPayment = async (event) => {
    event.preventDefault();
    try {
        const checkoutUrl = await createSource(orderData, user);
        window.open("https://test-sources.paymongo.com/sources?id=src_nTHcXASe3osLAfNpwuXqZJ2f");
    } catch (error) {
        console.error("Error creating source:", error);
    }
};


  //Retrieve Source
  const listenToPayment = async () => {
    const sourceId = "src_nTHcXASe3osLAfNpwuXqZJ2f";
    try {
      for (let i = 5; i > 0; i--) {
        setPaymentStatus(`Listening to Payment in ${i}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (i === 1) {
          const response = await axios.get(
            `https://api.paymongo.com/v1/sources/${sourceId}`,
            {
              headers: {
                accept: "application/json",
                authorization: `Basic ${btoa(process.env.PAYMONGO_SECRET_KEY)}`,
              },
            }
          );

          const sourceData = response.data;
          console.log(sourceData);

          if (sourceData.attributes.status === "failed") {
            setPaymentStatus("Payment Failed");
          } else if (sourceData.attributes.status === "paid") {
            setPaymentStatus("Payment Success");
          } else {
            i = 5;
            setPayProcess(sourceData.attributes.status);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
  createSource,
  listenToPayment,
  onPayment,
}) => {
  const [select, setSelect] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 mb-2 border-b">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="flex w-full border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="flex w-full pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`${styles.input} !w-[95%] text-[#444]`}
                    value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex w-full pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`${styles.button} hover:bg-[#333] hover:text-[#fff] hover:scale-105 transition duration-300 ease-in-out cursor-pointer`}
              />
            </form>
          </div>
        ) : null}
      </div>

      {/* paypal */}
      <div>
        <div className="flex w-full pb-5 mb-2 border-b">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f0f0f0] hover:scale-105 transition duration-300 ease-in-out cursor-pointer`}
            >
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "Ab5ly5HFdDN-a3Hk9qibfrVYQu3Rz_JEZpRHsc1YXlvZ-B5aQzyfyNZ2aiIDff9Knm43T54nMiCC5bIH",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  onApprove={onApprove}
                  createOrder={createOrder}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        ) : null}
      </div>

      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 mb-2 border-b">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {select === 3 ? (
          <div className="w-full flex border-b">
            <div className="w-full flex">
              <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                <input
                  type="submit"
                  value="Confirm"
                  className={`${styles.button} hover:bg-[#333] hover:text-[#fff] hover:scale-105 transition duration-300 ease-in-out cursor-pointer`}
                />
              </form>
            </div>
          </div>
        ) : null}
      </div>

      {/* GCash */}
      <div>
        <div className="flex w-full pb-5 mb-2 border-b">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(4)}
          >
            {select === 4 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with GCash
          </h4>
        </div>

        {select === 4 ? (
          <div className="w-full flex border-b">
            <div className="w-full flex">
              <form className="w-full" onSubmit={onPayment}>
                <div className="flex w-full pb-3">
                  <div className="w-[50%]">
                    <label className="block pb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Mc Clareenz Zerrudo"
                      className={`${styles.input} !w-[95%] text-[#444]`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="09XXXXXXXXX"
                      className={`${styles.input} !w-[95%] text-[#444]`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex w-full pb-3">
                  <div className="w-[50%]">
                    <label className="block pb-2">Email</label>
                    <input
                      type="email"
                      placeholder="abcde@domain.com"
                      className={`${styles.input} !w-[95%] text-[#444]`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className={`${styles.button} hover:bg-[#333] hover:text-[#fff] hover:scale-105 transition duration-300 ease-in-out cursor-pointer`}
                />
              </form>
            </div>
          </div>
        ) : null}
      </div>

      {open ? (
        <div className="w-full h-screen fixed top-0 left-0 bg-[#0000004b] z-[2000] flex items-center justify-center">
          <div className="w-[35%] h-[80vh] bg-[#fff] shadow rounded-md relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full">
              <PaymentInfo
                user={user}
                createSource={createSource}
                listenToPayment={listenToPayment}
                onPayment={onPayment}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          Php{orderData?.subTotalPrice}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">Php{shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between pb-3 border-b">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        Php{orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
