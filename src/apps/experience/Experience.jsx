"use client";

import { Briefcase } from "lucide-react";
import experience from "@/data/experience";

export default function Experience() {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-sky-300" />
        <h2 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
          Activity History
        </h2>
      </div>

      <ol className="relative space-y-0 border-l border-white/10 pl-5">
        {experience.map((item) => (
          <li key={item.id} className="relative pb-8 last:pb-0">
            <span className="absolute -left-[1.40rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-sky-400 bg-[#0d121c]" />
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-zinc-50">{item.position}</h3>
                <span className="text-xs text-zinc-500">{item.duration}</span>
              </div>
              <p className="mt-0.5 text-sm text-sky-300">
                {item.company}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
                {item.responsibilities.map((resp) => (
                  <li key={resp} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[11px] text-sky-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
