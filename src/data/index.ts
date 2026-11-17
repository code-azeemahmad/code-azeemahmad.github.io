import profileJson from "./profile.json";
import projectsJson from "./projects.json";
import productsJson from "./products.json";
import skillsJson from "./skills.json";
import experienceJson from "./experience.json";
import educationJson from "./education.json";

import aboutMeChat from "./featured-chats/about-me.json";
import projectsChat from "./featured-chats/projects.json";
import experienceChat from "./featured-chats/experience.json";
import productsChat from "./featured-chats/products.json";
import skillsChat from "./featured-chats/skills.json";
import contactChat from "./featured-chats/contact.json";

import type {
  Profile,
  Project,
  Product,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  FeaturedChatTemplate,
} from "@/types/portfolio";
import type { Conversation } from "@/types/chat";

export const profile: Profile = profileJson as Profile;
export const projects: Project[] = projectsJson as Project[];
export const products: Product[] = productsJson as Product[];
export const skills: SkillCategory[] = skillsJson as SkillCategory[];
export const experience: ExperienceItem[] = experienceJson as ExperienceItem[];
export const education: EducationItem[] = educationJson as EducationItem[];

export const featuredChats: FeaturedChatTemplate[] = [
  aboutMeChat as FeaturedChatTemplate,
  projectsChat as FeaturedChatTemplate,
  experienceChat as FeaturedChatTemplate,
  productsChat as FeaturedChatTemplate,
  skillsChat as FeaturedChatTemplate,
  contactChat as FeaturedChatTemplate,
];

export const featuredChatsMap: Record<string, FeaturedChatTemplate> = {
  "about-me": aboutMeChat as FeaturedChatTemplate,
  projects: projectsChat as FeaturedChatTemplate,
  experience: experienceChat as FeaturedChatTemplate,
  products: productsChat as FeaturedChatTemplate,
  skills: skillsChat as FeaturedChatTemplate,
  contact: contactChat as FeaturedChatTemplate,
};

export function getFeaturedChatById(id: string): FeaturedChatTemplate | undefined {
  return featuredChatsMap[id];
}

/**
 * Creates canonical, preloaded portfolio conversations from the verified featured chat templates.
 * These represent the source-controlled, immutable ground truth about Azeem Ahmad's work.
 */
export function createPreloadedConversations(): Conversation[] {
  // Fixed baseline epoch to guarantee stable IDs and timestamps
  const baseTimestamp = 1710000000000;

  return featuredChats.map((template, idx) => ({
    id: `preloaded-${template.id}`,
    title: template.title,
    createdAt: baseTimestamp + idx * 1000,
    updatedAt: baseTimestamp + idx * 1000,
    isFeaturedFork: true,
    isPreloaded: true,
    featuredTopicId: template.id,
    messages: template.messages.map((m, mIdx) => ({
      id: `${template.id}-msg-${mIdx + 1}`,
      role: m.role,
      content: m.content,
      timestamp: baseTimestamp + idx * 1000 + (mIdx + 1) * 100,
    })),
  }));
}
