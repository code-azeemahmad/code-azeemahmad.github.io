import { buildGroundedContext } from "./contextBuilder";
import type { SourceCitation } from "@/types/rag";

export interface GroundedResponse {
  content: string;
  sources: SourceCitation[];
}

/**
 * Generates an accurate, grounded portfolio response from retrieved knowledge chunks.
 * Used when running in default portfolio mode (without a live BYOK key).
 */
export function generateGroundedResponse(query: string): GroundedResponse {
  const { chunks, citations } = buildGroundedContext(query, 3);

  if (chunks.length === 0) {
    return {
      content:
        "I couldn't find specific information matching your question in Azeem's published portfolio.\n\nYou can ask about:\n- **Projects**: The Conversational AI Portfolio and web architectures\n- **Skills**: TypeScript, React, Astro, Tailwind CSS, Python\n- **Background**: Studies in Computer Science and software engineering\n- **Contact**: Website, GitHub, and collaboration channels",
      sources: [],
    };
  }

  // Synthesize response based on retrieved categories
  const categories = new Set(chunks.map((c) => c.category));

  let reply = "";

  if (categories.has("projects")) {
    const projChunk = chunks.find((c) => c.category === "projects");
    reply += `### Projects Overview\n\n${projChunk?.content}\n\n`;
    if (chunks.some((c) => c.category === "skills")) {
      const skillsChunk = chunks.find((c) => c.category === "skills");
      reply += `\n\n### Associated Technologies\n\n${skillsChunk?.content}`;
    }
  } else if (categories.has("skills")) {
    const skillChunks = chunks.filter((c) => c.category === "skills");
    reply += `### Technical Skills & Stack\n\n`;
    skillChunks.forEach((sc) => {
      reply += `- ${sc.content}\n`;
    });
  } else if (categories.has("contact")) {
    const contactChunk = chunks.find((c) => c.category === "contact");
    reply += `### How to Connect with Azeem\n\n${contactChunk?.content}`;
  } else if (categories.has("education")) {
    const eduChunk = chunks.find((c) => c.category === "education");
    reply += `### Academic Background\n\n${eduChunk?.content}`;
  } else if (categories.has("experience")) {
    const expChunk = chunks.find((c) => c.category === "experience");
    reply += `### Professional Experience\n\n${expChunk?.content}`;
  } else {
    // Default synthesis
    reply += `Based on Azeem's verified portfolio:\n\n`;
    chunks.forEach((chunk) => {
      reply += `**${chunk.title}**:\n${chunk.content}\n\n`;
    });
  }

  return {
    content: reply.trim(),
    sources: citations,
  };
}
