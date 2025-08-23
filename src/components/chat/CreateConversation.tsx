import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../../store/slices/conversation/conversationSlice";
import { useState } from "react";

export default function CreateConversation() {
    const [conversationName, setConversationName] = useState("");
    const dispatch = useDispatch();
    const {conversations ,currentid , loading ,error } = useSelector(s=>s.conversation);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createConversation({title : conversationName}));
    };
    console.log(conversations , currentid , loading , error );
    

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
