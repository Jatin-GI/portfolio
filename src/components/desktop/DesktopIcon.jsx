"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DesktopIcon({
  id,
  icon,
  label,
  selected,
  onSelect,
  onOpen,
}) {
  return (
    <motion.button
      type="button"
      layout={false}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group flex w-[74px] flex-col items-center gap-1 rounded-md px-1 py-1 text-center outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-sky-400/80",
        selected ? "bg-white/25 ring-1 ring-white/30" : "hover:bg-white/15"
      )}
      aria-label={label}
      aria-pressed={selected}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen?.(id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(id);
        }
      }}
    >
      <span className="h-12 w-12 drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]">
        {icon}
      </span>
      <span className="line-clamp-2 max-w-full text-[11px] font-medium leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.95)]">
        {label}
      </span>
    </motion.button>
  );
}
