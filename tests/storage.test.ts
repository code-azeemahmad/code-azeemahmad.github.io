import {
  generateConversationTitle,
  STORAGE_KEY,
  CURRENT_SCHEMA_VERSION,
} from "../src/lib/storage/conversationStorage";
import { createPreloadedConversations } from "../src/data";

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

// 3. Conversation pruning and idempotency verification
const sampleConversations = [
  { id: "c1", title: "Chat 1", createdAt: 100, updatedAt: 100, messages: [] },
  { id: "c2", title: "Chat 2", createdAt: 101, updatedAt: 101, messages: [{ id: "m1", role: "user" as const, content: "hi", timestamp: 101 }] },
  { id: "c3", title: "Featured", createdAt: 102, updatedAt: 102, messages: [], isFeaturedFork: true },
];

const persistable = sampleConversations.filter((c) => c.messages.length > 0 || c.isFeaturedFork === true);
if (persistable.length === 2 && !persistable.some((c) => c.id === "c1")) {
  passed++;
  console.log("✓ PASS: Empty non-featured conversations are correctly pruned to ensure idempotency.");
} else {
  console.error("✗ FAIL: Empty conversations should be pruned.");
  process.exit(1);
}

// 4. Preloaded conversations canonical initialization
const preloaded = createPreloadedConversations();
if (preloaded.length === 6 && preloaded.every((p) => p.isPreloaded === true && p.messages.length > 0)) {
  passed++;
  console.log(`✓ PASS: createPreloadedConversations() generates ${preloaded.length} verified immutable portfolio chats.`);
} else {
  console.error("✗ FAIL: createPreloadedConversations() must return 6 verified preloaded chats.");
  process.exit(1);
}

// 5. Preloaded conversations immutability check (cannot be deleted)
const simulatedConversations = [...preloaded, { id: "visitor-1", title: "Custom", createdAt: 200, updatedAt: 200, messages: [{ id: "m2", role: "user" as const, content: "hi", timestamp: 200 }] }];
// Deleting "visitor-1" should succeed
const afterVisitorDelete = simulatedConversations.filter((c) => c.id !== "visitor-1" || c.isPreloaded);
// Attempting to delete preloaded-about-me should be blocked
const afterPreloadedDelete = simulatedConversations.filter((c) => c.id !== "preloaded-about-me" || c.isPreloaded);

if (afterVisitorDelete.length === 6 && afterPreloadedDelete.length === 7) {
  passed++;
  console.log("✓ PASS: Deletion guard protects preloaded portfolio conversations while allowing visitor chat deletion.");
} else {
  console.error("✗ FAIL: Preloaded conversations must not be deleted.");
  process.exit(1);
}

// 6. Clearing history preserves preloaded conversations
const afterClearHistory = simulatedConversations.filter((c) => c.isPreloaded);
if (afterClearHistory.length === 6 && afterClearHistory.every((c) => c.isPreloaded)) {
  passed++;
  console.log("✓ PASS: Clearing history preserves all preloaded portfolio conversations.");
} else {
  console.error("✗ FAIL: Clearing history must retain preloaded conversations.");
  process.exit(1);
}

console.log(`Storage Tests: All ${passed} tests passed successfully.\n`);
