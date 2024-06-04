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
            console.log(err);
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 text-center bg-white rounded-lg shadow-lg">
          {error ? (
            <div>
              <p className="text-xl font-semibold text-red-600">
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
              <p className="font-semibold ">
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
