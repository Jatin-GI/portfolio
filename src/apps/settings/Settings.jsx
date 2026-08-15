"use client";

import { useState } from "react";
import { RefreshCw, Image as ImageIcon, Keyboard, RotateCcw, Check, Power } from "lucide-react";
import { useWindowStore } from "@/store/windowStore";
import { SettingsIcon } from "@/components/icons/MacAppIcons";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "wallpaper", label: "Wallpaper", icon: null },
  { id: "shortcuts", label: "Shortcuts", icon: null },
];

export default function Settings() {
  const [section, setSection] = useState("general");
  const [toast, setToast] = useState("");
  const wallpaperVariant = useWindowStore((s) => s.wallpaperVariant);
  const setWallpaperVariant = useWindowStore((s) => s.setWallpaperVariant);
  const refreshDesktop = useWindowStore((s) => s.refreshDesktop);
  const closeAllWindows = useWindowStore((s) => s.closeAllWindows);
  const reboot = useWindowStore((s) => s.reboot);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  return (
    <div className="flex h-full min-h-[360px]">
      <aside className="w-40 shrink-0 border-r border-white/10 bg-black/20 p-3 sm:w-44">
        <p className="mb-2 px-2 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
          System Settings
        </p>
        <div className="space-y-1">
          {SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[13px]",
                section === item.id
                  ? "bg-[#0a84ff] text-white"
                  : "text-zinc-300 hover:bg-white/10"
              )}
              onClick={() => setSection(item.id)}
            >
              {item.id === "general" ? (
                <SettingsIcon className="h-5 w-5" />
              ) : item.id === "wallpaper" ? (
                <ImageIcon className="h-4 w-4" />
              ) : (
                <Keyboard className="h-4 w-4" />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-4 p-5">
        {section === "general" ? (
          <>
            <h2 className="text-lg font-semibold text-white">General</h2>
            <p className="text-sm text-zinc-400">
              Manage desktop behavior for Jatin OS.
            </p>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10"
              onClick={() => {
                refreshDesktop();
                notify("Desktop refreshed");
              }}
            >
              <span className="flex items-center gap-3">
                <RefreshCw className="h-4 w-4 text-sky-300" />
                <span>
                  <span className="block text-sm font-medium">Refresh Desktop</span>
                  <span className="text-xs text-zinc-500">
                    Close menus and clear selection
                  </span>
                </span>
              </span>
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10"
              onClick={() => {
                closeAllWindows();
                notify("All windows closed");
              }}
            >
              <span className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4 text-sky-300" />
                <span>
                  <span className="block text-sm font-medium">Close All Windows</span>
                  <span className="text-xs text-zinc-500">Return to a clean desktop</span>
                </span>
              </span>
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-left hover:bg-red-500/20"
              onClick={() => reboot()}
            >
              <span className="flex items-center gap-3">
                <Power className="h-4 w-4 text-red-300" />
                <span>
                  <span className="block text-sm font-medium text-red-100">Restart…</span>
                  <span className="text-xs text-red-200/60">
                    Show the macOS-style boot screen again
                  </span>
                </span>
              </span>
            </button>
          </>
        ) : null}

        {section === "wallpaper" ? (
          <>
            <h2 className="text-lg font-semibold text-white">Wallpaper</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "default", label: "Monterey" },
                { id: "aurora", label: "Aurora" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "overflow-hidden rounded-xl border text-left transition",
                    wallpaperVariant === item.id
                      ? "border-[#0a84ff] ring-2 ring-[#0a84ff]/40"
                      : "border-white/10 hover:border-white/25"
                  )}
                  onClick={() => {
                    setWallpaperVariant(item.id);
                    notify(`Wallpaper set to ${item.label}`);
                  }}
                >
                  <div
                    className={cn(
                      "h-20 w-full",
                      item.id === "default" ? "wallpaper-default" : "wallpaper-aurora"
                    )}
                    style={{ backgroundSize: "cover" }}
                  />
                  <div className="flex items-center justify-between bg-black/30 px-3 py-2 text-sm">
                    {item.label}
                    {wallpaperVariant === item.id ? (
                      <Check className="h-4 w-4 text-[#0a84ff]" />
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {section === "shortcuts" ? (
          <>
            <h2 className="text-lg font-semibold text-white">Keyboard Shortcuts</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Open Terminal</span>
                <kbd className="text-zinc-400">Ctrl + Alt + T</kbd>
              </li>
              <li className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Open Projects</span>
                <kbd className="text-zinc-400">Ctrl + Alt + P</kbd>
              </li>
              <li className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Open About</span>
                <kbd className="text-zinc-400">Ctrl + Alt + A</kbd>
              </li>
              <li className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Spotlight search</span>
                <kbd className="text-zinc-400">Ctrl + K</kbd>
              </li>
              <li className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Open Calculator</span>
                <kbd className="text-zinc-400">Ctrl + Alt + C</kbd>
              </li>
              <li className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Open Notes</span>
                <kbd className="text-zinc-400">Ctrl + Alt + N</kbd>
              </li>
              <li className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Close active window</span>
                <kbd className="text-zinc-400">Ctrl + W</kbd>
              </li>
            </ul>
          </>
        ) : null}

        {toast ? (
          <p
            className="flex items-center gap-2 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-300"
            role="status"
          >
            <Check className="h-4 w-4" />
            {toast}
          </p>
        ) : null}
      </div>
    </div>
  );
}
