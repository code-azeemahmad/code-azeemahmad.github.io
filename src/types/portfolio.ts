export interface Profile {
  name: string;
  headline: string;
  shortBio: string;
  fullBio: string;
  focusAreas: string[];
  location?: string;
  email?: string;
  website: string;
  github: string;
  linkedin?: string;
  resumeUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  outcomes?: string[];
  repository?: string;
  demo?: string;
  status: "active" | "completed" | "in-progress" | "archived";
  featured?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  audience: string;
  contribution: string;
  features: string[];
  status: "idea" | "active" | "maintained" | "archived";
  website?: string;
  documentation?: string;
}

export interface SkillItem {
  name: string;
  evidence?: string;
  tags?: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  location?: string;
  responsibilities: string[];
  outcomes?: string[];
  technologies: string[];
  referenceUrl?: string;
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  startDate: string;
  endDate: string;
  details: string;
  referenceUrl?: string;
}

export interface ChatMessageTemplate {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface FeaturedChatTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  messages: ChatMessageTemplate[];
  suggestedQuestions?: string[];
}
