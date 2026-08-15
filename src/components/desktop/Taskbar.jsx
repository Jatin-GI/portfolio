"use client";

import { useClock } from "@/hooks/useClock";
import { useWindowStore } from "@/store/windowStore";
import {
  Search,
  Wifi,
  Volume2,
  BatteryFull,
  ChevronUp,
  Folder,
  User,
  Briefcase,
  Brain,
  FileText,
  TerminalSquare,
  Mail,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ICON_MAP = {
  about: User,
  projects: Folder,
  experience: Briefcase,
  skills: Brain,
  resume: FileText,
  terminal: TerminalSquare,
  contact: Mail,
  "project-details": Folder,
};

const PINNED = [
  { id: "projects", Icon: Folder },
  { id: "terminal", Icon: TerminalSquare },
  { id: "about", Icon: User },
];

export default function Taskbar() {
  const { time, date } = useClock();
  const windows = useWindowStore((s) => s.windows);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const startMenuOpen = useWindowStore((s) => s.startMenuOpen);
  const toggleStartMenu = useWindowStore((s) => s.toggleStartMenu);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const openWindow = useWindowStore((s) => s.openWindow);

  const openWindows = Object.values(windows).filter((w) => w.isOpen);
  const pinnedIds = new Set(PINNED.map((p) => p.id));
  const extraWindows = openWindows.filter(
    (w) => !pinnedIds.has(w.id) && w.appId !== "project-details"
  );
  const projectWindows = openWindows.filter((w) => w.appId === "project-details");

  const handleTaskClick = (appId) => {
    const win = windows[appId];
    if (!win || !win.isOpen) {
      openWindow(appId);
      return;
    }
    if (win.isMinimized) {
      restoreWindow(appId);
      return;
    }
    if (activeWindowId === appId) {
      minimizeWindow(appId);
      return;
    }
    focusWindow(appId);
  };

  const handleOpenWindowClick = (win) => {
    if (win.isMinimized) {
      restoreWindow(win.id);
      return;
    }
    if (activeWindowId === win.id) {
      minimizeWindow(win.id);
      return;
    }
    focusWindow(win.id);
  };

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.12, duration: 0.22 }}
      className="os-taskbar pointer-events-auto absolute inset-x-0 bottom-0 z-[10000] flex h-[52px] items-center border-t border-white/10 px-2 sm:px-3"
      role="toolbar"
      aria-label="Taskbar"
    >
      {/* Left spacer / widgets hint */}
      <div className="hidden w-[120px] shrink-0 sm:block" />

      {/* Centered app cluster — Windows 11 style */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
        <button
          type="button"
          aria-label="Start menu"
          aria-expanded={startMenuOpen}
          className={cn(
            "os-taskbar-btn flex h-10 w-10 items-center justify-center rounded-md",
            startMenuOpen ? "bg-white/15 is-active" : "hover:bg-white/10"
          )}
          onClick={() => toggleStartMenu()}
        >
          <LayoutGrid className="h-[18px] w-[18px] text-sky-300" strokeWidth={1.75} />
        </button>

        <button
          type="button"
          aria-label="Search"
          className="os-taskbar-btn hidden h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 sm:flex"
          onClick={() => toggleStartMenu()}
        >
          <Search className="h-[17px] w-[17px] text-zinc-200" strokeWidth={1.75} />
        </button>

        <div className="mx-0.5 hidden h-5 w-px bg-white/10 sm:block" />

        {PINNED.map(({ id, Icon }) => {
          const win = windows[id];
          const isOpen = win?.isOpen;
          const isActive = activeWindowId === id && isOpen && !win?.isMinimized;
          return (
            <button
              key={id}
              type="button"
              aria-label={id}
              title={id.charAt(0).toUpperCase() + id.slice(1)}
              className={cn(
                "os-taskbar-btn flex h-10 w-10 items-center justify-center rounded-md text-zinc-100",
                isActive ? "bg-white/15 is-active" : "hover:bg-white/10",
                isOpen && !isActive ? "is-open" : ""
              )}
              onClick={() => handleTaskClick(id)}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
          );
        })}

        {[...extraWindows, ...projectWindows].map((win) => {
          const Icon = ICON_MAP[win.appId] || Folder;
          const isActive = activeWindowId === win.id && !win.isMinimized;
          return (
            <button
              key={win.id}
              type="button"
              aria-label={win.title}
              title={win.title}
              className={cn(
                "os-taskbar-btn flex h-10 max-w-[132px] items-center gap-1.5 rounded-md px-2.5 text-xs text-zinc-100",
                isActive ? "bg-white/15 is-active" : "hover:bg-white/10 is-open"
              )}
              onClick={() => handleOpenWindowClick(win)}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="hidden truncate sm:inline">{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System tray */}
      <div className="flex w-auto shrink-0 items-center justify-end gap-0.5 sm:w-[160px] sm:gap-1">
        <button
          type="button"
          className="hidden h-8 items-center rounded-md px-1.5 text-zinc-400 hover:bg-white/10 sm:inline-flex"
          aria-label="Show hidden icons"
          tabIndex={-1}
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <div className="hidden items-center gap-0.5 rounded-md px-1.5 py-1 hover:bg-white/10 sm:flex">
          <button type="button" className="p-0.5 text-zinc-300" aria-label="Network" tabIndex={-1}>
            <Wifi className="h-3.5 w-3.5" />
          </button>
          <button type="button" className="p-0.5 text-zinc-300" aria-label="Volume" tabIndex={-1}>
            <Volume2 className="h-3.5 w-3.5" />
          </button>
          <button type="button" className="p-0.5 text-zinc-300" aria-label="Battery" tabIndex={-1}>
            <BatteryFull className="h-3.5 w-3.5" />
          </button>
        </div>
        <button
          type="button"
          className="rounded-md px-2 py-1 text-right leading-tight hover:bg-white/10"
          title={date}
          aria-live="polite"
        >
          <div className="text-[11px] font-medium tabular-nums text-zinc-100">{time}</div>
          <div className="hidden text-[10px] text-zinc-400 sm:block">{date}</div>
        </button>
      </div>
    </motion.div>
  );
}
