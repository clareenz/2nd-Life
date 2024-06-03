import React from "react";
import Signup from "../components/Signup/Signup.jsx";
import { Header2 } from "../components/Layout/Header.jsx";
import { Footer } from "../components/Layout/Footer.jsx";
const SignupPage = () => {
  return (
    <div>
      <Header2 />
      <div>
        <Signup />
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
