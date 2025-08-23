import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../service/axiosClient";
import { getUserService } from "../../../service/authService";
import type { User } from "../../../types/auth/authSliceTypes";
import type { 
    ConversationCreatePayload,
    ConversationOut,
    ConversationState
} from "../../../types/conversation/ConversationTypes";

const initialState: ConversationState = {
    conversations: [],
    currentId: null,
    loading: false,
    error: null
};

export const fetchConversations = createAsyncThunk<
    ConversationOut[], // its return type
    void, // argument type
    { rejectValue: string } // when rejected use this
>(
    "conversation/fetchConversations",
    async (_ , thunkAPI) => {
        try {
            const user : User = await getUserService();
            const res = await axiosClient.get("conversation/" + user.id);
            return res.data;

        } catch (error : any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch conversations"
            );
        }
    }
);

export const createConversation = createAsyncThunk<
    ConversationOut,
    ConversationCreatePayload,
    { rejectValue: string }
>(
    "conversation/createConversation",
    async (payload : ConversationCreatePayload , thunkAPI) => {
        try {
            const user : User = await getUserService();
            const res = await axiosClient.post<ConversationOut>("conversation" ,{  ...payload , user_id: user.id });
            return res.data;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create conversation"
            );
        }
    }
);

export const deleteConversation = createAsyncThunk<
    {id : string}, // return type
    string, // argument type
    { rejectValue: string }
>(
    "conversation/deleteConversation",
    async (conversationId : string , thunkAPI)  => {
        try {
            const res = await axiosClient.delete("conversations/" + conversationId);
            return res.data;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete conversation"
            );
        }
    }
);


const slice = createSlice({
    name : "conversation",
    initialState,
    reducers: {
        setCurrentConversationId(state, action : {payload : string} ) {
            state.currentId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                
                state.loading = false;
                state.conversations = action.payload;
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createConversation.fulfilled, (state, action) => {
                state.conversations.push(action.payload);
            })
            .addCase(deleteConversation.fulfilled, (state, action) => {
                state.conversations = state.conversations.filter(
                    (convo) => convo._id !== action.payload.id
                );
            });
    }
});

export const {setCurrentConversationId} = slice.actions;
const conversationReducer = slice.reducer;
export default conversationReducer;
