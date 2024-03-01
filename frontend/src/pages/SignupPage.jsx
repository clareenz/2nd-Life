import React from 'react'
import Signup from "../components/Signup/Signup.jsx"
import  {Header2}  from "../components/Layout/Header.jsx"
import { Footer2 } from '../components/Layout/Footer.jsx'
const SignupPage = () => {
  return (
    <div>
        <Header2/>
        <Signup/>
        <Footer2/>
    </div>
  )
}

export default SignupPage