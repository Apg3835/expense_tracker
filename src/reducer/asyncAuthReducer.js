import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuthServices from "../Components/services/apiAuthServices";

export const userSignUpAction = createAsyncThunk(
  "userSignUpAction",
  async (credential) => {
    // console.log(2, credential);
    const response = await apiAuthServices.signUp(credential);
    // console.log(5, response);
    return response;
  }
);
export const userSignInAction = createAsyncThunk(
  "userSignInAction",
  async (credential, thunk) => {
    // console.log(2, credential);
    const response = await apiAuthServices.signIn(credential);
    // console.log(5, response);
    setTimeout(() => {
      thunk.dispatch(getUserDataAction());
    }, 1000);
    return response;
  }
);
export const userForgotPasswordAction = createAsyncThunk(
  "userForgotPasswordAction",
  async (credential) => {
    // console.log(2, credential);
    const response = await apiAuthServices.forgotPassword(credential);
    // console.log(5, response);
    return response;
  }
);
export const getUserDataAction = createAsyncThunk(
  "getUserDataAction",
  async () => {
    const response = await apiAuthServices.getUserData();
    // console.log(5, response);
    return response;
  }
);
export const updateUserProfileAction = createAsyncThunk(
  "updateUserProfileAction",
  async (credential) => {
    // console.log(2, credential);
    const response = await apiAuthServices.updateUserData(credential);
    // console.log(5, response);
    return response;
  }
);
