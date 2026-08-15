"use client";

import { motion } from "framer-motion";
import { useWindowStore } from "@/store/windowStore";
import {
  AboutIcon,
  ProjectsIcon,
  TerminalIcon,
  ContactIcon,
} from "@/components/icons/MacAppIcons";

const DOCK_APPS = [
  { id: "projects", label: "Projects", Icon: ProjectsIcon },
  { id: "about", label: "About", Icon: AboutIcon },
  { id: "terminal", label: "Terminal", Icon: TerminalIcon },
  { id: "contact", label: "Contact", Icon: ContactIcon },
];

export default function IPhoneDock() {
  const windows = useWindowStore((s) => s.windows);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const openWindow = useWindowStore((s) => s.openWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);

  const handleClick = (id) => {
    const win = windows[id];
    if (!win?.isOpen) {
      openWindow(id);
      return;
    }
    if (win.isMinimized) {
      restoreWindow(id);
      return;
    }
    focusWindow(id);
  };

  return (
    <motion.nav
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="iphone-dock pointer-events-auto absolute inset-x-3 bottom-[max(10px,env(safe-area-inset-bottom))] z-[10040] flex items-center justify-around rounded-[28px] px-3 py-3"
      aria-label="iPhone dock"
      onClick={(e) => e.stopPropagation()}
    >
      {DOCK_APPS.map((app) => {
        const Icon = app.Icon;
        const win = windows[app.id];
        const isActive =
          activeWindowId === app.id && win?.isOpen && !win?.isMinimized;

        return (
          <button
            key={app.id}
            type="button"
            aria-label={app.label}
            className="relative flex flex-col items-center active:scale-90"
            onClick={() => handleClick(app.id)}
          >
            <Icon className="h-[58px] w-[58px] drop-shadow-lg" />
            {isActive ? (
              <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-white" />
            ) : null}
          </button>
        );
      })}
    </motion.nav>
  );
}
