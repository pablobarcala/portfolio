"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCvModal } from "@/components/CvModalProvider";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { resolveAvatarBadge } from "@/utils/avatarBadge";
import { MessageSquare, ArrowRight, FileText, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  profile?: typeof PORTFOLIO_DATA.profile & { avatarUrl?: string };
  metrics?: typeof PORTFOLIO_DATA.metrics;
}

export default function HeroSection({
  profile = PORTFOLIO_DATA.profile,
  metrics = PORTFOLIO_DATA.metrics,
}: HeroSectionProps) {
  const { language, t } = useLanguage();
  const { openCvModal } = useCvModal();

  const avatarBadgeText = resolveAvatarBadge(
    profile.avatarBadge,
    language,
    profile.name
  );

  const whatsappUrl = `https://wa.me/${profile.whatsappNumber.replace("+", "")}?text=${encodeURIComponent(
    profile.whatsappMessage[language]
  )}`;

  const badgeColors = {
    yellow: "bg-amber-300 text-neutral-950",
    green: "bg-lime-400 text-neutral-950",
    cyan: "bg-sky-400 text-neutral-950",
    orange: "bg-orange-400 text-neutral-950",
  };

  const tagColors: Record<string, string> = {
    amber: "bg-amber-200 text-neutral-900",
    sky: "bg-sky-200 text-neutral-900",
    lime: "bg-lime-200 text-neutral-900",
    orange: "bg-orange-200 text-neutral-900",
    purple: "bg-purple-200 text-neutral-900",
    pink: "bg-pink-200 text-neutral-900",
    yellow: "bg-amber-200 text-neutral-900",
    green: "bg-lime-200 text-neutral-900",
    cyan: "bg-sky-200 text-neutral-900",
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Availability Badge */}
        <div className="flex items-center">
          <div className="neo-badge bg-lime-300 dark:bg-lime-400 text-neutral-950">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>{profile.statusBadge[language]}</span>
          </div>
        </div>

        {/* Hero Main Content & Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-neutral-950 dark:text-neutral-50">
              {language === "es" ? (
                <>
                  Transformo ideas en{" "}
                  <span className="inline-block bg-amber-300 dark:bg-amber-400 text-neutral-950 px-2 py-0.5 rounded-lg border-2 border-neutral-950 shadow-[3px_3px_0px_0px_#000]">
                    productos web
                  </span>{" "}
                  de alto impacto & soluciones de IA.
                </>
              ) : (
                <>
                  Turning ideas into{" "}
                  <span className="inline-block bg-amber-300 dark:bg-amber-400 text-neutral-950 px-2 py-0.5 rounded-lg border-2 border-neutral-950 shadow-[3px_3px_0px_0px_#000]">
                    high-impact
                  </span>{" "}
                  web products & AI solutions.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed max-w-2xl">
              {profile.bio[language]}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#contact"
                className="neo-btn px-5 py-3 bg-amber-300 dark:bg-amber-400 text-neutral-950 text-sm sm:text-base gap-2"
              >
                <span>{t("hero.cta.project")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="neo-btn px-4 py-3 bg-lime-400 text-neutral-950 text-sm sm:text-base gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t("hero.cta.whatsapp")}</span>
              </a>

              <button
                type="button"
                onClick={openCvModal}
                className="neo-btn px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base gap-2"
              >
                <FileText className="w-4 h-4 text-sky-500" />
                <span>{t("hero.cta.cv")}</span>
              </button>
            </div>
          </div>

          {/* Profile Card / Visual Stamp */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs">
              {/* Folder tab on top of profile card */}
              <div className="flex items-center pl-4 -mb-[2px] z-10">
                <div className="h-7 px-3 rounded-t-lg border-2 border-b-0 border-neutral-950 dark:border-neutral-200 bg-sky-400 text-neutral-950 font-black text-xs flex items-center gap-1 shadow-[2px_-2px_0px_0px_#000] dark:shadow-[2px_-2px_0px_0px_rgba(255,255,255,0.7)]">
                  <span className="truncate max-w-[200px]">{avatarBadgeText}</span>
                </div>
              </div>

              <div className="neo-box p-4 bg-white dark:bg-[#18181D] flex flex-col items-center text-center gap-4">
                <div className="relative w-36 h-36 rounded-2xl border-2 border-neutral-950 dark:border-neutral-200 overflow-hidden shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.85)] bg-gradient-to-br from-amber-200 via-sky-200 to-lime-200">
                  <img
                    src={profile.avatarUrl || "/images/retrato1.jpeg"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-black text-lg text-neutral-950 dark:text-neutral-100">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                    {profile.role[language]}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-1 mt-1">
                    📍 {profile.location}
                  </p>
                </div>

                {profile.tags && profile.tags.length > 0 && (
                  <div className="w-full pt-2 border-t-2 border-dashed border-neutral-300 dark:border-neutral-700 flex flex-wrap justify-center gap-2">
                    {profile.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`neo-badge text-[10px] ${
                          tagColors[tag.color || "amber"] ||
                          "bg-amber-200 text-neutral-900"
                        }`}
                      >
                        {tag.label[language] || tag.label.es || tag.label.en}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights / Metric Cards (4 Bento Folders) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
          {metrics.map((m, index) => (
            <div
              key={index}
              className="neo-box p-3.5 sm:p-4 bg-white dark:bg-[#18181D] flex flex-col justify-between gap-1 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`neo-badge text-[10px] px-2 py-0.5 ${badgeColors[m.color]}`}
                >
                  {m.badge}
                </span>
                <CheckCircle2 className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              </div>
              <div className="mt-2">
                <p className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
                  {m.value}
                </p>
                <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 leading-snug">
                  {m.label[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
