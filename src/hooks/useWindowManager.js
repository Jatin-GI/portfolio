"use client";

import { useWindowStore } from "@/store/windowStore";

/**
 * Convenience hook mirroring the window manager API.
 */
export function useWindowManager() {
  return useWindowStore();
}
