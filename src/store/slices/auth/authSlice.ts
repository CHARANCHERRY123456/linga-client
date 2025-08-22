import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService , signupService } from "./authService";
import { toast } from "react-toastify";


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
      .addCase(loginService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginService.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          toast.success("Login successful")
        })
      .addCase(loginService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
        toast.error(action.payload || "Login failed");
      })
      .addCase(signupService.pending , (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupService.fulfilled, (state, action) => {
        console.log("Signup fulfilled", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        toast.success("Signup successful");
      })
      .addCase(signupService.rejected, (state, action) => {
        console.log("Signup rejected", action.payload, action.error);
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Signup failed");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
