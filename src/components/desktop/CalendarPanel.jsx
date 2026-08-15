"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWindowStore } from "@/store/windowStore";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < startDay; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarPanel() {
  const open = useWindowStore((s) => s.calendarOpen);
  const setCalendarOpen = useWindowStore((s) => s.setCalendarOpen);
  const reduceMotion = useReducedMotion();
  const today = new Date();
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const cells = useMemo(
    () => buildMonth(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  );

  const title = cursor.toLocaleString([], { month: "long", year: "numeric" });
  const todayLabel = today.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatePresence>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close calendar"
            className="pointer-events-auto absolute inset-0 z-[10002]"
            onClick={() => setCalendarOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-label="Calendar"
            initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-auto absolute right-2 top-9 z-[10003] w-[min(320px,calc(100vw-1rem))] overflow-hidden rounded-2xl border border-white/15 bg-[rgba(40,40,42,0.82)] p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[13px] text-red-400">{todayLabel}</p>
            <div className="mt-1 mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous month"
                  className="rounded-md p-1 hover:bg-white/10"
                  onClick={() =>
                    setCursor(
                      (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)
                    )
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  className="rounded-md p-1 hover:bg-white/10"
                  onClick={() =>
                    setCursor(
                      (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)
                    )
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[11px] text-white/45">
              {WEEKDAYS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                const isToday =
                  day &&
                  day === today.getDate() &&
                  cursor.getMonth() === today.getMonth() &&
                  cursor.getFullYear() === today.getFullYear();
                return (
                  <div
                    key={`${cursor.getMonth()}-${i}`}
                    className={cn(
                      "flex h-9 items-center justify-center rounded-full text-[13px]",
                      day ? "text-white/90" : "text-transparent",
                      isToday && "bg-[#0a84ff] font-semibold text-white"
                    )}
                  >
                    {day || "·"}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
