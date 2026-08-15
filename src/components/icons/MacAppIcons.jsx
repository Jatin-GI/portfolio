"use client";

/** Squircle wrapper matching macOS icon shape */
function Squircle({ className = "", children }) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        borderRadius: "22.5%",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.28)",
      }}
    >
      {children}
    </div>
  );
}

export function LaunchpadIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#f4f4f6] to-[#c8c8ce]">
        <div className="grid grid-cols-3 gap-[3px]">
          {[
            "#ff5f57",
            "#febc2e",
            "#28c840",
            "#0a84ff",
            "#bf5af2",
            "#ff9f0a",
            "#64d2ff",
            "#ff375f",
            "#30d158",
          ].map((c) => (
            <span
              key={c}
              className="h-[7px] w-[7px] rounded-[2px] sm:h-2 sm:w-2"
              style={{ background: c }}
            />
          ))}
        </div>
      </Squircle>
    </div>
  );
}

export function AboutIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#5ac8fa] to-[#007aff]">
        <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none">
          <circle cx="24" cy="16" r="8" fill="white" fillOpacity="0.95" />
          <path
            d="M8 42c2.5-10 11-14 16-14s13.5 4 16 14"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
      </Squircle>
    </div>
  );
}

export function ProjectsIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#ffe08a] to-[#f5a623]">
        <svg viewBox="0 0 48 48" className="h-[72%] w-[72%]" fill="none">
          <path
            d="M8 16h12l3 3h17a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4Z"
            fill="#fff6d6"
          />
          <path d="M4 22h40v14a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V22Z" fill="#ffd56a" />
        </svg>
      </Squircle>
    </div>
  );
}

export function ExperienceIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#bf5af2] to-[#5856d6]">
        <svg viewBox="0 0 48 48" className="h-[68%] w-[68%]" fill="none">
          <rect x="8" y="16" width="32" height="24" rx="4" fill="white" fillOpacity="0.95" />
          <path
            d="M18 16v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3"
            stroke="#5856d6"
            strokeWidth="2.5"
          />
          <rect x="21" y="25" width="6" height="5" rx="1" fill="#5856d6" />
        </svg>
      </Squircle>
    </div>
  );
}

export function SkillsIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#ff9f0a] to-[#ff375f]">
        <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none">
          <path
            d="M24 8c7 0 12 5.5 12 12.5 0 4-2 7.5-5 9.5v4.5a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V30c-3-2-5-5.5-5-9.5C12 13.5 17 8 24 8Z"
            fill="white"
            fillOpacity="0.95"
          />
          <path d="M19 38h10M20 42h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </Squircle>
    </div>
  );
}

export function TerminalIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e]">
        <svg viewBox="0 0 48 48" className="h-[65%] w-[65%]" fill="none">
          <path
            d="M12 16l10 8-10 8"
            stroke="#30d158"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 32h12"
            stroke="#f5f5f7"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </Squircle>
    </div>
  );
}

export function ResumeIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#64d2ff] to-[#0a84ff]">
        <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none">
          <rect x="12" y="8" width="24" height="32" rx="3" fill="white" fillOpacity="0.95" />
          <path d="M17 16h14M17 22h14M17 28h10" stroke="#0a84ff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </Squircle>
    </div>
  );
}

export function ContactIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#5ac8fa] to-[#0071e3]">
        <svg viewBox="0 0 48 48" className="h-[68%] w-[68%]" fill="none">
          <rect x="8" y="14" width="32" height="22" rx="4" fill="white" fillOpacity="0.95" />
          <path
            d="M10 16l14 11L38 16"
            stroke="#0071e3"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </svg>
      </Squircle>
    </div>
  );
}

export function SettingsIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#d1d1d6] to-[#8e8e93]">
        <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none">
          <circle cx="24" cy="24" r="6.5" fill="#3a3a3c" />
          <path
            d="M24 8l2.2 4.8 5.2-.4 1.4 5 4.8 2.2-2.2 4.8 2.2 4.8-4.8 2.2-1.4 5-5.2-.4L24 40l-2.2-4.8-5.2.4-1.4-5-4.8-2.2 2.2-4.8-2.2-4.8 4.8-2.2 1.4-5 5.2.4L24 8Z"
            stroke="#3a3a3c"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </svg>
      </Squircle>
    </div>
  );
}

export function CalculatorIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#636366] to-[#1c1c1e]">
        <svg viewBox="0 0 48 48" className="h-[72%] w-[72%]" fill="none">
          <rect x="12" y="8" width="24" height="32" rx="4" fill="#ff9f0a" />
          <rect x="16" y="12" width="16" height="8" rx="1.5" fill="#1c1c1e" fillOpacity="0.35" />
          <circle cx="18" cy="28" r="2" fill="white" />
          <circle cx="24" cy="28" r="2" fill="white" />
          <circle cx="30" cy="28" r="2" fill="white" />
          <circle cx="18" cy="34" r="2" fill="white" />
          <circle cx="24" cy="34" r="2" fill="white" />
          <circle cx="30" cy="34" r="2" fill="#1c1c1e" fillOpacity="0.4" />
        </svg>
      </Squircle>
    </div>
  );
}

export function NotesIcon({ className = "h-12 w-12" }) {
  return (
    <div className={className}>
      <Squircle className="bg-gradient-to-b from-[#ffe08a] to-[#f5c542]">
        <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none">
          <rect x="12" y="8" width="24" height="32" rx="3" fill="white" fillOpacity="0.95" />
          <path d="M17 16h14M17 22h14M17 28h10" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </Squircle>
    </div>
  );
}

export function FinderMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="finderGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6ec8ff" />
          <stop offset="100%" stopColor="#0a84ff" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#finderGrad)" />
      <path
        d="M7 9.5c1.8-2.2 4-3.2 5.2-2.2 1.4 1.1.4 3.4-1.2 5.2"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17 14.5c-1.8 2.2-4 3.2-5.2 2.2-1.4-1.1-.4-3.4 1.2-5.2"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M9 15.5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export const APP_ICONS = {
  launchpad: LaunchpadIcon,
  about: AboutIcon,
  projects: ProjectsIcon,
  experience: ExperienceIcon,
  skills: SkillsIcon,
  terminal: TerminalIcon,
  resume: ResumeIcon,
  contact: ContactIcon,
  settings: SettingsIcon,
  calculator: CalculatorIcon,
  notes: NotesIcon,
};
