import type { LLMAdapter, LLMRequestOptions } from "../types";

export class OpenAIAdapter implements LLMAdapter {
  private baseUrl: string;

  constructor(baseUrl: string = "https://api.openai.com/v1") {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async streamCompletion(options: LLMRequestOptions): Promise<string> {
    const {
      apiKey,
      model = "gpt-4o-mini",
      messages,
      temperature = 0.3,
      signal,
      onToken,
    } = options;

    const endpoint = `${this.baseUrl}/chat/completions`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        stream: true,
      }),
      signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      let errorMsg = `API request failed with status ${response.status}`;
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
      throw new Error("No response body received from API.");
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
              const delta = parsed.choices?.[0]?.delta?.content || "";
              if (delta) {
                fullText += delta;
                onToken?.(delta);
              }
            } catch {
              // ignore unparseable chunk
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
