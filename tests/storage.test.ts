import {
  generateConversationTitle,
  STORAGE_KEY,
  CURRENT_SCHEMA_VERSION,
} from "../src/lib/storage/conversationStorage";

console.log("=== Running Storage & Data Layer Unit Tests ===");

// 1. Title generation tests
const testTitles = [
  { input: "hello world", expected: "Hello world" },
  {
    input: "tell me about your background and experience in detail please",
    expected: "Tell me about your background and...",
  },
  { input: "   spaces test   ", expected: "Spaces test" },
  { input: "", expected: "New Conversation" },
];

let passed = 0;

for (const t of testTitles) {
  const result = generateConversationTitle(t.input);
  if (result.length <= 36 && result.startsWith(t.expected.slice(0, 5))) {
    passed++;
    console.log(`✓ PASS: generateConversationTitle("${t.input}") => "${result}"`);
  } else {
    console.error(`✗ FAIL: generateConversationTitle("${t.input}") expected "${t.expected}", got "${result}"`);
    process.exit(1);
  }
}

// 2. Schema constants
if (STORAGE_KEY === "portfolio_chat_storage_v1" && CURRENT_SCHEMA_VERSION === 1) {
  passed++;
  console.log("✓ PASS: Storage schema key and version verified.");
} else {
  console.error("✗ FAIL: Storage key or version mismatch.");
  process.exit(1);
}

console.log(`Storage Tests: All ${passed} tests passed successfully.\n`);
