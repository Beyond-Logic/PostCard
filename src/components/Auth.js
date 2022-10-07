/** @format */

import React, { useState } from "react";
import { GiPadlock } from "react-icons/gi";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import Input from "./Input";
import { signin, signup } from "../actions/auth";
import { AUTH } from "../constants/actionTypes";
import { Toaster } from "react-hot-toast";

// "proxy": "http://localhost:5000",
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  let router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, router));
    } else {
      dispatch(signin(formData, router));
     
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  let navigate = useNavigate();

  const googleSuccess = async (res) => {
    const result = jwt_decode(res.credential);
    const token = res.credential;
    console.log(result);
    console.log(token);
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <div>
      <Toaster />
      <div className="shadow-xl flex flex-col justify-center  md:w-1/2 xl:w-1/3 m-auto mt-20 mb-20">
        <div className="flex flex-col justify-center items-center text-center mt-4 mb-8">
          <GiPadlock size={40} color="red" />
          <h3 className="text-2xl mt-4">{isSignup ? "Sign Up" : "Sign In"}</h3>
        </div>
        <div>
          <div>
            <div className="px-10 mb-10">
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    type="text"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    type="text"
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
                autoFocus
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                half
                pw={showPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                  handleShowPassword={handleShowPassword}
                  half
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="flex flex-col justify-center items-center bg-blue-800 text-base text-white  px-4 text-center py-2 rounded-md w-[83%] m-auto mt-5 mb-2"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
            <div className="flex flex-col justify-center items-center px-4 text-center py-2 rounded-md w-full mt-5 mb-10">
              {" "}
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
            </div>
            <div className="">
              <div className="text-center mb-10">
                <button onClick={switchMode} type="button">
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
