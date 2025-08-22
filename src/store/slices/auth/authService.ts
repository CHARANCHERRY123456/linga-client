import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../service/axiosClient";
import { type LoginReqType, type LoginResType } from "../../../types/authTypes";
import { user_token } from "../../../constants/localStorageConstants";


export const signupService = createAsyncThunk(
    "auth/signup",
    async (credentials: any, thunkAPI) => {
        try {
            let res = await axiosClient.post('/auth/signup', credentials);
            const backend_token = res.data.access_token;
            localStorage.setItem(user_token, backend_token);
            return res.data;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.detail || "Signup Failed"
            );
        }
    }
);

export const loginService = createAsyncThunk(
    "auth/login",
    async (credentials: LoginReqType, thunkAPI) => {
        try {
            let res = await axiosClient.post("/auth/login", credentials);
            const backend_token = res.data.access_token;
            localStorage.setItem(user_token, backend_token);
            return res.data;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

// token -> user
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem(user_token);
      let res = await axiosClient.get("/auth/user/" + token);
      return res.data;
    } catch (error : any ) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);