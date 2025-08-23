import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { addMessageService, getHistoryService } from "../store/slices/messages/messageService";
import { clearMessagesState } from "../store/slices/messages/messageSlice";

export default function ChatMessages() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { conversations } = useSelector(s => s.conversation);
    const [input , setInput] = useState("");
    const currentConversation = conversations.find(convo => convo._id === id);
    const { messages } = useSelector(s => s.message);
    console.log(messages , "from the store");
    
    
    
    useEffect(() => {

        if (id) {
            dispatch(getHistoryService(id));
            console.log("fetched messages for conversation:", id);
        }
        return () => {
            dispatch(clearMessagesState())
        }

    } , [id]);
    if(!currentConversation) return <h1>Open a chat to see messages</h1>
    return (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
            {currentConversation ? (
                <p>Chatting with {currentConversation.title}</p>
            ) : (
                <p>Select a conversation to start chatting.</p>
            )}

            <input type="text" value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={() => {
                dispatch(addMessageService({message : {content : input} , chatId: currentConversation._id}));
                setInput("");
            }} >Add Message</button>

            {messages && messages.map(msg => {
                <div key={msg.id}>
                    <p>{msg.content}</p>
                </div>
            })}

        </div>
    );
}