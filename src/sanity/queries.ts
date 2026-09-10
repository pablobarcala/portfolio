import { defineQuery } from "next-sanity";

export const PROFILE_QUERY = defineQuery(`
  *[_type == "profile"][0]{
    _id,
    name,
    role,
    location,
    email,
    whatsappNumber,
    whatsappMessage,
    github,
    linkedin,
    statusBadge,
    bio,
    avatar,
    metrics[]{
      _key,
      value,
      label,
      badge,
      color
    }
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(orderRank asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    tag,
    folderColor,
    problem,
    solution,
    impact,
    stack,
    image,
    link,
    github,
    confidential,
    orderRank
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(orderRank asc, _createdAt asc){
    _id,
    serviceId,
    title,
    deliverables,
    description,
    folderColor,
    iconName,
    orderRank
  }
`);

export const TIMELINE_QUERY = defineQuery(`
  *[_type == "timeline"] | order(orderRank asc, _createdAt desc){
    _id,
    period,
    role,
    organization,
    description,
    bulletsEs,
    bulletsEn,
    type,
    accentColor,
    orderRank
  }
`);

export const SKILL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "skillCategory"] | order(orderRank asc, _createdAt asc){
    _id,
    category,
    accentColor,
    skills,
    orderRank
  }
`);
