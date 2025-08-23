// // change the name to conversationSlice

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosClient from "../../../service/axiosClient";
// import { getUserService } from "../../../service/authService";
// import type { User } from "../../../types/auth/authSliceTypes";
// import type { CreateConversation, CreateConversationOut } from "../../../types/conversation/ConversationTypes";


// type Chat = {
//     id : string ,
//     title : string,
//     last_message? : string | null
// }


// type ChatState = {
//     conversations : Chat[],
//     currentid : string,
//     loading : boolean,
//     error : string | null
// }

// const initialState: ChatState = {
//     conversations: [],
//     currentid: "",
//     loading: false,
//     error: null
// };

// export const fetchConversations = createAsyncThunk(
//     "conversation/fetchConversations",
//     async (_ , thunkAPI) => {
//         try {
//             const user : User = await getUserService();
//             const res = await axiosClient.get("conversations/" + user.id);
//             return res.data;
            
//         } catch (error) {
//             return thunkAPI.rejectWithValue(
//                 error.response?.data?.message || "Failed to fetch conversations"
//             );
//         }
//     }
// );

// export const createConversation = createAsyncThunk(
//     "conversation/createConversation",
//     async (payload : CreateConversation , thunkAPI) : Promise<CreateConversationOut> => {
//         try {
//             const user : User = await getUserService();
//             const res = await axiosClient.post("conversations" ,{  ...payload , user_id: user.id });
//             return res.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(
//                 error.response?.data?.message || "Failed to create conversation"
//             );
//         }
//     }
// );

// export const deleteConversation = createAsyncThunk(
//     "conversation/deleteConversation",
//     async (conversationId : string , thunkAPI)  => {
//         try {
//             const res = await axiosClient.delete("conversations/" + conversationId);
//             return res.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(
//                 error.response?.data?.message || "Failed to delete conversation"
//             );
//         }
//     }
// );


// const slice = createSlice({
//     name : "conversation",
//     initialState,
//     reducers: {
//         setCurrentConversationId(state, action) {
//             state.currentid = action.payload;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchConversations.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchConversations.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.conversations = action.payload;
//             })
//             .addCase(fetchConversations.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(createConversation.fulfilled, (state, action) => {
//                 state.conversations.push(action.payload);
//             })
//             .addCase(deleteConversation.fulfilled, (state, action) => {
//                 state.conversations = state.conversations.filter(
//                     (convo) => convo.id !== action.payload.id
//                 );
//             });
//     }
// });

// export const {setCurrentConversationId} = slice.actions;
// const conversationReducer = slice.reducer;
// export default conversationReducer;
