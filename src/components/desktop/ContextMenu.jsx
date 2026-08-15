"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useWindowStore } from "@/store/windowStore";

const ITEMS = [
  { id: "refresh", label: "Refresh" },
  { id: "sort", label: "Sort By", disabled: true },
  { id: "view", label: "View Options", disabled: true },
  { type: "divider" },
  { id: "terminal", label: "Open Terminal" },
  { type: "divider" },
  { id: "personalize", label: "Change Wallpaper" },
];

export default function ContextMenu() {
  const contextMenu = useWindowStore((s) => s.contextMenu);
  const setContextMenu = useWindowStore((s) => s.setContextMenu);
  const openWindow = useWindowStore((s) => s.openWindow);
  const setWallpaperVariant = useWindowStore((s) => s.setWallpaperVariant);
  const wallpaperVariant = useWindowStore((s) => s.wallpaperVariant);
  const reduceMotion = useReducedMotion();

  if (!contextMenu) return null;

  const handleAction = (id) => {
    if (id === "refresh") {
      setContextMenu(null);
      return;
    }
    if (id === "terminal") {
      openWindow("terminal");
      return;
    }
    if (id === "personalize") {
      const next = wallpaperVariant === "default" ? "aurora" : "default";
      setWallpaperVariant(next);
      setContextMenu(null);
    }
  };

  return (
    <AnimatePresence>
      <button
        type="button"
        aria-label="Close context menu"
        className="pointer-events-auto absolute inset-0 z-[9990]"
        onClick={() => setContextMenu(null)}
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu(null);
        }}
      />
      <motion.div
        role="menu"
        aria-label="Desktop context menu"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.12 }}
        className="pointer-events-auto absolute z-[9991] min-w-[200px] overflow-hidden rounded-xl border border-white/20 bg-[rgba(40,40,42,0.78)] py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        style={{
          left: Math.min(
            contextMenu.x,
            typeof window !== "undefined" ? window.innerWidth - 210 : contextMenu.x
          ),
          top: Math.min(
            contextMenu.y,
            typeof window !== "undefined" ? window.innerHeight - 220 : contextMenu.y
          ),
        }}
      >
        {ITEMS.map((item, index) => {
          if (item.type === "divider") {
            return <div key={`d-${index}`} className="my-1 border-t border-white/10" />;
          }
          return (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              className="flex w-full px-3 py-1.5 text-left text-[13px] text-zinc-100 transition-colors hover:bg-[#0a84ff] disabled:cursor-default disabled:text-zinc-500 disabled:hover:bg-transparent"
              onClick={() => handleAction(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
