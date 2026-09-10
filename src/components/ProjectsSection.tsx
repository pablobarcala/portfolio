"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";
import { ExternalLink, Github, Lock, Layers } from "lucide-react";
import FolderCard from "@/components/FolderCard";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectsSectionProps {
  projects?: ProjectItem[];
}

export default function ProjectsSection({
  projects = PORTFOLIO_DATA.projects,
}: ProjectsSectionProps) {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: t("projects.filter.all") },
    { id: "client_b2b", label: t("projects.filter.client_b2b") },
    { id: "saas_ai", label: t("projects.filter.saas_ai") },
    { id: "labs", label: t("projects.filter.labs") },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t-2 border-neutral-900 dark:border-neutral-200">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="neo-badge bg-sky-400 text-neutral-950 text-xs">
                {t("projects.tag")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
              {t("projects.title")}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl font-medium">
              {t("projects.subtitle")}
            </p>
          </div>

          {/* Filter Tabs (Neo-Brutalist Pills) */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`neo-btn px-3.5 py-1.5 text-xs font-black transition-all ${
                    isActive
                      ? "bg-amber-300 dark:bg-amber-400 text-neutral-950 shadow-[3px_3px_0px_0px_#000]"
                      : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: ProjectItem) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <FolderCard
                  color={project.folderColor}
                  tabLabel={project.tag[language]}
                  tabIcon={<Layers className="w-3.5 h-3.5" />}
                  className="h-full"
                >
                  <div className="flex flex-col gap-5 flex-1">
                    {/* Project Image & Badge Header */}
                    <div className="relative rounded-xl border-2 border-neutral-950 dark:border-neutral-200 overflow-hidden shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)] aspect-video bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                      />
                      {project.confidential && (
                        <div className="absolute top-2.5 right-2.5">
                          <span className="neo-badge bg-neutral-900 text-amber-300 border-amber-300 text-[10px]">
                            <Lock className="w-3 h-3" />
                            <span>{t("projects.badge.confidential")}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-2xl font-black text-neutral-950 dark:text-neutral-100 tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Case Study Breakdown (Problem, Solution, Impact) */}
                    <div className="flex flex-col gap-3 text-xs sm:text-sm font-medium">
                      <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500">
                        <span className="font-extrabold text-red-700 dark:text-red-400 block mb-0.5">
                          {t("projects.label.problem")}
                        </span>
                        <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
                          {project.problem[language]}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500">
                        <span className="font-extrabold text-blue-700 dark:text-blue-400 block mb-0.5">
                          {t("projects.label.solution")}
                        </span>
                        <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
                          {project.solution[language]}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500">
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                          {t("projects.label.impact")}
                        </span>
                        <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed font-semibold">
                          {project.impact[language]}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="neo-badge bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions / Links */}
                  <div className="pt-5 mt-4 border-t-2 border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="neo-btn px-3.5 py-1.5 text-xs bg-amber-300 dark:bg-amber-400 text-neutral-950 font-black gap-1.5"
                        >
                          <span>{t("projects.btn.live")}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="neo-btn px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-bold gap-1.5"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>{t("projects.btn.github")}</span>
                        </a>
                      )}

                      {project.confidential && !project.link && (
                        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>{language === "es" ? "Código privado por NDA" : "Private under NDA"}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </FolderCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
