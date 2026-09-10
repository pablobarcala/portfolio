"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Rocket, Sparkles, LayoutGrid, ShieldCheck, ArrowUpRight } from "lucide-react";
import FolderCard from "@/components/FolderCard";

interface ServicesSectionProps {
  services?: typeof PORTFOLIO_DATA.services;
  profile?: typeof PORTFOLIO_DATA.profile;
}

export default function ServicesSection({
  services = PORTFOLIO_DATA.services,
  profile = PORTFOLIO_DATA.profile,
}: ServicesSectionProps) {
  const { language, t } = useLanguage();

  const iconMap = {
    Rocket: <Rocket className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    LayoutGrid: <LayoutGrid className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  };

  const iconBoxBg = {
    yellow: "bg-amber-300",
    green: "bg-lime-400",
    cyan: "bg-sky-400",
    orange: "bg-orange-400",
    purple: "bg-purple-400",
    pink: "bg-pink-400",
  };

  return (
    <section id="services" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t-2 border-neutral-900 dark:border-neutral-200">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="neo-badge bg-amber-300 dark:bg-amber-400 text-neutral-950 text-xs">
              {t("services.tag")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
            {t("services.title")}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl font-medium">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Folder Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service) => {
            const waText = encodeURIComponent(
              language === "es"
                ? `Hola Pablo! Me interesa tu servicio de "${service.title.es}". ¿Podemos conversar?`
                : `Hi Pablo! I'm interested in your "${service.title.en}" service. Can we talk?`
            );
            const serviceWaUrl = `https://wa.me/${profile.whatsappNumber.replace("+", "")}?text=${waText}`;

            return (
              <FolderCard
                key={service.id}
                color={service.folderColor}
                tabLabel={service.deliverables[language]}
                tabIcon={iconMap[service.iconName]}
              >
                <div className="flex flex-col gap-4">
                  {/* Top Row: Square Icon Box & Deliverable Pill */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl border-2 border-neutral-950 dark:border-neutral-200 flex items-center justify-center text-neutral-950 shadow-[2.5px_2.5px_0px_0px_#000] dark:shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,0.85)] ${iconBoxBg[service.folderColor]}`}
                    >
                      {iconMap[service.iconName]}
                    </div>
                    <span className="neo-badge bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px]">
                      {service.deliverables[language]}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2 mt-1">
                    <h3 className="text-xl font-black text-neutral-950 dark:text-neutral-100 leading-tight">
                      {service.title[language]}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                      {service.description[language]}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 mt-4 border-t-2 border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                    {language === "es" ? "Presupuesto & alcance en 24h" : "Scope & quote in 24h"}
                  </span>
                  <a
                    href={serviceWaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn px-3 py-1.5 text-xs bg-neutral-950 dark:bg-neutral-100 text-white dark:text-neutral-950 font-bold gap-1"
                  >
                    <span>{language === "es" ? "Consultar" : "Inquire"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </FolderCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
