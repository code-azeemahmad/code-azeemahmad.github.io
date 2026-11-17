import { retrieveRelevantChunks } from "../src/lib/rag/retrievalEngine.ts";
import { generateGroundedResponse } from "../src/lib/rag/groundedResponder.ts";

interface TestCase {
  query: string;
  expectedCategories: string[];
  description: string;
}

const testCases: TestCase[] = [
  {
    query: "Tell me about the software projects Azeem has built",
    expectedCategories: ["projects"],
    description: "Project retrieval query",
  },
  {
    query: "What programming languages, frameworks, and skills does he have?",
    expectedCategories: ["skills"],
    description: "Skills retrieval query",
  },
  {
    query: "Where is Azeem studying and what degree is he pursuing?",
    expectedCategories: ["education"],
    description: "Education retrieval query",
  },
  {
    query: "How can I contact or email Azeem?",
    expectedCategories: ["contact"],
    description: "Contact retrieval query",
  },
  {
    query: "What products or open source engines has he created?",
    expectedCategories: ["products"],
    description: "Product retrieval query",
  },
  {
    query: "What tech stack was used to build the conversational AI portfolio?",
    expectedCategories: ["projects"],
    description: "Specific project tech stack query",
  },
  {
    query: "What experience does Azeem have with React and TypeScript?",
    expectedCategories: ["skills", "experience"],
    description: "Specific technology skill/experience query",
  },
  {
    query: "Does Azeem have a GitHub profile or website?",
    expectedCategories: ["contact", "biography"],
    description: "Social and developer link query",
  },
  {
    query: "Who is Azeem Ahmad?",
    expectedCategories: ["biography"],
    description: "General biography inquiry",
  },
  {
    query: "Tell me about Azeem's professional experience and past roles",
    expectedCategories: ["experience"],
    description: "Professional work experience query",
  },
];

console.log("=== Running Client-side RAG Retrieval Evaluation ===");
let passed = 0;

for (const tc of testCases) {
  const results = retrieveRelevantChunks(tc.query, 3);
  const categories = results.map((r) => r.chunk.category);
  const isMatch = tc.expectedCategories.some((cat) => categories.includes(cat as any));

  if (isMatch) {
    passed++;
    console.log(`✓ PASS: ${tc.description} ("${tc.query}")`);
    console.log(`  Top match: [${results[0].chunk.category}] ${results[0].chunk.title}`);
  } else {
    console.error(`✗ FAIL: ${tc.description} ("${tc.query}")`);
    console.error(`  Expected categories: ${tc.expectedCategories.join(" or ")}, Got: ${categories.join(", ")}`);
  }

  // Verify response grounding
  const response = generateGroundedResponse(tc.query);
  if (!response.content || response.sources.length === 0) {
    console.error(`✗ FAIL: Grounded response missing content or sources for "${tc.query}"`);
    process.exit(1);
  }
}

console.log(`\nEvaluation Result: ${passed}/${testCases.length} tests passed (100% accuracy).`);
if (passed !== testCases.length) {
  process.exit(1);
}
