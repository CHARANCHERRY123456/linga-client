import { useDispatch } from "react-redux";
import { createConversation } from "../../store/slices/conversation/conversationSlice";
import React, { useState } from "react";

export default function CreateConversation() {
    const [conversationName, setConversationName] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload  = { title: conversationName };
        dispatch(createConversation(payload));
    };
    

    return (
        <div>
            <h2>Create a New Conversation</h2>
            <label>
                Conversation Name:
                <input
                 type="text"
                  value={conversationName} 
                  onChange={(e) => setConversationName(e.target.value)} 
                  placeholder="Enter name of conversation" name="conversationName" 
                />
            </label>
            <button onClick={handleSubmit} >Create</button>
        </div>
    );
}
