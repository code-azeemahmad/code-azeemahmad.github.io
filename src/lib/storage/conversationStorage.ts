import type { Conversation, ConversationStorageSchema } from "@/types/chat";

export const STORAGE_KEY = "portfolio_chat_storage_v1";
export const CURRENT_SCHEMA_VERSION = 1;

/**
 * Validates and sanitizes loaded storage data.
 */
function validateSchema(data: unknown): ConversationStorageSchema | null {
  if (!data || typeof data !== "object") return null;

  const candidate = data as Partial<ConversationStorageSchema>;

  if (typeof candidate.version !== "number") return null;
  if (!Array.isArray(candidate.conversations)) return null;

  // Sanitize conversations
  const validConversations: Conversation[] = candidate.conversations.filter(
    (c): c is Conversation =>
      c !== null &&
      typeof c === "object" &&
      typeof c.id === "string" &&
      typeof c.title === "string" &&
      typeof c.createdAt === "number" &&
      Array.isArray(c.messages)
  );

  return {
    version: CURRENT_SCHEMA_VERSION,
    activeConversationId:
      typeof candidate.activeConversationId === "string"
        ? candidate.activeConversationId
        : null,
    conversations: validConversations,
    updatedAt:
      typeof candidate.updatedAt === "number"
        ? candidate.updatedAt
        : Date.now(),
  };
}

/**
 * Safely loads stored conversations from localStorage.
 */
export function loadStoredConversations(): {
  conversations: Conversation[];
  activeConversationId: string | null;
} {
  if (typeof window === "undefined") {
    return { conversations: [], activeConversationId: null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { conversations: [], activeConversationId: null };
    }

    const parsed = JSON.parse(raw);
    const validated = validateSchema(parsed);

    if (!validated) {
      console.warn("Storage schema validation failed. Initializing empty history.");
      return { conversations: [], activeConversationId: null };
    }

    return {
      conversations: validated.conversations,
      activeConversationId: validated.activeConversationId,
    };
  } catch (err) {
    console.error("Failed to read from localStorage:", err);
    return { conversations: [], activeConversationId: null };
  }
}

/**
 * Safely writes conversations to localStorage.
 */
export function saveStoredConversations(
  conversations: Conversation[],
  activeConversationId: string | null
): boolean {
  if (typeof window === "undefined") return false;

  try {
    const payload: ConversationStorageSchema = {
      version: CURRENT_SCHEMA_VERSION,
      activeConversationId,
      conversations,
      updatedAt: Date.now(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
    return false;
  }
}

/**
 * Derives a human-readable title from the initial prompt.
 */
export function generateConversationTitle(firstPrompt: string): string {
  const cleaned = firstPrompt.trim().replace(/\s+/g, " ");
  if (!cleaned) return "New Conversation";

  const capitalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  if (capitalized.length <= 36) {
    return capitalized;
  }

  return capitalized.slice(0, 33).trim() + "...";
}

/**
 * Exports a conversation as a downloadable JSON file.
 */
export function exportConversationAsJson(conversation: Conversation): void {
  if (typeof window === "undefined") return;

  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(conversation, null, 2));
  const filename = `${sanitizeFilename(conversation.title)}-${formatDateForFilename(
    conversation.createdAt
  )}.json`;

  triggerDownload(dataStr, filename);
}

/**
 * Exports a conversation as a formatted Markdown document.
 */
export function exportConversationAsMarkdown(conversation: Conversation): void {
  if (typeof window === "undefined") return;

  const lines: string[] = [
    `# ${conversation.title}`,
    ``,
    `*Exported from Azeem Ahmad's AI Portfolio on ${new Date().toLocaleString()}*`,
    ``,
    `---`,
    ``,
  ];

  conversation.messages.forEach((msg) => {
    const speaker = msg.role === "user" ? "**User**" : "**Assistant**";
    lines.push(`${speaker}:`);
    lines.push(``);
    lines.push(msg.content);
    lines.push(``);
    lines.push(`---`);
    lines.push(``);
  });

  const markdownContent = lines.join("\n");
  const dataStr =
    "data:text/markdown;charset=utf-8," + encodeURIComponent(markdownContent);
  const filename = `${sanitizeFilename(conversation.title)}-${formatDateForFilename(
    conversation.createdAt
  )}.md`;

  triggerDownload(dataStr, filename);
}

function sanitizeFilename(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 30) || "conversation"
  );
}

function formatDateForFilename(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function triggerDownload(url: string, filename: string): void {
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
