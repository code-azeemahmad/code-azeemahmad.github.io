import type { LLMAdapter, LLMRequestOptions } from "../types";

export class AnthropicAdapter implements LLMAdapter {
  async streamCompletion(options: LLMRequestOptions): Promise<string> {
    const {
      apiKey,
      model = "claude-3-5-haiku-20241022",
      messages,
      temperature = 0.3,
      signal,
      onToken,
    } = options;

    const systemMessage = messages.find((m) => m.role === "system");
    const conversationMessages = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        temperature,
        system: systemMessage?.content,
        messages: conversationMessages,
        stream: true,
      }),
      signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      let errorMsg = `Anthropic API error (${response.status})`;
      try {
        const parsed = JSON.parse(errText);
        if (parsed.error?.message) {
          errorMsg = parsed.error.message;
        }
      } catch {
        // fallback
      }
      throw new Error(errorMsg);
    }

    if (!response.body) {
      throw new Error("No response body received from Anthropic API.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6);
            try {
              const parsed = JSON.parse(dataStr);
              if (
                parsed.type === "content_block_delta" &&
                parsed.delta?.type === "text_delta"
              ) {
                const text = parsed.delta.text || "";
                if (text) {
                  fullText += text;
                  onToken?.(text);
                }
              }
            } catch {
              // ignore
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return fullText;
  }
}
