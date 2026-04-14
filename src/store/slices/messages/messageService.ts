import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MessageOut } from "../../../types/message/MessageType";
import axiosClient from "../../../service/axiosClient";
import { getUserService } from "../../../service/authService";

type AddMessagePayload = {
    message: { content: string };
    chatId: string;
};

export const addMessageService = createAsyncThunk<any[], AddMessagePayload, { rejectValue: string }>(
    "messages/addMessage",
    async ({ message, chatId }, thunkAPI) => {
        try {
            const user = await getUserService();
            const curMessage = { ...message, sender_id: user.id};
            const res = await axiosClient.post<MessageOut>(`/message/${chatId}/message` , curMessage);
            return [curMessage, res.data ];
        } catch (error : any) {
            return thunkAPI.rejectWithValue(error.response.data.detail);
        }
    }
);

export const getHistoryService = createAsyncThunk<MessageOut[], string, { rejectValue: string }>(
    "messages/getHistory",
    async (id, thunkAPI) => {
        try {
            const res = await axiosClient.get<MessageOut[]>(`/message/${id}/history`);
            console.log(res.data , "is the response from get history");
            return res.data;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(error.response.data.detail);
        }
    }
);