"use client";

import React from "react";

interface FolderCardProps {
  color?: "yellow" | "green" | "cyan" | "orange" | "purple" | "pink";
  tabLabel?: string;
  tabIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const colorMap = {
  yellow: "bg-amber-300 text-neutral-900 border-neutral-900 dark:border-neutral-200",
  green: "bg-lime-400 text-neutral-900 border-neutral-900 dark:border-neutral-200",
  cyan: "bg-sky-400 text-neutral-900 border-neutral-900 dark:border-neutral-200",
  orange: "bg-orange-400 text-neutral-900 border-neutral-900 dark:border-neutral-200",
  purple: "bg-purple-400 text-neutral-900 border-neutral-900 dark:border-neutral-200",
  pink: "bg-pink-400 text-neutral-900 border-neutral-900 dark:border-neutral-200",
};

export default function FolderCard({
  color = "yellow",
  tabLabel,
  tabIcon,
  children,
  className = "",
  onClick,
}: FolderCardProps) {
  const tabColorClass = colorMap[color] || colorMap.yellow;

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col pt-3.5 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Folder Tab on Top */}
      <div className="flex items-center pl-4 -mb-[2px] z-10">
        <div
          className={`h-7 px-3.5 rounded-t-lg border-2 border-b-0 flex items-center gap-1.5 font-bold text-xs shadow-[2px_-2px_0px_0px_#000] dark:shadow-[2px_-2px_0px_0px_rgba(255,255,255,0.7)] ${tabColorClass}`}
        >
          {tabIcon}
          {tabLabel && <span>{tabLabel}</span>}
        </div>
      </div>

      {/* Main Folder Box */}
      <div className="neo-box-interactive p-5 md:p-6 flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
