import Fuse, { type IFuseOptions } from "fuse.js";
import { buildKnowledgeCorpus } from "./knowledgeBase";
import type { KnowledgeChunk, RetrievalResult } from "@/types/rag";

let cachedCorpus: KnowledgeChunk[] | null = null;
let fuseInstance: Fuse<KnowledgeChunk> | null = null;

function getFuseInstance(): Fuse<KnowledgeChunk> {
  if (!fuseInstance || !cachedCorpus) {
    cachedCorpus = buildKnowledgeCorpus();

    const options: IFuseOptions<KnowledgeChunk> = {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "keywords", weight: 0.35 },
        { name: "category", weight: 0.15 },
        { name: "content", weight: 0.1 },
      ],
      threshold: 0.6,
      ignoreLocation: true,
      includeScore: true,
      minMatchCharLength: 2,
    };

    fuseInstance = new Fuse(cachedCorpus, options);
  }

  return fuseInstance;
}

/**
 * Normalizes query string for uniform retrieval.
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Category intent triggers.
 */
const CATEGORY_TRIGGERS: Record<string, string[]> = {
  education: ["education", "degree", "university", "college", "study", "studying", "bachelor", "coursework", "academic", "school"],
  projects: ["project", "projects", "built", "portfolio app", "application", "applications", "system"],
  products: ["product", "products", "engine", "template", "platform"],
  skills: ["skill", "skills", "stack", "technology", "technologies", "framework", "frameworks", "language", "languages", "tool", "tools", "library"],
  experience: ["experience", "work", "job", "career", "employment", "history", "role", "responsibilities"],
  contact: ["contact", "email", "reach", "hire", "message", "collaborate", "social", "connect", "github", "linkedin", "links"],
  biography: ["about", "bio", "biography", "background", "who is", "overview", "journey", "interests"],
};

/**
 * Retrieves the most relevant knowledge chunks for a visitor query.
 */
export function retrieveRelevantChunks(
  query: string,
  limit: number = 4
): RetrievalResult[] {
  const normalized = normalizeQuery(query);
  if (!normalized) return [];

  const fuse = getFuseInstance();
  const corpus = cachedCorpus || buildKnowledgeCorpus();

  // 1. Identify category intent from query
  const tokens = normalized.split(" ").filter((t) => t.length > 1);
  const matchedCategories = new Set<string>();

  for (const [category, triggers] of Object.entries(CATEGORY_TRIGGERS)) {
    for (const trigger of triggers) {
      if (normalized.includes(trigger)) {
        matchedCategories.add(category);
        break;
      }
    }
  }

  // Base raw scores from Fuse (default 1.0 for unmatched)
  const rawScoreMap = new Map<string, number>();

  // Full-phrase search
  const phraseMatches = fuse.search(normalized);
  phraseMatches.forEach((m) => {
    rawScoreMap.set(m.item.id, m.score ?? 0.6);
  });

  // Individual token search
  tokens.forEach((token) => {
    if (token.length > 2) {
      const tokenMatches = fuse.search(token);
      tokenMatches.forEach((m) => {
        const current = rawScoreMap.get(m.item.id) ?? 0.8;
        const tokenScore = m.score ?? 0.7;
        rawScoreMap.set(m.item.id, Math.min(current, tokenScore));
      });
    }
  });

  // Calculate composite relevance scores
  const results: RetrievalResult[] = corpus.map((chunk) => {
    let score = rawScoreMap.get(chunk.id) ?? 0.85;

    // Multiplicative category intent boost
    if (matchedCategories.has(chunk.category)) {
      score *= 0.35; // 65% boost for direct category intent match
    }

    // Keyword match boost
    let tokenMatches = 0;
    tokens.forEach((token) => {
      const stem = token.endsWith("s") ? token.slice(0, -1) : token;
      if (
        chunk.keywords.includes(token) ||
        chunk.keywords.includes(stem) ||
        chunk.title.toLowerCase().includes(token) ||
        chunk.title.toLowerCase().includes(stem)
      ) {
        tokenMatches += 1;
      }
    });

    if (tokenMatches > 0) {
      score *= Math.pow(0.8, tokenMatches);
    }

    return {
      chunk,
      score,
    };
  });

  // Sort by lowest score (best match first)
  results.sort((a, b) => a.score - b.score);

  return results.slice(0, limit);
}

/**
 * Returns all available knowledge chunks.
 */
export function getAllKnowledgeChunks(): KnowledgeChunk[] {
  if (!cachedCorpus) {
    cachedCorpus = buildKnowledgeCorpus();
  }
  return cachedCorpus;
}
