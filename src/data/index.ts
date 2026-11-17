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
