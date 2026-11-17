export type LLMProviderId = "gemini" | "openai" | "groq" | "anthropic";

export interface LLMProviderConfig {
  id: LLMProviderId;
  name: string;
  defaultModel: string;
  availableModels: string[];
  placeholder: string;
  helpUrl: string;
}

export interface ProviderMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMRequestOptions {
  apiKey: string;
  model?: string;
  messages: ProviderMessage[];
  temperature?: number;
  signal?: AbortSignal;
  onToken?: (token: string) => void;
}

export interface LLMAdapter {
  streamCompletion(options: LLMRequestOptions): Promise<string>;
}

export const SUPPORTED_PROVIDERS: Record<LLMProviderId, LLMProviderConfig> = {
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    defaultModel: "gemini-1.5-flash",
    availableModels: ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp"],
    placeholder: "AIzaSy...",
    helpUrl: "https://aistudio.google.com/app/apikey",
  },
  openai: {
    id: "openai",
    name: "OpenAI",
    defaultModel: "gpt-4o-mini",
    availableModels: ["gpt-4o-mini", "gpt-4o"],
    placeholder: "sk-proj-...",
    helpUrl: "https://platform.openai.com/api-keys",
  },
  groq: {
    id: "groq",
    name: "Groq (Fast Llama)",
    defaultModel: "llama-3.3-70b-versatile",
    availableModels: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
    placeholder: "gsk_...",
    helpUrl: "https://console.groq.com/keys",
  },
  anthropic: {
    id: "anthropic",
    name: "Anthropic Claude",
    defaultModel: "claude-3-5-haiku-20241022",
    availableModels: ["claude-3-5-haiku-20241022", "claude-3-5-sonnet-20241022"],
    placeholder: "sk-ant-...",
    helpUrl: "https://console.anthropic.com/settings/keys",
  },
};
