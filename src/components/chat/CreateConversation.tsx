import { useDispatch } from "react-redux";
import { createConversation } from "../../store/slices/conversation/conversationSlice";
import React, { useState } from "react";

export default function CreateConversation() {
    const [open, setOpen] = useState(false);
    const [conversationName, setConversationName] = useState("");
    const dispatch = useDispatch();

    const handleCreate = () => setOpen(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (conversationName.trim()) {
            dispatch(createConversation({ title: conversationName }));
            setConversationName("");
            setOpen(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            {!open ? (
                <button
                    type="button"
                    className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={handleCreate}
                >
                    Create
                </button>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-lg shadow p-4 w-full max-w-xs flex flex-col gap-4"
                >
                    <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
                        Conversation Name
                    </h3>
                    <input
                        type="text"
                        value={conversationName}
                        onChange={(e) => setConversationName(e.target.value)}
                        placeholder="Enter name"
                        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-gray-50"
                        autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                            onClick={() => {
                                setOpen(false);
                                setConversationName("");
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
                            disabled={!conversationName.trim()}
                        >
                            Create
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
