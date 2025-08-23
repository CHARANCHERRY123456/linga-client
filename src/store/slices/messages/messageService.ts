import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MessageCreate , MessageOut } from "../../../types/message/MessageType";
import axiosClient from "../../../service/axiosClient";

export const addMessageService = createAsyncThunk(
    "messages/addMessage",
    async (message: MessageCreate , thunkAPI) => {
        try {
            const curid = thunkAPI.getState().chat.currentId;
            const res = await axiosClient.post<MessageOut>(`/message/${curid}/message` , message);
            return res.data;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(error.response.data.detail);
        }
    }
);

export const getHistoryService = createAsyncThunk(
    "messages/getHistory",
    async (thunkAPI) => {
        try {
            const curid = thunkAPI.getState().chat.currentId;
            const res = await axiosClient.get<MessageOut[]>(`/message/${curid}/message`);
            return res.data;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(error.response.data.detail);
        }
    }
);