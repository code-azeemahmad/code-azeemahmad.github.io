import { buildGroundedContext } from "../rag/contextBuilder";
import { generateGroundedResponse } from "../rag/groundedResponder";
import { getProviderAdapter } from "./providerRegistry";
import type { LLMProviderId, ProviderMessage } from "./types";
import type { SourceCitation } from "@/types/rag";

export interface StreamChatOptions {
  userQuery: string;
  history: { role: "user" | "assistant" | "system"; content: string }[];
  providerId?: LLMProviderId;
  apiKey?: string;
  model?: string;
  signal?: AbortSignal;
  onToken?: (token: string) => void;
}

export interface StreamChatResult {
  content: string;
  citations: SourceCitation[];
}

export async function executeChatStream(
  options: StreamChatOptions
): Promise<StreamChatResult> {
  const {
    userQuery,
    history,
    providerId = "gemini",
    apiKey,
    model,
    signal,
    onToken,
  } = options;

  // 1. Build grounded context from local portfolio documents
  const { citations, contextPrompt } = buildGroundedContext(userQuery, 3);

  // 2. If no valid API key is present, fallback immediately to local grounded responder
  if (!apiKey || !apiKey.trim()) {
    const localResult = generateGroundedResponse(userQuery);
    return {
      content: localResult.content,
      citations: localResult.sources,
    };
  }

  // 3. Prepare messages array for provider API
  const messages: ProviderMessage[] = [
    {
      role: "system",
      content: contextPrompt,
    },
    ...history.slice(-6).map((h) => ({
      role: h.role as "user" | "assistant",
      content: h.content,
    })),
    {
      role: "user",
      content: userQuery,
    },
  ];

  // 4. Stream response from provider
  const adapter = getProviderAdapter(providerId);

  const fullContent = await adapter.streamCompletion({
    apiKey: apiKey.trim(),
    model,
    messages,
    signal,
    onToken,
  });

  return {
    content: fullContent,
    citations,
  };
}
