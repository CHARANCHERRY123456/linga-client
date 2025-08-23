export type Message = {
  _id: string;
  content: string;
  sender_id: string;           // "user" | "bot"
  message_type: string;        // "text"
  embedding?: number[];
  reply_to?: string | null;
  conversation_id: string;
  timestamp: string;
  corrections?: string | null; // grammar feedback
  grammar_score?: number | null;
};

export type MessageCreate = {
  content: string;
  sender_id: string;
  message_type?: "text";
  embedding?: number[] | null;
  reply_to?: string | null;
};

export type MessageOut = {
  _id: string;
  conversation_id: string;
  timestamp: string; // ISO string, use Date if you parse it
  corrections?: string; // default: "no correction is found"
  content?: string;     // default: "No reply found"
  grammar_score?: number | null; // default: 0.0
  // Inherit from MessageCreate
  sender_id: string;
  message_type?: "text";
  embedding?: number[] | null;
  reply_to?: string | null;
};

