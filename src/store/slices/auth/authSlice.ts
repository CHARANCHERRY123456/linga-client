import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService , signupService } from "./authService";


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
          console.log("Login fulfilled", action.payload);
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        })
      .addCase(loginService.rejected, (state, action) => {
        console.log("Login rejected", action.payload, action.error);
        state.loading = false;
        state.error = action.payload;
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
      })
      .addCase(signupService.rejected, (state, action) => {
        console.log("Signup rejected", action.payload, action.error);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
