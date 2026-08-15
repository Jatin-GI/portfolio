"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Wifi,
  Volume2,
  Sun,
  Moon,
  RefreshCw,
  Image as ImageIcon,
  Settings,
  BatteryFull,
} from "lucide-react";
import { useWindowStore } from "@/store/windowStore";
import { cn } from "@/lib/utils";

export default function ControlCenter() {
  const open = useWindowStore((s) => s.controlCenterOpen);
  const setControlCenterOpen = useWindowStore((s) => s.setControlCenterOpen);
  const wifiOn = useWindowStore((s) => s.wifiOn);
  const setWifiOn = useWindowStore((s) => s.setWifiOn);
  const soundLevel = useWindowStore((s) => s.soundLevel);
  const setSoundLevel = useWindowStore((s) => s.setSoundLevel);
  const brightness = useWindowStore((s) => s.brightness);
  const setBrightness = useWindowStore((s) => s.setBrightness);
  const wallpaperVariant = useWindowStore((s) => s.wallpaperVariant);
  const setWallpaperVariant = useWindowStore((s) => s.setWallpaperVariant);
  const refreshDesktop = useWindowStore((s) => s.refreshDesktop);
  const openWindow = useWindowStore((s) => s.openWindow);
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close Control Center"
            className="pointer-events-auto absolute inset-0 z-[10002]"
            onClick={() => setControlCenterOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-label="Control Center"
            initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-auto absolute right-2 top-9 z-[10003] w-[min(320px,calc(100vw-1rem))] space-y-3 rounded-2xl border border-white/15 bg-[rgba(40,40,42,0.82)] p-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={cn(
                  "flex items-center gap-3 rounded-2xl p-3 text-left transition",
                  wifiOn ? "bg-[#0a84ff]" : "bg-white/10 hover:bg-white/15"
                )}
                onClick={() => setWifiOn(!wifiOn)}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20">
                  <Wifi className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[13px] font-medium">Wi-Fi</span>
                  <span className="text-[11px] opacity-80">
                    {wifiOn ? "Connected" : "Off"}
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20">
                  <BatteryFull className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[13px] font-medium">Battery</span>
                  <span className="text-[11px] opacity-80">100% · Charged</span>
                </span>
              </button>
            </div>

            <div className="space-y-3 rounded-2xl bg-white/10 p-3">
              <label className="flex items-center gap-3">
                <Sun className="h-4 w-4 text-white/70" />
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="mac-slider w-full"
                  aria-label="Brightness"
                />
              </label>
              <label className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-white/70" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundLevel}
                  onChange={(e) => setSoundLevel(Number(e.target.value))}
                  className="mac-slider w-full"
                  aria-label="Sound"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex flex-col items-start gap-2 rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15"
                onClick={() => {
                  setWallpaperVariant(
                    wallpaperVariant === "default" ? "aurora" : "default"
                  );
                }}
              >
                <ImageIcon className="h-4 w-4" />
                <span className="text-[12px] font-medium">
                  Wallpaper
                  <span className="mt-0.5 block text-[11px] font-normal text-white/60">
                    {wallpaperVariant === "default" ? "Monterey" : "Aurora"}
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="flex flex-col items-start gap-2 rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15"
                onClick={() => {
                  refreshDesktop();
                  setControlCenterOpen(false);
                }}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="text-[12px] font-medium">
                  Refresh
                  <span className="mt-0.5 block text-[11px] font-normal text-white/60">
                    Reload desktop
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="flex flex-col items-start gap-2 rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15"
                onClick={() => {
                  document.documentElement.classList.toggle("dark-boost");
                }}
              >
                <Moon className="h-4 w-4" />
                <span className="text-[12px] font-medium">
                  Appearance
                  <span className="mt-0.5 block text-[11px] font-normal text-white/60">
                    Toggle boost
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="flex flex-col items-start gap-2 rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15"
                onClick={() => {
                  openWindow("settings");
                  setControlCenterOpen(false);
                }}
              >
                <Settings className="h-4 w-4" />
                <span className="text-[12px] font-medium">
                  Settings
                  <span className="mt-0.5 block text-[11px] font-normal text-white/60">
                    System prefs
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
