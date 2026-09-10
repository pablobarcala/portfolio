"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCvModal } from "@/components/CvModalProvider";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { MessageSquare, Mail, Copy, Check, Linkedin, Github, FileDown, ArrowUpRight } from "lucide-react";

interface ContactSectionProps {
  profile?: typeof PORTFOLIO_DATA.profile;
}

export default function ContactSection({
  profile = PORTFOLIO_DATA.profile,
}: ContactSectionProps) {
  const { language, t } = useLanguage();
  const { openCvModal } = useCvModal();
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/${profile.whatsappNumber.replace("+", "")}?text=${encodeURIComponent(
    profile.whatsappMessage[language]
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t-2 border-neutral-900 dark:border-neutral-200">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Contact Big Neo-Card */}
        <div className="neo-box p-6 sm:p-10 bg-amber-300 dark:bg-amber-400 text-neutral-950 border-2 border-neutral-950 flex flex-col gap-8 shadow-[6px_6px_0px_0px_#000]">
          <div className="flex flex-col gap-3">
            <span className="neo-badge bg-neutral-950 text-amber-300 border-neutral-950 text-xs self-start">
              {t("contact.tag")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {t("contact.title")}
            </h2>
            <p className="text-base sm:text-lg font-bold text-neutral-900/90 max-w-2xl">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="neo-btn p-4 bg-lime-400 text-neutral-950 flex items-center justify-between text-base font-black shadow-[4px_4px_0px_0px_#000] hover:bg-lime-300"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                <span>WhatsApp</span>
              </div>
              <ArrowUpRight className="w-5 h-5" />
            </a>

            {/* Copy Email CTA */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="neo-btn p-4 bg-white text-neutral-950 flex items-center justify-between text-base font-black shadow-[4px_4px_0px_0px_#000] hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3 truncate">
                <Mail className="w-6 h-6 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
              {copied ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Copy className="w-5 h-5 text-neutral-600 shrink-0" />
              )}
            </button>
          </div>

          {copied && (
            <div className="p-3 rounded-xl bg-neutral-950 text-amber-300 font-bold text-xs sm:text-sm text-center border-2 border-neutral-950 animate-bounce">
              ✓ {t("contact.email.copied")}
            </div>
          )}

          {/* Direct Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-neutral-950/20">
            <div className="flex items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="neo-btn p-2.5 bg-sky-400 text-neutral-950 shadow-[2px_2px_0px_0px_#000]"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="neo-btn p-2.5 bg-neutral-950 text-white shadow-[2px_2px_0px_0px_#000]"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            <button
              type="button"
              onClick={openCvModal}
              className="neo-btn px-4 py-2.5 bg-neutral-950 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-[3px_3px_0px_0px_#000]"
            >
              <FileDown className="w-4 h-4 text-amber-300" />
              <span>{t("contact.openCvModal")}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-500 dark:text-neutral-400 pt-6 pb-12 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {profile.name}. {t("footer.rights")}</p>
          <a
            href="#"
            className="hover:text-amber-500 underline underline-offset-4"
          >
            ↑ {language === "es" ? "Volver arriba" : "Back to top"}
          </a>
        </footer>
      </div>
    </section>
  );
}
