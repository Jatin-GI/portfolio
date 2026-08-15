"use client";

import { useState } from "react";
import {
  Folder,
  Star,
  FileText,
  Brain,
  ChevronRight,
} from "lucide-react";
import projects from "@/data/projects";
import { useWindowStore } from "@/store/windowStore";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const QUICK_ACCESS = [
  { id: "projects", label: "Projects", icon: Star, action: "self" },
  { id: "resume", label: "Resume", icon: FileText, action: "open" },
  { id: "skills", label: "Skills", icon: Brain, action: "open" },
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);
  const openWindow = useWindowStore((s) => s.openWindow);
  const openProjectDetails = useWindowStore((s) => s.openProjectDetails);

  return (
    <div className="flex h-full min-h-[320px]">
      <aside className="hidden w-44 shrink-0 border-r border-white/10 bg-black/20 p-3 sm:block">
        <p className="mb-2 px-2 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
          Quick Access
        </p>
        <ul className="space-y-1">
          {QUICK_ACCESS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-zinc-300 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
                  onClick={() => {
                    if (item.action === "open") openWindow(item.id);
                  }}
                >
                  <Icon className="h-3.5 w-3.5 text-sky-300" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="min-w-0 flex-1 p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-1 text-xs text-zinc-500">
          <Folder className="h-3.5 w-3.5" />
          <ChevronRight className="h-3 w-3" />
          <span>Projects</span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400",
                selectedId === project.id
                  ? "border-sky-400/40 bg-sky-500/15"
                  : "border-white/8 bg-white/[0.03] hover:bg-white/[0.06]"
              )}
              onClick={() => setSelectedId(project.id)}
              onDoubleClick={() => openProjectDetails(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openProjectDetails(project);
              }}
              title="Double-click or press Enter to open"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300">
                <Folder className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-zinc-100">{project.name}</span>
              <span className="text-[11px] text-zinc-500">{project.category}</span>
            </motion.button>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-zinc-500">
          Double-click a folder to open project details.
        </p>
      </div>
    </div>
  );
}
