import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../service/authService";
import { type LoginReqType } from "../../types/authTypes";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials : LoginReqType , thunkAPI) => {
    try {
      let res=await loginService(credentials);
      return res
    } catch (error) {
      console.log(error);
      
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
          console.log("Login fulfilled", action.payload);
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        })
      .addCase(login.rejected, (state, action) => {
        console.log("Login rejected", action.payload, action.error);
        state.loading = false;
        state.error = action.payload;
      }); 
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
