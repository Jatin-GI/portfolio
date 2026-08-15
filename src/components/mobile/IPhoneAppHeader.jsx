"use client";

import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** iOS-style navigation bar for fullscreen mobile apps */
export default function IPhoneAppHeader({ title, icon, onClose }) {
  return (
    <div
      className={cn(
        "iphone-app-header flex h-12 shrink-0 items-center gap-1 border-b border-white/10 bg-[#1c1c1e]/95 px-2 pt-0 backdrop-blur-xl"
      )}
    >
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-0.5 rounded-lg px-1.5 py-1.5 text-[#0a84ff] active:opacity-60"
        aria-label="Back to Home Screen"
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={2.25} />
        <span className="text-[16px] font-normal">Home</span>
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 pr-14">
        {icon ? (
          <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
        ) : null}
        <span className="truncate text-[16px] font-semibold text-white">{title}</span>
      </div>
    </div>
  );
}
