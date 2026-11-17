import { GeminiAdapter } from "./adapters/geminiAdapter";
import { OpenAIAdapter } from "./adapters/openaiAdapter";
import { AnthropicAdapter } from "./adapters/anthropicAdapter";
import type { LLMAdapter, LLMProviderId } from "./types";

export function getProviderAdapter(providerId: LLMProviderId): LLMAdapter {
  switch (providerId) {
    case "gemini":
      return new GeminiAdapter();
    case "openai":
      return new OpenAIAdapter("https://api.openai.com/v1");
    case "groq":
      return new OpenAIAdapter("https://api.groq.com/openai/v1");
    case "anthropic":
      return new AnthropicAdapter();
    default:
      throw new Error(`Unsupported AI provider: ${providerId}`);
  }
}
