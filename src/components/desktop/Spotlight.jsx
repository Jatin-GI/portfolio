"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  { id: "about", label: "About Me", Icon: AboutIcon, keywords: "profile bio" },
  { id: "projects", label: "Projects", Icon: ProjectsIcon, keywords: "work portfolio" },
  { id: "experience", label: "Experience", Icon: ExperienceIcon, keywords: "jobs career" },
  { id: "skills", label: "Skills", Icon: SkillsIcon, keywords: "tech stack" },
  { id: "resume", label: "Resume", Icon: ResumeIcon, keywords: "cv pdf" },
  { id: "terminal", label: "Terminal", Icon: TerminalIcon, keywords: "cli shell" },
  { id: "calculator", label: "Calculator", Icon: CalculatorIcon, keywords: "math calc" },
  { id: "notes", label: "Notes", Icon: NotesIcon, keywords: "sticky memo" },
  { id: "contact", label: "Contact", Icon: ContactIcon, keywords: "email message" },
  { id: "settings", label: "Settings", Icon: SettingsIcon, keywords: "preferences system" },
];

export default function Spotlight() {
  const open = useWindowStore((s) => s.spotlightOpen);
  const setSpotlightOpen = useWindowStore((s) => s.setSpotlightOpen);
  const openWindow = useWindowStore((s) => s.openWindow);
  const pushNotification = useWindowStore((s) => s.pushNotification);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return APPS;
    return APPS.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.id.includes(q) ||
        a.keywords.includes(q)
    );
  }, [query]);

  const safeIndex = Math.min(index, Math.max(0, results.length - 1));

  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  const launch = (appId) => {
    openWindow(appId);
    setSpotlightOpen(false);
    setQuery("");
    setIndex(0);
    pushNotification({
      type: "info",
      title: "Opened",
      message: APPS.find((a) => a.id === appId)?.label || appId,
    });
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <button
        type="button"
        aria-label="Close Spotlight"
        className="pointer-events-auto absolute inset-0 z-[11000] bg-black/35 backdrop-blur-[2px]"
        onClick={() => {
          setSpotlightOpen(false);
          setQuery("");
          setIndex(0);
        }}
      />
      <motion.div
        role="dialog"
        aria-label="Spotlight search"
        initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8 }}
        className="mac-scroll pointer-events-auto absolute left-1/2 top-[18%] z-[11001] w-[min(560px,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-[rgba(40,40,42,0.92)] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-5 w-5 text-zinc-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Search apps…"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-zinc-500"
            aria-label="Spotlight query"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIndex((i) => Math.min(results.length - 1, i + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIndex((i) => Math.max(0, i - 1));
              } else if (e.key === "Enter" && results[safeIndex]) {
                e.preventDefault();
                launch(results[safeIndex].id);
              } else if (e.key === "Escape") {
                setSpotlightOpen(false);
                setQuery("");
                setIndex(0);
              }
            }}
          />
          <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400 sm:inline">
            Esc
          </kbd>
        </div>
        <ul className="max-h-72 overflow-auto p-2">
          {results.map((app, i) => {
            const Icon = app.Icon;
            return (
              <li key={app.id}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                    i === safeIndex
                      ? "bg-[#0a84ff] text-white"
                      : "text-zinc-200 hover:bg-white/10"
                  }`}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => launch(app.id)}
                >
                  <Icon className="h-8 w-8" />
                  <span className="text-sm font-medium">{app.label}</span>
                </button>
              </li>
            );
          })}
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-zinc-500">No results</li>
          ) : null}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
