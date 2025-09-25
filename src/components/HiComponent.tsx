type Props = { compact?: boolean, onHomeClick?: () => void }

export default function HiComponent({ compact = false, onHomeClick }: Props) {
    return (
        <div className={`w-full ${compact ? "pt-6 pb-3" : "py-16"}`}>
            <div className="flex flex-col items-center gap-2">
                {compact
                ?
                    null
                :
                    <>
                        <p className={`font-bold z-40 ${compact ? "text-2xl" : "text-3xl"}`}>Hi! 👋🏼</p>
                        <p className={`z-40 ${compact ? "text-sm md:text-base" : "text-lg md:text-xl"}`}>
                            I'm Pablo Barcala, and this is my portfolio
                        </p>
                    </>
                }
                <img
                    src="images/retrato-ia.png"
                    alt="Imagen personal"
                    className={`bg-gradient-to-br from-neutral-100 to-neutral-500 rounded-full mx-auto object-cover z-40 shadow-[0px_5px_10px_rgba(255,255,255,0.3)]
                    transition-all duration-300
                    ${compact ? "w-24 h-24 md:w-28 md:h-28" : "w-32 h-32 md:w-44 md:h-44"}`}
                    onClick={onHomeClick}
                />
            </div>
        </div>
    )
}