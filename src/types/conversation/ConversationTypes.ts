export interface ConversationCreatePayload {
  user_id: string;
  title: string;
  description?: string;
  image?: string;
}

export interface ConversationOut {
  _id: string; // maps to _id in backend
  user_id: string;
  title: string;
  description?: string;
  image?: string;
  created_at: string; // ISO date string
  last_message_at?: string | null;
}

// List response for all conversations of a user
export interface ConversationOutList {
  conversations: ConversationOut[];
  total: number;
}

// Redux slice state type for conversations
export interface ConversationState {
  conversations: ConversationOut[];
  currentId: string | null;
  loading: boolean;
  error: string | null;
}