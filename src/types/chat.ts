export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  sources?: string[];
  citations?: { id: string; title: string; url?: string }[];
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
  isFeaturedFork?: boolean;
  featuredTopicId?: string;
  isPreloaded?: boolean;
}

export interface ConversationStorageSchema {
  version: number;
  activeConversationId: string | null;
  conversations: Conversation[];
  updatedAt: number;
}
