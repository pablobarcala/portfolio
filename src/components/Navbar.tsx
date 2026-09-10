"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useCvModal } from "@/components/CvModalProvider";
import { Sun, Moon, FileDown, Menu, X, Globe } from "lucide-react";

interface NavbarProps {
  profile?: typeof PORTFOLIO_DATA.profile;
}

export default function Navbar({ profile = PORTFOLIO_DATA.profile }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { openCvModal } = useCvModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initials = profile.name
    ? profile.name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PB";

  const navLinks = [
    { href: "#services", label: t("nav.services") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#stack", label: t("nav.stack") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 sm:px-6 lg:px-8 backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#0F0F12]/90 border-b-2 border-neutral-900 dark:border-neutral-200 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-black text-xl tracking-tight"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-300 dark:bg-amber-400 text-neutral-950 border-2 border-neutral-950 dark:border-neutral-100 flex items-center justify-center font-black text-lg shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.9)] group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 transition-all">
            {initials}
          </div>
          <span className="hidden sm:inline-block font-extrabold text-neutral-900 dark:text-neutral-100">
            {profile.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-neutral-800 dark:text-neutral-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="neo-btn px-2.5 py-1.5 text-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 flex items-center gap-1"
            title="Cambiar idioma / Switch language"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-extrabold uppercase">{language}</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="neo-btn p-2 text-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            title="Cambiar tema / Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-neutral-900" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* CV Button */}
          <button
            type="button"
            onClick={openCvModal}
            className="neo-btn px-3 py-1.5 text-xs bg-lime-400 dark:bg-lime-400 text-neutral-950 flex items-center gap-1.5 font-black shadow-[2.5px_2.5px_0px_0px_#000]"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("nav.downloadCv")}</span>
            <span className="sm:hidden">CV</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden neo-btn p-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t-2 border-neutral-900 dark:border-neutral-200">
          <nav className="flex flex-col gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg font-bold text-sm text-neutral-900 dark:text-neutral-100 hover:bg-amber-300/40 dark:hover:bg-amber-400/20 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
