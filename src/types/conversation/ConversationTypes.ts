export type CreateConversation = {
    user_id: string;
    description?: string;
    image?: string;
    title: string;
};

export type CreateConversationOut = {
    id : string
    created_at : Date
    last_message_at : Date | null
};

export type Conversation = {
    user_id: string;
    description?: string;
    image?: string;
    title: string;
    _id: string;
    created_at: string; // ISO date string
    last_message_at?: string; // ISO date string
};