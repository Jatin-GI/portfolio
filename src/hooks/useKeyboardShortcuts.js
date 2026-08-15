"use client";

import { useEffect } from "react";
import { useWindowStore } from "@/store/windowStore";

export function useKeyboardShortcuts() {
  useEffect(() => {
    const onKeyDown = (e) => {
      const store = useWindowStore.getState();
      const tag = document.activeElement?.tagName?.toLowerCase();
      const typing =
        tag === "input" ||
        tag === "textarea" ||
        document.activeElement?.isContentEditable;

      if (e.key === "Escape") {
        if (
          store.contextMenu ||
          store.startMenuOpen ||
          store.calendarOpen ||
          store.controlCenterOpen ||
          store.spotlightOpen
        ) {
          store.closePanels();
          store.setContextMenu(null);
          return;
        }
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        !e.altKey &&
        (e.key.toLowerCase() === "k" || e.key === " ")
      ) {
        e.preventDefault();
        store.toggleSpotlight();
        return;
      }

      const ctrlAlt = e.ctrlKey && e.altKey;

      if (ctrlAlt && e.key.toLowerCase() === "t") {
        e.preventDefault();
        store.openWindow("terminal");
        return;
      }

      if (ctrlAlt && e.key.toLowerCase() === "p") {
        e.preventDefault();
        store.openWindow("projects");
        return;
      }

      if (ctrlAlt && e.key.toLowerCase() === "a") {
        e.preventDefault();
        store.openWindow("about");
        return;
      }

      if (ctrlAlt && e.key.toLowerCase() === "s") {
        e.preventDefault();
        store.openWindow("settings");
        return;
      }

      if (ctrlAlt && e.key.toLowerCase() === "c") {
        e.preventDefault();
        store.openWindow("calculator");
        return;
      }

      if (ctrlAlt && e.key.toLowerCase() === "n") {
        e.preventDefault();
        store.openWindow("notes");
        return;
      }

      if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "w") {
        if (typing) return;
        if (store.activeWindowId) {
          e.preventDefault();
          store.closeActiveWindow();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
