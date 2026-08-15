"use client";

import { useClock } from "@/hooks/useClock";
import { BatteryFull, SignalHigh, Wifi } from "lucide-react";
import { useWindowStore } from "@/store/windowStore";
import { cn } from "@/lib/utils";

export default function IPhoneStatusBar({ className }) {
  const { time } = useClock();
  const wifiOn = useWindowStore((s) => s.wifiOn);

  const shortTime = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-[10050] flex h-11 items-end justify-between px-6 pb-1.5 text-[14px] font-semibold tracking-tight text-white",
        className
      )}
      aria-hidden
    >
      <span className="min-w-[54px] tabular-nums [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
        {shortTime || time}
      </span>

      <div className="iphone-island absolute left-1/2 top-2.5 h-[28px] w-[108px] -translate-x-1/2 rounded-full bg-black" />

      <div className="flex min-w-[54px] items-center justify-end gap-1 [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.35))]">
        <SignalHigh className="h-3.5 w-3.5" strokeWidth={2.25} />
        <Wifi className={cn("h-3.5 w-3.5", !wifiOn && "opacity-30")} strokeWidth={2.25} />
        <BatteryFull className="h-4 w-4" strokeWidth={2} />
      </div>
    </div>
  );
}
