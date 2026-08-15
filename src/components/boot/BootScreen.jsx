"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "jatin-os-booted";
const emptySubscribe = () => () => {};

function readShouldShowBoot() {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}

function markBooted() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // ignore
  }
}

function clearBooted() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export default function BootScreen({ onComplete, force = false, sessionId = 0 }) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const storedShouldShow = useSyncExternalStore(
    emptySubscribe,
    readShouldShowBoot,
    () => true
  );
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const completedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const shouldShow = force || storedShouldShow;
  const visible = isClient && shouldShow && !dismissed;

  useEffect(() => {
    if (!isClient || completedRef.current) return undefined;

    if (!shouldShow) {
      completedRef.current = true;
      queueMicrotask(() => onComplete?.());
      return undefined;
    }

    if (force) clearBooted();

    const start = Date.now();
    const duration = reduceMotion ? 700 : 2200;
    let raf;
    let doneTimer;

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(Math.round(eased * 100));

      if (t >= 1) {
        doneTimer = setTimeout(() => {
          markBooted();
          completedRef.current = true;
          setDismissed(true);
          onComplete?.();
        }, reduceMotion ? 120 : 280);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(doneTimer);
    };
  }, [isClient, shouldShow, onComplete, reduceMotion, sessionId, force]);

  const skip = () => {
    markBooted();
    completedRef.current = true;
    setDismissed(true);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={`boot-${sessionId}`}
          className="fixed inset-0 z-[20000] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
          aria-label="Starting up"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-[4.5rem]"
          >
            <svg
              viewBox="0 0 100 100"
              className="h-[72px] w-[72px] drop-shadow-sm sm:h-[88px] sm:w-[88px]"
              aria-hidden
            >
              <defs>
                <linearGradient id="bootShine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#cfcfcf" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="46" fill="url(#bootShine)" />
              <text
                x="50"
                y="59"
                textAnchor="middle"
                fill="#0a0a0a"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                fontSize="30"
                fontWeight="700"
                letterSpacing="-1"
              >
                JG
              </text>
            </svg>
          </motion.div>

          <div
            className="h-[3px] w-[140px] overflow-hidden rounded-full bg-white/20 sm:w-[168px]"
            aria-hidden
          >
            <div
              className="h-full rounded-full bg-white transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            type="button"
            onClick={skip}
            className="absolute bottom-8 right-8 rounded-md px-3 py-1.5 text-xs text-white/30 transition hover:bg-white/5 hover:text-white/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40"
          >
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
