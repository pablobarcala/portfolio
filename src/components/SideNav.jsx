"use client"
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { useState } from "react";
import { useCvModal } from "./CvModalProvider";

export default function SideNav({ onHomeClick }) {
    const [open, setOpen] = useState(false);
    const { openCvModal } = useCvModal()

    const contactItems = [
        { 
            key: 'github', 
            label: "GitHub", 
            href: 'https://github.com/pablobarcala',
            icon: <Github size={24} />
        },
        {
            key: "linkedin",
            label: "LinkedIn",
            href: 'https://www.linkedin.com/in/pablo-dami%C3%A1n-barcala-60a1a923a/',
            icon: <Linkedin size={24} />
        },
        {
            key: "email",
            label: "Email",
            href: 'mailto:pablo.d.barcala@gmail.com',
            icon: <Mail size={24} />
        }
    ]

    return(
        <>
            <button
                className="md:hidden fixed left-3 top-3 z-40 p-2 rounded-xl bg-neutral-900/70 text-white border border-white/10 backdrop-blur hover:bg-white/10"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex fixed left-0 top-0 h-screen w-24 z-30 flex-col items-center gap-6 py-4
                        bg-neutral-700/30 backdrop-blur-lg border-r border-neutral-700 shadow-[5px_0px_10px_rgba(0,0,0,0.1)]">
                <p
                    className="font-black text-transparent bg-clip-text text-3xl bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400 animate-gradient cursor-pointer"
                    onClick={onHomeClick}
                >
                    PB
                </p>
                <button
                    onClick={openCvModal}
                    className="text-gray-200/90 hover:text-white hover:bg-white/10 p-2 rounded-xl border border-white/10 transition"
                    aria-label="Download CV (EN  / ESP)"
                    title="Download CV (EN  / ESP)"
                >
                    <FileDown size={22} />
                </button>
                {contactItems.map((item) => (
                    <a target="_blank" key={item.key} href={item.href} className="text-gray-400 hover:text-white transition-colors">
                        {item.icon}
                    </a>
                ))}
            </div>

            {/* Drawer mobile */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                        className="fixed inset-0 bg-black/40 z-40"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        />
                        <motion.aside
                            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-neutral-900/90 backdrop-blur-lg border-r border-white/10 p-4"
                            initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    className="font-black text-transparent bg-clip-text text-2xl bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400 animate-gradient"
                                    onClick={() => { onHomeClick(); setOpen(false); }}
                                >
                                    PB
                                </button>
                                <button
                                    className="p-2 rounded-lg text-white/80 hover:bg-white/10"
                                    onClick={() => setOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="flex flex-col gap-3">
                                <button
                                    onClick={() => { setOpen(false); openCvModal() }}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 text-white/90 hover:bg-white/10"
                                >
                                    <FileDown className="w-5 h-5" />
                                    <span className="text-sm">Download CV (EN / ESP)</span>
                                </button>
                                {contactItems.map((item) => (
                                    <a
                                        key={item.key}
                                        href={item.href}
                                        className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 text-white/90 hover:bg-white/10"
                                        onClick={() => setOpen(false)}
                                        target="_blank"
                                    >
                                        {item.icon}
                                        <span className="text-sm">{item.label}</span>
                                    </a>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}