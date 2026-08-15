"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { useWindowStore } from "@/store/windowStore";
import {
  AboutIcon,
  ProjectsIcon,
  ExperienceIcon,
  SkillsIcon,
  ResumeIcon,
  TerminalIcon,
  ContactIcon,
  SettingsIcon,
  CalculatorIcon,
  NotesIcon,
} from "@/components/icons/MacAppIcons";

const APPS = [
  { id: "projects", label: "Projects", Icon: ProjectsIcon },
  { id: "about", label: "About Me", Icon: AboutIcon },
  { id: "experience", label: "Experience", Icon: ExperienceIcon },
  { id: "skills", label: "Skills", Icon: SkillsIcon },
  { id: "resume", label: "Resume", Icon: ResumeIcon },
  { id: "terminal", label: "Terminal", Icon: TerminalIcon },
  { id: "calculator", label: "Calculator", Icon: CalculatorIcon },
  { id: "notes", label: "Notes", Icon: NotesIcon },
  { id: "contact", label: "Contact", Icon: ContactIcon },
  { id: "settings", label: "Settings", Icon: SettingsIcon },
];

export default function Launchpad() {
  const open = useWindowStore((s) => s.startMenuOpen);
  const setStartMenuOpen = useWindowStore((s) => s.setStartMenuOpen);
  const openWindow = useWindowStore((s) => s.openWindow);
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return APPS;
    return APPS.filter((app) => app.label.toLowerCase().includes(q));
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-label="Launchpad"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mac-launchpad pointer-events-auto absolute inset-0 z-[9998] flex flex-col items-center px-4 pt-16 pb-28"
          onClick={() => {
            setStartMenuOpen(false);
            setQuery("");
          }}
        >
          <label
            className="mb-10 flex w-full max-w-sm items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 shadow-lg backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Search className="h-4 w-4 text-white/60" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45"
              aria-label="Search apps"
              autoFocus
            />
          </label>

          <div
            className="grid w-full max-w-3xl grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-4"
            onClick={(e) => e.stopPropagation()}
          >
            {filtered.map((app, index) => {
              const Icon = app.Icon;
              return (
                <motion.button
                  key={app.id}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="flex flex-col items-center gap-2"
                  onClick={() => {
                    openWindow(app.id);
                    setQuery("");
                  }}
                >
                  <Icon className="h-16 w-16 drop-shadow-xl" />
                  <span className="text-[12px] font-medium text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                    {app.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
