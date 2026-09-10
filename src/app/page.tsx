import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import { getPortfolioData } from "@/sanity/loader";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main className="min-h-screen flex flex-col transition-colors selection:bg-amber-300 selection:text-neutral-950">
      <Navbar profile={data.profile} />
      <HeroSection profile={data.profile} metrics={data.metrics} />
      <ServicesSection services={data.services} profile={data.profile} />
      <ProjectsSection projects={data.projects} />
      <TechStackSection skillCategories={data.skillCategories} />
      <ExperienceSection timeline={data.timeline} />
      <ContactSection profile={data.profile} />
    </main>
  );
}