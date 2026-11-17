import type { LLMAdapter, LLMRequestOptions } from "../types";

export class GeminiAdapter implements LLMAdapter {
  async streamCompletion(options: LLMRequestOptions): Promise<string> {
    const { apiKey, model = "gemini-1.5-flash", messages, temperature = 0.3, signal, onToken } = options;

    const systemMessage = messages.find((m) => m.role === "system");
    const conversationMessages = messages.filter((m) => m.role !== "system");

    const contents = conversationMessages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const body: Record<string, unknown> = {
      contents,
      generationConfig: {
        temperature,
      },
    };

    if (systemMessage) {
      body.system_instruction = {
        parts: [{ text: systemMessage.content }],
      };
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      let errorMsg = `Gemini API error (${response.status})`;
      try {
        const parsed = JSON.parse(errText);
        if (parsed.error && parsed.error.message) {
          errorMsg = parsed.error.message;
        }
      } catch {
        // fallback to errText
      }
      throw new Error(errorMsg);
    }

    if (!response.body) {
      throw new Error("No response body received from Gemini API.");
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
            if (dataStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(dataStr);
              const text =
                parsed.candidates?.[0]?.content?.parts?.[0]?.text || "";
              if (text) {
                fullText += text;
                onToken?.(text);
              }
            } catch {
              // ignore malformed SSE line
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
