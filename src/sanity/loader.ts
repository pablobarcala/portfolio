import { client } from "./client";
import {
  PROFILE_QUERY,
  PROJECTS_QUERY,
  SERVICES_QUERY,
  SKILL_CATEGORIES_QUERY,
  TIMELINE_QUERY,
} from "./queries";
import {
  PORTFOLIO_DATA,
  ProjectItem,
  ServiceItem,
  TimelineItem,
  SkillCategory,
} from "@/data/portfolioData";
import { urlFor } from "./image";

export async function getPortfolioData() {
  const revalidateTime = process.env.NODE_ENV === "development" ? 0 : 60;

  try {
    const [profileDoc, projectsDoc, servicesDoc, timelineDoc, skillsDoc] =
      await Promise.all([
        client.fetch(PROFILE_QUERY, {}, { next: { revalidate: revalidateTime } }),
        client.fetch(PROJECTS_QUERY, {}, { next: { revalidate: revalidateTime } }),
        client.fetch(SERVICES_QUERY, {}, { next: { revalidate: revalidateTime } }),
        client.fetch(TIMELINE_QUERY, {}, { next: { revalidate: revalidateTime } }),
        client.fetch(SKILL_CATEGORIES_QUERY, {}, { next: { revalidate: revalidateTime } }),
      ]);

    const profile = profileDoc
      ? {
          name: profileDoc.name || PORTFOLIO_DATA.profile.name,
          role: {
            es: profileDoc.role?.es || PORTFOLIO_DATA.profile.role.es,
            en: profileDoc.role?.en || PORTFOLIO_DATA.profile.role.en,
          },
          location: profileDoc.location || PORTFOLIO_DATA.profile.location,
          email: profileDoc.email || PORTFOLIO_DATA.profile.email,
          whatsappNumber:
            profileDoc.whatsappNumber || PORTFOLIO_DATA.profile.whatsappNumber,
          whatsappMessage: {
            es:
              profileDoc.whatsappMessage?.es ||
              PORTFOLIO_DATA.profile.whatsappMessage.es,
            en:
              profileDoc.whatsappMessage?.en ||
              PORTFOLIO_DATA.profile.whatsappMessage.en,
          },
          github: profileDoc.github || PORTFOLIO_DATA.profile.github,
          linkedin: profileDoc.linkedin || PORTFOLIO_DATA.profile.linkedin,
          statusBadge: {
            es:
              profileDoc.statusBadge?.es ||
              PORTFOLIO_DATA.profile.statusBadge.es,
            en:
              profileDoc.statusBadge?.en ||
              PORTFOLIO_DATA.profile.statusBadge.en,
          },
          bio: {
            es: profileDoc.bio?.es || PORTFOLIO_DATA.profile.bio.es,
            en: profileDoc.bio?.en || PORTFOLIO_DATA.profile.bio.en,
          },
          avatarUrl: profileDoc.avatar
            ? urlFor(profileDoc.avatar).url()
            : undefined,
        }
      : PORTFOLIO_DATA.profile;

    const metrics =
      profileDoc?.metrics && profileDoc.metrics.length > 0
        ? profileDoc.metrics.map((m: any) => ({
            value: m.value || "",
            label: { es: m.label?.es || "", en: m.label?.en || "" },
            badge: m.badge || "",
            color: (m.color as "yellow" | "green" | "cyan" | "orange") || "yellow",
          }))
        : PORTFOLIO_DATA.metrics;

    const projects: ProjectItem[] =
      projectsDoc && projectsDoc.length > 0
        ? projectsDoc.map((p: any) => ({
            id: p.slug || p._id,
            title: p.title || "",
            category: p.category || "labs",
            tag: { es: p.tag?.es || "", en: p.tag?.en || "" },
            folderColor: p.folderColor || "yellow",
            problem: { es: p.problem?.es || "", en: p.problem?.en || "" },
            solution: { es: p.solution?.es || "", en: p.solution?.en || "" },
            impact: { es: p.impact?.es || "", en: p.impact?.en || "" },
            stack: p.stack || [],
            image: p.image?.asset ? urlFor(p.image).url() : "/images/portfolio.png",
            link: p.link || undefined,
            github: p.github || undefined,
            confidential: p.confidential || false,
          }))
        : PORTFOLIO_DATA.projects;

    const services: ServiceItem[] =
      servicesDoc && servicesDoc.length > 0
        ? servicesDoc.map((s: any) => ({
            id: s.serviceId || s._id,
            title: { es: s.title?.es || "", en: s.title?.en || "" },
            deliverables: {
              es: s.deliverables?.es || "",
              en: s.deliverables?.en || "",
            },
            description: {
              es: s.description?.es || "",
              en: s.description?.en || "",
            },
            folderColor: s.folderColor || "yellow",
            iconName: s.iconName || "Rocket",
          }))
        : PORTFOLIO_DATA.services;

    const timeline: TimelineItem[] =
      timelineDoc && timelineDoc.length > 0
        ? timelineDoc.map((t: any) => ({
            period: t.period || "",
            role: { es: t.role?.es || "", en: t.role?.en || "" },
            organization: {
              es: t.organization?.es || "",
              en: t.organization?.en || "",
            },
            description: {
              es: t.description?.es || "",
              en: t.description?.en || "",
            },
            bullets: {
              es: t.bulletsEs || [],
              en: t.bulletsEn || [],
            },
            type: t.type || "experience",
            accentColor: t.accentColor || "yellow",
          }))
        : PORTFOLIO_DATA.timeline;

    const skillCategories: SkillCategory[] =
      skillsDoc && skillsDoc.length > 0
        ? skillsDoc.map((s: any) => ({
            category: { es: s.category?.es || "", en: s.category?.en || "" },
            accentColor: s.accentColor || "yellow",
            skills: s.skills || [],
          }))
        : PORTFOLIO_DATA.skillCategories;

    return {
      profile,
      metrics,
      projects,
      services,
      timeline,
      skillCategories,
    };
  } catch (error) {
    console.error(
      "Failed to fetch data from Sanity, falling back to local data:",
      error
    );
    return PORTFOLIO_DATA;
  }
}
