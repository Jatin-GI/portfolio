"use client";

import Image from "next/image";
import { Mail, MapPin, Sparkles, GraduationCap, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import profile from "@/data/profile";
import social from "@/data/social";

export default function About() {
  return (
    <div className="space-y-6 p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1a2333] sm:mx-0">
          <Image
            src={profile.image}
            alt={`${profile.name} profile`}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-zinc-50">{profile.name}</h2>
          <p className="mt-1 text-sky-300">{profile.title}</p>
          <p className="text-sm text-zinc-400">{profile.tagline}</p>
          <p className="mt-3 text-sm text-zinc-300">{profile.education}</p>
          <p className="mt-1 text-xs text-zinc-500">{profile.educationDetails}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400 sm:justify-start">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
            <a
              href={social.phone}
              className="inline-flex items-center gap-1 hover:text-sky-300"
            >
              <Phone className="h-3.5 w-3.5" />
              {profile.phone}
            </a>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              {profile.currentFocus}
            </span>
          </div>
        </div>
      </div>

      <section>
        <h3 className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          About
        </h3>
        <p className="text-sm leading-relaxed text-zinc-300">{profile.introduction}</p>
      </section>

      <section>
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          <GraduationCap className="h-3.5 w-3.5" />
          Education
        </h3>
        <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
          <p className="text-sm font-medium text-zinc-100">{profile.education}</p>
          <p className="mt-1 text-xs text-zinc-400">{profile.educationDetails}</p>
          <p className="mt-1 text-xs text-zinc-500">New Delhi, Delhi</p>
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          Focus Areas
        </h3>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {profile.interests.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-2">
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href={social.email}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
        <a
          href={social.phone}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
      </section>
    </div>
  );
}
