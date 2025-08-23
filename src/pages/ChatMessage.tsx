import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessageService, getHistoryService } from "../store/slices/messages/messageService";
import { clearMessagesState, addMessage } from "../store/slices/messages/messageSlice";

export default function ChatMessages() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { conversations } = useSelector(s => s.conversation);
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);
    
    const currentConversation = conversations.find(convo => convo._id === id);
    const { messages, loading, error } = useSelector(s => s.message);

    // Auto scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (id) {
            dispatch(getHistoryService(id));
        }
        return () => {
            dispatch(clearMessagesState());
        };
    }, [id, dispatch]);

    const handleSendMessage = async () => {
        if (input.trim() === "" || isSending || !currentConversation) return;
        
        const messageContent = input.trim();
        setIsSending(true);
        setInput("");
        
        try {
            await dispatch(addMessageService({message: { content: messageContent },chatId: currentConversation._id})).unwrap();
            
            console.log("Message sent successfully");
            
        } catch (err) {
            console.error("Failed to send message:", err);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!currentConversation) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-600 mb-2">No Chat Selected</h1>
                    <p className="text-gray-500">Choose a conversation from the sidebar to start chatting</p>
                </div>
            </div>
        );
    }

    const isBotMessage = (msg) => {
        return msg.sender_id === "bot";
    };
    

    return (
        <div className="w-full h-full flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {currentConversation.title.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {currentConversation.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                        <div className="ml-auto pl-3">
                            <button onClick={() => dispatch(clearMessagesState())} className="text-red-400 hover:text-red-600">
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="ml-3 text-gray-500">Loading messages...</span>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No messages yet</h3>
                        <p className="text-gray-500">Start the conversation by sending a message below</p>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isBot = isBotMessage(msg);
                        const uniqueKey = msg._id || `message-${index}`;
                        
                        return (
                            <div key={uniqueKey} className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className="max-w-xs lg:max-w-md">
                                    <div className={`px-4 py-2 rounded-lg shadow-sm ${
                                        isBot 
                                            ? 'bg-white text-gray-800 rounded-bl-none border border-gray-200' 
                                            : 'bg-blue-500 text-white rounded-br-none'
                                    }`}>
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                        { isBot &&  <p className="text-xs text-red-500">{msg.corrections}</p> }
                                    </div>
                                    <div className={`flex mt-1 ${isBot ? 'justify-start' : 'justify-end'}`}>
                                        <span className="text-xs text-gray-500">
                                            {msg.timestamp 
                                                ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                                                : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Typing Indicator */}
            {isSending && (
                <div className="px-4 py-2">
                    <div className="flex items-center space-x-2 text-gray-500">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        <span className="text-sm">Ai is typing bro</span>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            disabled={isSending || loading}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <span className="text-xs text-gray-400">
                                {input.length}/1000
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={input.trim() === "" || isSending || loading}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
                    >
                        {isSending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Sending</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span>Send</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}