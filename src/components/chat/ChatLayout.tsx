import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, setCurrentConversationId } from "../../store/slices/conversation/conversationSlice";
import type { ConversationOut } from "../../types/conversation/ConversationTypes";
import { Outlet, useNavigate } from "react-router-dom";
import CreateConversation from "./CreateConversation";

export default function ChatLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { conversations, currentId, loading, error } = useSelector(s => s.conversation);

    const handleClick = (id: string) => {
        navigate(`${id}`);
        dispatch(setCurrentConversationId(id));
    };

    useEffect(() => {
        dispatch(fetchConversations());
    }, [currentId]);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-full max-w-xs bg-white border-r border-gray-200 shadow-lg flex flex-col p-4 md:p-6 md:w-80 h-full">
                <CreateConversation />

                <h2 className="mb-4 font-bold text-xl text-gray-800 text-center tracking-tight">
                    Conversations
                </h2>
                <div className="border-b mb-4" />
                {loading && <p className="text-gray-500 text-center mb-2">Loading...</p>}
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                <div className="flex-1 overflow-y-auto">
                    {conversations && conversations.length > 0 ? (
                        <ul>
                            {conversations.map((convo: ConversationOut) => (
                                <li
                                    key={convo._id}
                                    className="flex items-center gap-3 p-2 rounded-md mb-2 cursor-pointer transition-colors hover:bg-gray-100"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700 shadow">
                                        {convo.title[0]?.toUpperCase() || "?"}
                                    </div>
                                    <button onClick={() => handleClick(convo._id)}>
                                        {convo.title}
                                    </button>
                                    {/* <span className="font-medium text-gray-800 truncate">{convo.title}</span> */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center mb-4">No conversations yet.</p>
                    )}
                </div>
                <div className="border-b mb-4" />
            </aside>
            <main className="flex-1 hidden md:block">
                <Outlet />
            </main>
        </div>
    );
}