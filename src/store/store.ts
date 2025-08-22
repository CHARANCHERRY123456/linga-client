import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth/authSlice";

export const store  = configureStore({
    reducer : {
        auth : authSliceReducer
    }
})