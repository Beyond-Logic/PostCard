/** @format */

import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index";
import toast from "react-hot-toast";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    setTimeout(() => {
      toast.success("Login Successful");
    }, 1000);
    router("/");
  } catch (error) {
    console.log(error);
    toast.error("User doesn't exist");
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    router("/");
    setTimeout(() => {
      toast.success("Signup Successful");
    }, 1000);
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
