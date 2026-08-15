"use client";

import { BatteryFull, Search, Wifi, SlidersHorizontal } from "lucide-react";
import { useClock } from "@/hooks/useClock";
import { useWindowStore } from "@/store/windowStore";
import { FinderMark } from "@/components/icons/MacAppIcons";
import { cn } from "@/lib/utils";

export default function MenuBar() {
  const { time, date } = useClock();
  const windows = useWindowStore((s) => s.windows);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const toggleStartMenu = useWindowStore((s) => s.toggleStartMenu);
  const toggleCalendar = useWindowStore((s) => s.toggleCalendar);
  const toggleControlCenter = useWindowStore((s) => s.toggleControlCenter);
  const toggleSpotlight = useWindowStore((s) => s.toggleSpotlight);
  const calendarOpen = useWindowStore((s) => s.calendarOpen);
  const controlCenterOpen = useWindowStore((s) => s.controlCenterOpen);
  const wifiOn = useWindowStore((s) => s.wifiOn);
  const openWindow = useWindowStore((s) => s.openWindow);
  const refreshDesktop = useWindowStore((s) => s.refreshDesktop);
  const pushNotification = useWindowStore((s) => s.pushNotification);

  const active = activeWindowId ? windows[activeWindowId] : null;
  const appName = active?.isOpen && !active?.isMinimized ? active.title : "Finder";

  const longDate = new Date().toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header
      className="mac-menubar pointer-events-auto absolute inset-x-0 top-0 z-[10001] flex h-7 items-center justify-between px-3 text-[13px] text-white/95"
      role="menubar"
      aria-label="Menu bar"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Jatin OS menu"
          className="flex items-center justify-center rounded-sm p-0.5 transition hover:bg-white/10"
          onClick={() => toggleStartMenu()}
        >
          <FinderMark className="h-[16px] w-[16px]" />
        </button>
        <span className="truncate font-semibold tracking-tight">{appName}</span>
        <nav className="hidden items-center gap-3 text-white/80 md:flex" aria-label="App menu">
          <button
            type="button"
            className="rounded px-1 hover:bg-white/10 hover:text-white"
            onClick={() => openWindow("about")}
          >
            File
          </button>
          <button
            type="button"
            className="rounded px-1 hover:bg-white/10 hover:text-white"
            onClick={() => openWindow("projects")}
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded px-1 hover:bg-white/10 hover:text-white"
            onClick={() => {
              refreshDesktop();
              pushNotification({
                type: "success",
                title: "Desktop",
                message: "Refreshed",
              });
            }}
          >
            View
          </button>
          <button
            type="button"
            className="rounded px-1 hover:bg-white/10 hover:text-white"
            onClick={() => openWindow("settings")}
          >
            Window
          </button>
          <button
            type="button"
            className="rounded px-1 hover:bg-white/10 hover:text-white"
            onClick={() => openWindow("terminal")}
          >
            Help
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-1 text-white/90 sm:gap-1.5">
        <span className="hidden text-[12px] tabular-nums sm:inline">100%</span>
        <BatteryFull className="hidden h-3.5 w-3.5 sm:block" strokeWidth={1.75} />
        <button
          type="button"
          aria-label={wifiOn ? "Wi-Fi on" : "Wi-Fi off"}
          className={cn(
            "rounded p-1 hover:bg-white/10",
            !wifiOn && "opacity-40"
          )}
          onClick={() => toggleControlCenter()}
        >
          <Wifi className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Spotlight search"
          className="rounded p-1 hover:bg-white/10"
          onClick={() => toggleSpotlight()}
        >
          <Search className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Control Center"
          aria-expanded={controlCenterOpen}
          className={cn(
            "hidden rounded p-1 hover:bg-white/10 md:inline-flex",
            controlCenterOpen && "bg-white/15"
          )}
          onClick={() => toggleControlCenter()}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Open calendar"
          aria-expanded={calendarOpen}
          className={cn(
            "rounded px-1.5 py-0.5 tabular-nums text-[12px] hover:bg-white/10 sm:text-[13px]",
            calendarOpen && "bg-white/15"
          )}
          onClick={() => toggleCalendar()}
          title={`${date} ${time}`}
        >
          <span className="hidden sm:inline">{longDate}</span>
          <span className="sm:hidden">{time}</span>
        </button>
      </div>
    </header>
  );
}
