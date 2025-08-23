import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth/authSlice";
import { persistStore , persistReducer } from "redux-persist";
import conversationReducer from "./slices/conversation/conversationSlice";
import localStorage from "redux-persist/lib/storage";

const persistConfig = {
    key : "auth",
    storage: localStorage,
    whitelist : ["user" , "token" , "isAuthenticated"]
}

export const store  = configureStore({
    reducer : {
        auth : persistReducer(persistConfig, authSliceReducer),
        conversation : conversationReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);