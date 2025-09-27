// components/CvModalProvider.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Ctx = { openCvModal: () => void; closeCvModal: () => void }
const CvModalCtx = createContext<Ctx | null>(null)

export function useCvModal() {
  const ctx = useContext(CvModalCtx)
  if (!ctx) throw new Error("useCvModal must be used within <CvModalProvider>")
  return ctx
}

export function CvModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openCvModal = () => setOpen(true)
  const closeCvModal = () => setOpen(false)

  return (
    <CvModalCtx.Provider value={{ openCvModal, closeCvModal }}>
      {children}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              onClick={closeCvModal}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog" aria-modal="true"
              className="fixed z-50 left-1/2 top-1/2 w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2
                         rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur p-4 shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-white font-semibold">Download CV</h3>
                <button onClick={closeCvModal} className="text-white/70 hover:text-white">✕</button>
              </div>
              <p className="text-white/70 text-sm mt-2">Choose a language:</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href="/cv/Curriculum_Pablo_Barcala.pdf"
                  download
                  className="text-center px-3 py-2 rounded-xl border border-white/10 bg-white/10 text-white hover:bg-white/20 transition"
                  onClick={closeCvModal}
                >
                  Español
                </a>
                <a
                  href="/cv/(EN)_CV_Pablo_Barcala.pdf"
                  download
                  className="text-center px-3 py-2 rounded-xl border border-white/10 bg-white/10 text-white hover:bg-white/20 transition"
                  onClick={closeCvModal}
                >
                  English
                </a>
              </div>
              <p className="text-white/50 text-[11px] mt-3">PDF • updated regularly</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CvModalCtx.Provider>
  )
}