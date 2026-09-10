"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Code2, Database, Sparkles, TestTube2, Award } from "lucide-react";
import FolderCard from "@/components/FolderCard";

interface TechStackSectionProps {
  skillCategories?: typeof PORTFOLIO_DATA.skillCategories;
}

export default function TechStackSection({
  skillCategories = PORTFOLIO_DATA.skillCategories,
}: TechStackSectionProps) {
  const { language, t } = useLanguage();

  const categoryIcons = [
    <Code2 key="front" className="w-4 h-4" />,
    <Database key="back" className="w-4 h-4" />,
    <Sparkles key="ai" className="w-4 h-4" />,
    <TestTube2 key="test" className="w-4 h-4" />,
  ];

  return (
    <section id="stack" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t-2 border-neutral-900 dark:border-neutral-200">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="neo-badge bg-lime-400 text-neutral-950 text-xs">
              {t("stack.tag")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
            {t("stack.title")}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl font-medium">
            {t("stack.subtitle")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <FolderCard
              key={idx}
              color={cat.accentColor}
              tabLabel={cat.category[language]}
              tabIcon={categoryIcons[idx]}
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-black text-neutral-950 dark:text-neutral-100 flex items-center gap-2">
                  <span>{cat.category[language]}</span>
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="neo-badge bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-xs hover:-translate-y-0.5 transition-transform"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FolderCard>
          ))}
        </div>

        {/* Engineering Principles Bento Card */}
        <div className="neo-box p-6 sm:p-8 bg-amber-50 dark:bg-neutral-900/60 border-2 border-neutral-950 dark:border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-neutral-950/10 dark:border-neutral-200/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-300 dark:bg-amber-400 text-neutral-950 border-2 border-neutral-950 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#000]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-neutral-950 dark:text-neutral-100">
                  {t("stack.principles.title")}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-bold">
                  {language === "es" ? "Filosofía de trabajo orientada a robustez & escalabilidad" : "Development philosophy focused on robustness & scalability"}
                </p>
              </div>
            </div>

            <span className="neo-badge bg-emerald-400 text-neutral-950 text-xs self-start md:self-auto">
              ✓ UNSTA Certified Software Quality
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl border-2 border-neutral-950 dark:border-neutral-200 bg-white dark:bg-neutral-800 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)] flex flex-col gap-2">
              <span className="font-extrabold text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                01. Testing Rigor
              </span>
              <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                {t("stack.principle.tdd")}
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-neutral-950 dark:border-neutral-200 bg-white dark:bg-neutral-800 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)] flex flex-col gap-2">
              <span className="font-extrabold text-xs text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                02. Architecture
              </span>
              <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                {t("stack.principle.arch")}
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-neutral-950 dark:border-neutral-200 bg-white dark:bg-neutral-800 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)] flex flex-col gap-2">
              <span className="font-extrabold text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                03. Pragmatic AI
              </span>
              <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                {t("stack.principle.ai")}
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-neutral-950 dark:border-neutral-200 bg-white dark:bg-neutral-800 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)] flex flex-col gap-2">
              <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                04. Agile & Comms
              </span>
              <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                {t("stack.principle.agile")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
