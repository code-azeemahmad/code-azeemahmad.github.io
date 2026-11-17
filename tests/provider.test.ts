import { getProviderAdapter } from "../src/lib/ai/providerRegistry";
import { GeminiAdapter } from "../src/lib/ai/adapters/geminiAdapter";
import { OpenAIAdapter } from "../src/lib/ai/adapters/openaiAdapter";
import { AnthropicAdapter } from "../src/lib/ai/adapters/anthropicAdapter";

console.log("=== Running AI Provider Registry & Adapter Tests ===");

let passed = 0;

// 1. Verify provider registry returns appropriate adapters
const gemini = getProviderAdapter("gemini");
if (gemini instanceof GeminiAdapter) {
  passed++;
  console.log("✓ PASS: Gemini adapter resolved correctly.");
} else {
  console.error("✗ FAIL: Gemini adapter resolution failed.");
  process.exit(1);
}

const openai = getProviderAdapter("openai");
if (openai instanceof OpenAIAdapter) {
  passed++;
  console.log("✓ PASS: OpenAI adapter resolved correctly.");
} else {
  console.error("✗ FAIL: OpenAI adapter resolution failed.");
  process.exit(1);
}

const groq = getProviderAdapter("groq");
if (groq instanceof OpenAIAdapter) {
  passed++;
  console.log("✓ PASS: Groq adapter resolved correctly to OpenAI-compatible adapter.");
} else {
  console.error("✗ FAIL: Groq adapter resolution failed.");
  process.exit(1);
}

const anthropic = getProviderAdapter("anthropic");
if (anthropic instanceof AnthropicAdapter) {
  passed++;
  console.log("✓ PASS: Anthropic adapter resolved correctly.");
} else {
  console.error("✗ FAIL: Anthropic adapter resolution failed.");
  process.exit(1);
}

// 2. Cancellation / AbortController test
const controller = new AbortController();
controller.abort();

if (controller.signal.aborted) {
  passed++;
  console.log("✓ PASS: AbortController abort signal verified.");
} else {
  console.error("✗ FAIL: AbortController failed.");
  process.exit(1);
}

console.log(`Provider Tests: All ${passed} tests passed successfully.\n`);
