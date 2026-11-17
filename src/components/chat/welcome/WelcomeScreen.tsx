import * as React from "react";
import { FolderGit2, GraduationCap, Cpu, Mail, ArrowUpRight } from "lucide-react";

export interface PromptSuggestion {
  id: string;
  category: string;
  title: string;
  prompt: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SUGGESTED_PROMPTS: PromptSuggestion[] = [
  {
    id: "projects",
    category: "Projects",
    title: "Software Projects",
    prompt: "What software projects has Azeem built and what technologies were used?",
    icon: FolderGit2,
  },
  {
    id: "about",
    category: "Background",
    title: "Background & Studies",
    prompt: "Tell me about Azeem's background, studies, and areas of interest.",
    icon: GraduationCap,
  },
  {
    id: "skills",
    category: "Technical Stack",
    title: "Skills & Technologies",
    prompt: "What are Azeem's primary technical skills, programming languages, and tools?",
    icon: Cpu,
  },
  {
    id: "contact",
    category: "Connect",
    title: "Contact & Opportunities",
    prompt: "How can I contact Azeem or discuss potential opportunities?",
    icon: Mail,
  },
];

export interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
}

export function WelcomeScreen({ onSelectPrompt }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full my-auto px-3.5 sm:px-4 py-3 sm:py-5 max-w-3xl mx-auto w-full text-center">
      {/* Profile Avatar */}
      <div className="mb-2.5 sm:mb-3.5">
        <img
          src="/azeempic.jpeg"
          alt="Azeem Ahmad"
          className="h-32 w-32 sm:h-60 sm:w-60 rounded-full object-cover object-[40%_20%] border-2 sm:border-[2.5px] border-primary shadow-md"
          loading="eager"
        />
      </div>

      {/* Main Editorial Headline */}
      <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-[-0.03em] text-ink leading-tight transition-colors">
        Hi, I'm <span className="text-primary">Azeem Ahmad</span>
      </h1>
      <p className="mt-1.5 text-xs sm:text-sm font-normal text-body tracking-normal transition-colors">
        Computer Science Student &bull; AI Engineer &bull; Tech Enthusiast
      </p>

      {/* Description */}
      <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted leading-relaxed transition-colors px-2">
        Ask anything about my software engineering projects, technical capabilities, or background.
        All responses are verified against my portfolio knowledge base.
      </p>

      {/* Suggested prompts grid */}
      <div className="mt-4 sm:mt-5 grid w-full grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
        {SUGGESTED_PROMPTS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group relative flex flex-col justify-between rounded-xl border border-hairline bg-surface-card p-3 sm:p-3.5 transition-all hover:bg-surface-cream-strong hover:border-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer text-left shadow-xs"
              aria-label={`Ask: ${item.prompt}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="uppercase tracking-wider text-[10px] sm:text-[11px]">{item.category}</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>

              <div className="mt-2">
                <div className="font-serif text-sm sm:text-base font-medium text-ink tracking-tight transition-colors">
                  {item.title}
                </div>
                <div className="text-[11px] sm:text-xs text-muted line-clamp-2 mt-1 leading-relaxed transition-colors">
                  "{item.prompt}"
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
