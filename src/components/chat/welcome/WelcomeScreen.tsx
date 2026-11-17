import * as React from "react";
import { FolderGit2, GraduationCap, Cpu, Mail, ArrowUpRight } from "lucide-react";
import { SpikeMark } from "@/components/ui/SpikeMark";

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
      {/* Brand Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e6dfd8] bg-[#efe9de] px-3.5 py-1 text-xs font-medium text-[#141413]">
        <SpikeMark className="h-3.5 w-3.5 text-[#cc785c]" />
        <span>Grounded AI Portfolio Assistant</span>
      </div>

      {/* Main Editorial Headline */}
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-[#141413] leading-tight">
        Hi, I'm <span className="text-[#cc785c]">Azeem Ahmad</span>
      </h1>
      <p className="mt-2.5 text-sm sm:text-base font-normal text-[#3d3d3a] tracking-normal">
        Computer Science Student &bull; Developer &bull; Tech Enthusiast
      </p>

      {/* Description */}
      <p className="mt-3 max-w-xl text-xs sm:text-sm text-[#6c6a64] leading-relaxed">
        Ask anything about my software engineering projects, technical capabilities, or background.
        All responses are verified against my portfolio knowledge base.
      </p>

      {/* Suggested prompts grid: warm cream cards */}
      <div className="mt-8 grid w-full grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        {SUGGESTED_PROMPTS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group relative flex flex-col justify-between rounded-xl border border-[#e6dfd8] bg-[#efe9de] p-4.5 transition-all hover:bg-[#e8e0d2] hover:border-[#d4cbbe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc785c]/30 cursor-pointer text-left shadow-xs"
              aria-label={`Ask: ${item.prompt}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-[#cc785c]">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="uppercase tracking-wider text-[11px]">{item.category}</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#8e8b82] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#cc785c]" />
              </div>

              <div className="mt-2.5">
                <div className="font-serif text-base font-medium text-[#141413] tracking-tight transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-[#6c6a64] line-clamp-2 mt-1 leading-relaxed">
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
