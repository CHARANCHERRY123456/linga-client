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
