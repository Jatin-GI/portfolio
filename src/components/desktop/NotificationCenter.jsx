"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useWindowStore } from "@/store/windowStore";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
};

export default function NotificationCenter() {
  const notifications = useWindowStore((s) => s.notifications);
  const dismissNotification = useWindowStore((s) => s.dismissNotification);

  useEffect(() => {
    if (!notifications.length) return undefined;
    const timers = notifications.map((n) =>
      setTimeout(() => dismissNotification(n.id), n.ttl || 3200)
    );
    return () => timers.forEach(clearTimeout);
  }, [notifications, dismissNotification]);

  return (
    <div className="pointer-events-none absolute right-3 top-12 z-[12000] flex w-[min(320px,calc(100vw-1.5rem))] flex-col gap-2 md:top-10">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = ICONS[n.type] || Info;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 24, y: -4 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={cn(
                "pointer-events-auto flex items-start gap-2 rounded-xl border border-white/15 bg-[rgba(36,36,38,0.92)] px-3 py-2.5 shadow-xl backdrop-blur-xl"
              )}
              role="status"
            >
              <Icon
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  n.type === "success" && "text-emerald-400",
                  n.type === "warning" && "text-amber-400",
                  n.type === "info" && "text-sky-400"
                )}
              />
              <div className="min-w-0 flex-1">
                {n.title ? (
                  <p className="text-[12px] font-semibold text-white">{n.title}</p>
                ) : null}
                <p className="text-[12px] text-zinc-300">{n.message}</p>
              </div>
              <button
                type="button"
                aria-label="Dismiss"
                className="rounded p-0.5 text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
                onClick={() => dismissNotification(n.id)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
