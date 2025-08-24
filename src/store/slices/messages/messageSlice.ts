import { createSlice } from "@reduxjs/toolkit";
import { addMessageService ,getHistoryService } from "./messageService";
import type { Message } from "../../../types/message/MessageType";


const messageSlice = createSlice({
    name : "message",
    initialState : {
        messages : [],
        loading : false,
        error : null
    },
    reducers: {
        clearMessagesState : (state) => {
            state.messages = [];
            state.loading = false;
            state.error = null;
        },
        addMessage : (state , action ) =>{
            state.messages.push(action.payload);
        },
        removeMessage: (state, action) => {
            state.messages = state.messages.filter(msg => msg._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addMessageService.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addMessageService.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload , "is the payload messages");
                // state.messages.concat(action.payload);
                state.messages = [...state.messages , ...action.payload];
            })
            .addCase(addMessageService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Orey babu nee message pani cheyyaledhu ra!";
            })
            .addCase(getHistoryService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHistoryService.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload ? [...action.payload].reverse() : [];
            })
            .addCase(getHistoryService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ayya mee history balayya kooda cheppalekunaadu";
            });
    }
})

export const { clearMessagesState , addMessage } = messageSlice.actions;
const messageSliceReducer = messageSlice.reducer;
export default messageSliceReducer;