"use client";

import { motion } from "framer-motion";
import { useWindowStore } from "@/store/windowStore";
import {
  LaunchpadIcon,
  AboutIcon,
  ProjectsIcon,
  ExperienceIcon,
  SkillsIcon,
  TerminalIcon,
  ResumeIcon,
  ContactIcon,
  SettingsIcon,
  CalculatorIcon,
  NotesIcon,
} from "@/components/icons/MacAppIcons";
import { cn } from "@/lib/utils";

const DOCK_APPS = [
  { id: "launchpad", label: "Launchpad", Icon: LaunchpadIcon, action: "launchpad" },
  { id: "about", label: "About", Icon: AboutIcon },
  { id: "projects", label: "Projects", Icon: ProjectsIcon },
  { id: "experience", label: "Experience", Icon: ExperienceIcon },
  { id: "skills", label: "Skills", Icon: SkillsIcon },
  { id: "terminal", label: "Terminal", Icon: TerminalIcon },
  { id: "calculator", label: "Calculator", Icon: CalculatorIcon },
  { id: "notes", label: "Notes", Icon: NotesIcon },
  { id: "resume", label: "Resume", Icon: ResumeIcon },
  { id: "contact", label: "Contact", Icon: ContactIcon },
  { id: "settings", label: "Settings", Icon: SettingsIcon },
];

export default function Dock() {
  const windows = useWindowStore((s) => s.windows);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const openWindow = useWindowStore((s) => s.openWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleStartMenu = useWindowStore((s) => s.toggleStartMenu);
  const startMenuOpen = useWindowStore((s) => s.startMenuOpen);

  const handleClick = (app) => {
    if (app.action === "launchpad") {
      toggleStartMenu();
      return;
    }

    const win = windows[app.id];
    if (!win?.isOpen) {
      openWindow(app.id);
      return;
    }
    if (win.isMinimized) {
      restoreWindow(app.id);
      return;
    }
    if (activeWindowId === app.id) {
      minimizeWindow(app.id);
      return;
    }
    focusWindow(app.id);
  };

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.28 }}
      className="pointer-events-none absolute inset-x-0 bottom-2 z-[10000] flex justify-center px-2 sm:bottom-3"
    >
      <nav
        className="mac-dock pointer-events-auto flex items-end gap-1 rounded-[22px] px-2 py-1.5 sm:gap-1.5 sm:px-2.5 sm:py-2"
        aria-label="Dock"
        onClick={(e) => e.stopPropagation()}
      >
        {DOCK_APPS.map((app, index) => {
          const Icon = app.Icon;
          const win = windows[app.id];
          const isOpen =
            app.action === "launchpad" ? startMenuOpen : Boolean(win?.isOpen);
          const isActive =
            app.action === "launchpad"
              ? startMenuOpen
              : activeWindowId === app.id && win?.isOpen && !win?.isMinimized;

          return (
            <div key={app.id} className="flex items-end">
              {app.id === "settings" ? (
                <div className="mx-1 hidden h-10 w-px self-center bg-white/20 sm:block" />
              ) : null}
              <button
                type="button"
                title={app.label}
                aria-label={app.label}
                className="mac-dock-icon group relative flex flex-col items-center"
                onClick={() => handleClick(app)}
                style={{ transitionDelay: `${index * 10}ms` }}
              >
                <Icon
                  className={cn(
                    "h-11 w-11 sm:h-12 sm:w-12",
                    isActive && "brightness-110"
                  )}
                />
                {(isOpen || isActive) && (
                  <span className="mac-dock-dot absolute -bottom-0.5" />
                )}
                <span className="pointer-events-none absolute -top-8 z-10 hidden whitespace-nowrap rounded-md bg-black/75 px-2 py-0.5 text-[11px] text-white opacity-0 shadow-lg group-hover:opacity-100 sm:block">
                  {app.label}
                </span>
              </button>
            </div>
          );
        })}
      </nav>
    </motion.div>
  );
}
