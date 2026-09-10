"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PORTFOLIO_DATA, TimelineItem } from "@/data/portfolioData";
import { GraduationCap, Briefcase, Calendar, CheckCircle2 } from "lucide-react";

interface ExperienceSectionProps {
  timeline?: TimelineItem[];
}

export default function ExperienceSection({
  timeline = PORTFOLIO_DATA.timeline,
}: ExperienceSectionProps) {
  const { language, t } = useLanguage();

  const accentColors = {
    yellow: "bg-amber-300 text-neutral-950 border-neutral-950",
    green: "bg-lime-400 text-neutral-950 border-neutral-950",
    cyan: "bg-sky-400 text-neutral-950 border-neutral-950",
    orange: "bg-orange-400 text-neutral-950 border-neutral-950",
    purple: "bg-purple-400 text-neutral-950 border-neutral-950",
  };

  return (
    <section id="experience" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t-2 border-neutral-900 dark:border-neutral-200">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="neo-badge bg-orange-400 text-neutral-950 text-xs">
              {t("timeline.tag")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
            {t("timeline.title")}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl font-medium">
            {t("timeline.subtitle")}
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-8 border-l-4 border-neutral-950 dark:border-neutral-200 space-y-8">
          {timeline.map((item: TimelineItem, index: number) => {
            const isEdu = item.type === "education";

            return (
              <div key={index} className="relative group">
                {/* Timeline Dot Icon */}
                <div
                  className={`absolute -left-[38px] sm:-left-[46px] top-1.5 w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-neutral-950 dark:border-neutral-200 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] ${
                    accentColors[item.accentColor]
                  }`}
                >
                  {isEdu ? (
                    <GraduationCap className="w-5 h-5" />
                  ) : (
                    <Briefcase className="w-5 h-5" />
                  )}
                </div>

                {/* Content Card */}
                <div className="neo-box-interactive p-5 sm:p-6 bg-white dark:bg-[#18181D] flex flex-col gap-3">
                  {/* Top Bar: Period & Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="neo-badge bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-black">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </span>

                    <span
                      className={`neo-badge text-[11px] font-black ${
                        isEdu ? "bg-sky-200 text-neutral-950" : "bg-lime-200 text-neutral-950"
                      }`}
                    >
                      {isEdu ? (language === "es" ? "Educación & Grado" : "Education & Degree") : (language === "es" ? "Experiencia" : "Experience")}
                    </span>
                  </div>

                  {/* Role & Org */}
                  <div>
                    <h3 className="text-xl font-black text-neutral-950 dark:text-neutral-100 leading-tight">
                      {item.role[language]}
                    </h3>
                    <p className="text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
                      {item.organization[language]}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                    {item.description[language]}
                  </p>

                  {/* Bullets */}
                  {item.bullets[language] && item.bullets[language].length > 0 && (
                    <ul className="pt-2 border-t-2 border-neutral-100 dark:border-neutral-800 space-y-1.5">
                      {item.bullets[language].map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
