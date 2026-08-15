"use client";

import { Package } from "lucide-react";
import skills from "@/data/skills";

export default function Skills() {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Package className="h-4 w-4 text-sky-300" />
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">Installed Technologies</h2>
          <p className="text-xs text-zinc-500">Packages available on this system</p>
        </div>
      </div>

      <div className="space-y-5">
        {skills.map((group) => (
          <section key={group.category}>
            <h3 className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              {group.category}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <div
                  key={`${group.category}-${item.name}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{item.name}</p>
                    <p className="text-[11px] text-zinc-500">{group.category}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-sky-500/10 px-2 py-0.5 text-[11px] text-sky-200">
                    {item.usage}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
