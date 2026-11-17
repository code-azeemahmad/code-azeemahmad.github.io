export type KnowledgeCategory =
  | "biography"
  | "projects"
  | "products"
  | "skills"
  | "experience"
  | "education"
  | "contact";

export interface KnowledgeChunk {
  id: string;
  sourceId: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  keywords: string[];
  url?: string;
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
}

export interface SourceCitation {
  id: string;
  title: string;
  category: KnowledgeCategory;
  url?: string;
  snippet?: string;
}

export interface GroundedContext {
  chunks: KnowledgeChunk[];
  citations: SourceCitation[];
  contextPrompt: string;
}
