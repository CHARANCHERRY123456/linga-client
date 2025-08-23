import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../store/slices/conversation/conversationSlice";
import CreateConversation from "./CreateConversation";

export default function ChatLayout() {

    const dispatch = useDispatch();
    const {conversation , conversationId} = useSelector(s=>s.conversation);
    console.log(conversation , conversationId);

    useEffect(() => {
        dispatch(fetchConversations() as any);  
    }, [conversationId]);

    return <>
        <h1>This is the conversation layout</h1>
        <CreateConversation />
    </>
}
