import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          {error ? (
            <div>
              <p className="text-red-600 text-xl font-semibold">
                Your token is expired!
              </p>
              <div>
                <span className="text-[13px] text-gray-500">
                  Resend tokens are not yet available. Please try again.
                </span>
              </div>{" "}
              <Link to="/sign-up">
                <button className="mt-4 px-4 py-2 bg-[#006665] text-white rounded-full hover:bg-[#FF8474] transition-all">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <>
              <p className=" font-semibold">
                Your account has been created successfully!
              </p>
              <Link to="/login">
                <button className="mt-4 px-4 py-2 bg-[#006665] text-white rounded-full hover:bg-[#FF8474] transition-all">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;
