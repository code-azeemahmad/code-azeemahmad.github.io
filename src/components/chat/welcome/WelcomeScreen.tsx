import * as React from "react";
import { FolderGit2, GraduationCap, Cpu, Mail, Sparkles, ArrowUpRight } from "lucide-react";

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
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto w-full text-center">
      {/* Avatar / Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-medium text-blue-400">
        <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
        <span>Grounded AI Portfolio Assistant</span>
      </div>

      {/* Main Greeting */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
        Hi, I'm <span className="text-blue-400">Azeem Ahmad</span>
      </h1>
      <p className="mt-2 text-sm sm:text-base font-medium text-neutral-400">
        Computer Science Student &bull; Developer &bull; Tech Enthusiast
      </p>

      {/* Description */}
      <p className="mt-3 max-w-xl text-xs sm:text-sm text-neutral-400 leading-relaxed">
        Ask anything about my software projects, technical capabilities, or background.
        Answers are verified from my portfolio knowledge base.
      </p>

      {/* Suggested prompts grid */}
      <div className="mt-8 grid w-full grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        {SUGGESTED_PROMPTS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group relative flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer text-left shadow-sm"
              aria-label={`Ask: ${item.prompt}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-400">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.category}</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-300" />
              </div>

              <div className="mt-2.5">
                <div className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-neutral-500 line-clamp-2 mt-1">
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
