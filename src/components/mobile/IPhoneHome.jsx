"use client";

import { motion } from "framer-motion";
import { useClock } from "@/hooks/useClock";
import { useWindowStore } from "@/store/windowStore";
import IPhoneStatusBar from "@/components/mobile/IPhoneStatusBar";
import IPhoneDock from "@/components/mobile/IPhoneDock";
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

const HOME_APPS = [
  { id: "projects", label: "Projects", Icon: ProjectsIcon },
  { id: "about", label: "About", Icon: AboutIcon },
  { id: "experience", label: "Experience", Icon: ExperienceIcon },
  { id: "skills", label: "Skills", Icon: SkillsIcon },
  { id: "resume", label: "Resume", Icon: ResumeIcon },
  { id: "terminal", label: "Terminal", Icon: TerminalIcon },
  { id: "calculator", label: "Calculator", Icon: CalculatorIcon },
  { id: "notes", label: "Notes", Icon: NotesIcon },
  { id: "contact", label: "Contact", Icon: ContactIcon },
  { id: "settings", label: "Settings", Icon: SettingsIcon },
];

export default function IPhoneHome({ hideSpringboard = false }) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const { date } = useClock();

  const weekday = new Date().toLocaleDateString([], { weekday: "long" });
  const monthDay = new Date().toLocaleDateString([], {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="absolute inset-0 z-20">
      <IPhoneStatusBar />

      {!hideSpringboard ? (
        <>
          {/* Lock-screen style date/time widget */}
          <div className="pointer-events-none absolute inset-x-0 top-14 z-10 px-6 pt-2 text-center text-white">
            <p className="text-[17px] font-medium tracking-wide [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
              {weekday}, {monthDay || date}
            </p>
          </div>

          <nav
            aria-label="Home screen apps"
            className="pointer-events-auto absolute inset-x-0 top-[100px] bottom-[118px] z-20 overflow-y-auto px-5 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto grid max-w-sm grid-cols-4 gap-x-4 gap-y-5">
              {HOME_APPS.map((app, index) => {
                const Icon = app.Icon;
                return (
                  <motion.button
                    key={app.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.03 * index, duration: 0.22 }}
                    className="flex flex-col items-center gap-1.5 active:scale-90"
                    onClick={() => openWindow(app.id)}
                    aria-label={app.label}
                  >
                    <Icon className="h-[62px] w-[62px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]" />
                    <span className="max-w-[72px] truncate text-center text-[11px] font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
                      {app.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Page dots */}
            <div className="mt-6 flex items-center justify-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
            </div>
          </nav>

          <IPhoneDock />
        </>
      ) : null}

      {/* Home indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-1 z-[10045] flex justify-center pb-[env(safe-area-inset-bottom)]">
        <div className="iphone-home-indicator h-1 w-[134px] rounded-full bg-white/80" />
      </div>
    </div>
  );
}
