"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Folder,
  User,
  Briefcase,
  Brain,
  FileText,
  TerminalSquare,
  Mail,
  Search,
  Power,
} from "lucide-react";
import profile from "@/data/profile";
import { useWindowStore } from "@/store/windowStore";
import { cn } from "@/lib/utils";

const APPS = [
  { id: "projects", label: "Projects", icon: Folder, accent: "from-amber-400 to-orange-600" },
  { id: "about", label: "About", icon: User, accent: "from-sky-400 to-blue-600" },
  { id: "experience", label: "Experience", icon: Briefcase, accent: "from-violet-400 to-indigo-600" },
  { id: "skills", label: "Skills", icon: Brain, accent: "from-fuchsia-400 to-purple-700" },
  { id: "resume", label: "Resume", icon: FileText, accent: "from-emerald-400 to-teal-700" },
  { id: "terminal", label: "Terminal", icon: TerminalSquare, accent: "from-zinc-500 to-zinc-800" },
  { id: "contact", label: "Contact", icon: Mail, accent: "from-rose-400 to-red-600" },
];

export default function StartMenu() {
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
        <>
          <button
            type="button"
            aria-label="Close start menu"
            className="pointer-events-auto absolute inset-0 z-[9998] bg-black/25"
            onClick={() => setStartMenuOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-label="Start menu"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-auto absolute bottom-[60px] left-1/2 z-[9999] w-[min(580px,calc(100vw-1rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/12 bg-[rgba(32,32,32,0.82)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-[40px] max-sm:left-2 max-sm:right-2 max-sm:w-auto max-sm:translate-x-0"
          >
            <label className="mb-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2.5 shadow-inner">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for apps"
                className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                aria-label="Search apps"
                autoFocus
              />
            </label>

            <p className="mb-3 px-1 text-xs font-semibold tracking-wide text-zinc-400">
              Pinned
            </p>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {filtered.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    type="button"
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition-colors",
                      "hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
                    )}
                    onClick={() => {
                      openWindow(app.id);
                      setQuery("");
                    }}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ring-1 ring-white/20",
                        app.accent
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[12px] text-zinc-200">{app.label}</span>
                  </button>
                );
              })}
              {filtered.length === 0 ? (
                <p className="col-span-full py-8 text-center text-sm text-zinc-500">
                  No apps found
                </p>
              ) : null}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-700 text-xs font-semibold text-white">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-100">{profile.name}</p>
                  <p className="text-xs text-zinc-500">{profile.title}</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-zinc-200"
                aria-label="Power"
                title="This is a portfolio desktop"
                onClick={() => setStartMenuOpen(false)}
              >
                <Power className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
