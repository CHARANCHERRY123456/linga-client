import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ChatMessages() {
    const { id } = useParams();
    const { conversations } = useSelector(s => s.conversation);
    console.log(conversations);
    const currentConversation = conversations.find(convo => convo._id === id);

    return (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
            {currentConversation ? (
                <p>Chatting with {currentConversation.title}</p>
            ) : (
                <p>Select a conversation to start chatting.</p>
            )}
        </div>
    );
}