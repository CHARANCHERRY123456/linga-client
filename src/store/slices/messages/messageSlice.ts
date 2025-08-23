import { createSlice } from "@reduxjs/toolkit";
import { addMessageService ,getHistoryService } from "./messageService";


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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addMessageService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMessageService.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push(action.payload);
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
                state.messages = action.payload || [];
            })
            .addCase(getHistoryService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ayya mee history balayya kooda cheppalekunaadu";
            });
    }
})

export const { clearMessagesState } = messageSlice.actions;
const messageSliceReducer = messageSlice.reducer;
export default messageSliceReducer;