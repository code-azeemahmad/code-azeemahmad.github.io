import {
  profile,
  projects,
  products,
  skills,
  experience,
  education,
} from "@/data";
import type { KnowledgeChunk } from "@/types/rag";

/**
 * Builds a deterministic corpus of knowledge chunks from verified portfolio data.
 */
export function buildKnowledgeCorpus(): KnowledgeChunk[] {
  const corpus: KnowledgeChunk[] = [];

  // 1. Profile & Biography Chunks
  corpus.push({
    id: "profile-overview",
    sourceId: "src/data/profile.json#overview",
    title: "About Azeem Ahmad",
    category: "biography",
    content: `${profile.name} is a ${profile.headline}. ${profile.fullBio} Primary focus areas: ${profile.focusAreas.join(", ")}.`,
    keywords: [
      "azeem",
      "ahmad",
      "bio",
      "about",
      "background",
      "student",
      "developer",
      "overview",
      "focus",
      "learning",
      "computer science",
    ],
    url: profile.website,
  });

  corpus.push({
    id: "profile-contact",
    sourceId: "src/data/profile.json#contact",
    title: "Contact & Online Profiles",
    category: "contact",
    content: `You can connect with ${profile.name} on his website at ${profile.website} or view his open-source code on GitHub at ${profile.github}. Location: ${profile.location || "Remote"}. Email: ${profile.email || "Contact via website or GitHub"}.`,
    keywords: [
      "contact",
      "email",
      "reach",
      "hire",
      "opportunity",
      "message",
      "github",
      "website",
      "social",
      "collaborate",
      "links",
    ],
    url: profile.website,
  });

  // 2. Project Chunks
  projects.forEach((proj) => {
    const techStr = proj.technologies.join(", ");
    const outcomesStr = proj.outcomes ? proj.outcomes.join("; ") : "";

    corpus.push({
      id: `proj-${proj.id}`,
      sourceId: `src/data/projects.json#${proj.id}`,
      title: `Project: ${proj.name}`,
      category: "projects",
      content: `**${proj.name}**: ${proj.summary}\n- Problem: ${proj.problem}\n- Solution: ${proj.solution}\n- Role: ${proj.role}\n- Technologies: ${techStr}\n- Key Outcomes: ${outcomesStr}`,
      keywords: [
        "project",
        "portfolio",
        proj.name.toLowerCase(),
        ...proj.technologies.map((t) => t.toLowerCase()),
        "architecture",
        "implementation",
        "demo",
        "repository",
        "code",
      ],
      url: proj.demo || proj.repository,
    });
  });

  // 3. Product Chunks
  products.forEach((prod) => {
    const featStr = prod.features.join(", ");
    corpus.push({
      id: `prod-${prod.id}`,
      sourceId: `src/data/products.json#${prod.id}`,
      title: `Product: ${prod.name}`,
      category: "products",
      content: `**${prod.name}**: ${prod.description}\n- Target Audience: ${prod.audience}\n- Contribution: ${prod.contribution}\n- Features: ${featStr}\n- Status: ${prod.status}`,
      keywords: [
        "product",
        "platform",
        prod.name.toLowerCase(),
        ...prod.features.map((f) => f.toLowerCase()),
        "open source",
        "template",
        "engine",
      ],
      url: prod.website || prod.documentation,
    });
  });

  // 4. Skills Chunks
  skills.forEach((category) => {
    const skillList = category.skills
      .map((s) => `${s.name}${s.evidence ? ` (${s.evidence})` : ""}`)
      .join("; ");

    const tags = category.skills.flatMap((s) => s.tags || []);

    corpus.push({
      id: `skills-${category.id}`,
      sourceId: `src/data/skills.json#${category.id}`,
      title: `Skills: ${category.category}`,
      category: "skills",
      content: `**${category.category}**: ${skillList}`,
      keywords: [
        "skill",
        "skills",
        "stack",
        "technologies",
        "tools",
        category.category.toLowerCase(),
        ...category.skills.map((s) => s.name.toLowerCase()),
        ...tags,
      ],
      url: profile.website,
    });
  });

  // 5. Experience Chunks
  experience.forEach((exp) => {
    const respStr = exp.responsibilities.join("; ");
    const techStr = exp.technologies.join(", ");
    const outcomesStr = exp.outcomes ? exp.outcomes.join("; ") : "";

    corpus.push({
      id: `exp-${exp.id}`,
      sourceId: `src/data/experience.json#${exp.id}`,
      title: `Experience: ${exp.role} at ${exp.organization}`,
      category: "experience",
      content: `**${exp.role}** at **${exp.organization}** (${exp.startDate} - ${exp.endDate}):\n- Responsibilities: ${respStr}\n- Technologies: ${techStr}\n- Outcomes: ${outcomesStr}`,
      keywords: [
        "experience",
        "work",
        "job",
        "role",
        "history",
        exp.role.toLowerCase(),
        exp.organization.toLowerCase(),
        ...exp.technologies.map((t) => t.toLowerCase()),
      ],
      url: exp.referenceUrl,
    });
  });

  // 6. Education Chunks
  education.forEach((edu) => {
    corpus.push({
      id: `edu-${edu.id}`,
      sourceId: `src/data/education.json#${edu.id}`,
      title: `Education: ${edu.qualification}`,
      category: "education",
      content: `**${edu.qualification}** — ${edu.institution} (${edu.startDate} - ${edu.endDate}):\n${edu.details}`,
      keywords: [
        "education",
        "degree",
        "university",
        "college",
        "coursework",
        "study",
        "computer science",
        edu.qualification.toLowerCase(),
      ],
      url: edu.referenceUrl,
    });
  });

  return corpus;
}
