// HomeBtns.tsx
import { Blocks, BriefcaseBusiness, FolderCode, GraduationCap, UserRound } from "lucide-react"
import IconButtonWithTooltip from "./IconButtonWithTooltip"

type Props = {
  dock?: "center" | "bottom"
  onSelectTopic?: (t: "me" | "stack" | "projects" | "experience" | "education") => void
}

export default function HomeBtns({ dock = "center", onSelectTopic }: Props) {
  const baseWrap =
    dock === "center"
      ? "w-full flex flex-wrap items-center justify-center gap-4 md:gap-10"
      : "w-full flex flex-wrap items-center justify-center gap-3 md:gap-6 pt-1 md:pt-2"

  const btnCls = "p-3 md:p-5"
  const iconCls = "w-6 h-6 md:w-8 md:h-8"

  return (
    <div className={baseWrap}>
      <IconButtonWithTooltip className={`bg-emerald-500/30 ${btnCls}`} onClick={() => onSelectTopic?.("me")} label="About me">
        <UserRound className={iconCls} />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip className={`bg-cyan-500/30 ${btnCls}`} onClick={() => onSelectTopic?.("projects")} label="Projects">
        <FolderCode className={iconCls} />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip className={`bg-purple-500/30 ${btnCls}`} onClick={() => onSelectTopic?.("stack")} label="Stack">
        <Blocks className={iconCls} />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip className={`bg-red-500/30 ${btnCls}`} onClick={() => onSelectTopic?.("experience")} label="Jobs">
        <BriefcaseBusiness className={iconCls} />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip className={`bg-amber-500/30 ${btnCls}`} onClick={() => onSelectTopic?.("education")} label="Education">
        <GraduationCap className={iconCls} />
      </IconButtonWithTooltip>
    </div>
  )
}
