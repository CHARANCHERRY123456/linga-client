import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../store/slices/conversation/conversationSlice";
import CreateConversation from "./CreateConversation";
import type { ConversationOut } from "../../types/conversation/ConversationTypes";

export default function ChatLayout() {

    const dispatch = useDispatch();
    const {conversations ,currentId , loading ,error } = useSelector(s=>s.conversation);

    console.log(conversations , currentId , loading , error);


    useEffect(() => {
        dispatch(fetchConversations());  
    }, [currentId]);

    return  <>
        <h1>This is the conversation layout</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {conversations && (
            <ul>
                {conversations.map((convo: ConversationOut) => (
                    <li key={convo._id}>{convo.title}</li>
                ))}
            </ul>
        )}
        <CreateConversation />
    </>
}
