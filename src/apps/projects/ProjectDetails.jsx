"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

export default function ProjectDetails({ project }) {
  if (!project) {
    return <div className="p-6 text-sm text-zinc-400">Project not found.</div>;
  }

  return (
    <div className="space-y-5 p-5 sm:p-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a2333]">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 640px"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-zinc-50">{project.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.description}</p>
      </div>

      <section>
        <h3 className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          Problem
        </h3>
        <p className="text-sm text-zinc-300">{project.problem}</p>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          Features
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-zinc-300">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          Technologies
        </h3>
        <p className="text-sm text-sky-200/90">{project.technologies.join(" • ")}</p>
      </section>

      <div className="flex flex-wrap gap-2">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500/20 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        ) : null}
      </div>
    </div>
  );
}
