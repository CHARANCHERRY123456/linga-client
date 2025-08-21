// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { BASE_URL } from "../config/envConfig";
// import axiosClient from "../api/axiosClient";

// const initialState = {
//     accessToken: null,
//     user: null,
//     isAuthenticated: null,
//     loading: false,
//     error: null,
// };

// // AsyncThunks writing seperately ,bcos it cannot be directly supported in redux
// export const login = createAsyncThunk(
//     "auth/login",
//     async (Credentials) => {
//         const res = await axios.post(`${BASE_URL}`)
//     }
// )

// const authSlice = createSlice