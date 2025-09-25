// Reusable
type BtnProps = {
  label: string
  className?: string
  children: React.ReactNode,
  onClick: () => void
}

export default function IconButtonWithTooltip({ label, className = "", children, onClick }: BtnProps) {
  return (
    <div className="relative z-30 flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        className={`z-30 cursor-pointer flex flex-col items-center justify-center gap-2 p-5 
                    backdrop-blur-xl border border-neutral-100/20 rounded-full shadow-lg
                    hover:scale-105 transition-transform duration-300 ${className}`}
        aria-label={label}
      >
        {children}
      </button>
      <span className="hidden md:block backdrop-blur-lg bg-neutral-800/30 py-1 px-4 text-neutral-300 text-sm rounded-full border border-neutral-600/30">
        {label}
      </span>
    </div>
  )
}