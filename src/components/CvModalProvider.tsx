"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileDown, X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Ctx = { openCvModal: () => void; closeCvModal: () => void };
const CvModalCtx = createContext<Ctx | null>(null);

export function useCvModal() {
  const ctx = useContext(CvModalCtx);
  if (!ctx) throw new Error("useCvModal must be used within <CvModalProvider>");
  return ctx;
}

export function CvModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const openCvModal = () => setOpen(true);
  const closeCvModal = () => setOpen(false);

  return (
    <CvModalCtx.Provider value={{ openCvModal, closeCvModal }}>
      {children}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm"
              onClick={closeCvModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Dialog (Neo-Brutalist) */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative z-50 w-full max-w-md pt-3"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {/* Folder tab on top */}
              <div className="flex items-center pl-4 -mb-[2px]">
                <div className="h-7 px-3.5 rounded-t-lg border-2 border-b-0 border-neutral-950 dark:border-neutral-200 bg-amber-300 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-[2px_-2px_0px_0px_#000]">
                  <FileDown className="w-3.5 h-3.5" />
                  <span>PDF Downloads</span>
                </div>
              </div>

              {/* Main Box */}
              <div className="neo-box p-6 bg-white dark:bg-[#18181D] flex flex-col gap-5 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.9)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-black text-neutral-950 dark:text-neutral-100">
                      {t("cvModal.title")}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                      {t("cvModal.subtitle")}
                    </p>
                  </div>
                  <button
                    onClick={closeCvModal}
                    className="neo-btn p-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-red-400 hover:text-white"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href="/cv/Curriculum_Pablo_Barcala.pdf"
                    download="CV_Pablo_Barcala_ES.pdf"
                    className="neo-btn p-3.5 bg-amber-300 dark:bg-amber-400 text-neutral-950 text-xs sm:text-sm font-black flex items-center justify-center gap-2"
                    onClick={closeCvModal}
                  >
                    <FileDown className="w-4 h-4" />
                    <span>{t("cvModal.es")}</span>
                  </a>

                  <a
                    href="/cv/(EN)_CV_Pablo_Barcala.pdf"
                    download="CV_Pablo_Barcala_EN.pdf"
                    className="neo-btn p-3.5 bg-lime-400 dark:bg-lime-400 text-neutral-950 text-xs sm:text-sm font-black flex items-center justify-center gap-2"
                    onClick={closeCvModal}
                  >
                    <FileDown className="w-4 h-4" />
                    <span>{t("cvModal.en")}</span>
                  </a>
                </div>

                <div className="pt-3 border-t-2 border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t("cvModal.footer")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CvModalCtx.Provider>
  );
}