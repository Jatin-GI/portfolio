"use client";

import { cn } from "@/lib/utils";

export default function WindowHeader({
  icon,
  title,
  isActive,
  onMinimize,
  onMaximize,
  onClose,
  onPointerDown,
}) {
  return (
    <div
      className={cn(
        "window-drag-handle mac-titlebar relative flex h-11 shrink-0 items-center px-3 select-none"
      )}
      onPointerDown={onPointerDown}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onMaximize?.();
      }}
    >
      {/* Traffic lights — macOS left */}
      <div
        className="relative z-10 flex items-center gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close window"
          className="traffic-light close"
          onClick={onClose}
        />
        <button
          type="button"
          aria-label="Minimize window"
          className="traffic-light minimize"
          onClick={onMinimize}
        />
        <button
          type="button"
          aria-label="Maximize window"
          className="traffic-light maximize"
          onClick={onMaximize}
        />
      </div>

      {/* Centered title */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1.5 px-16">
        {icon ? (
          <span className="flex h-3.5 w-3.5 items-center justify-center text-white/70">
            {icon}
          </span>
        ) : null}
        <span
          className={cn(
            "truncate text-[13px] font-medium",
            isActive ? "text-white/90" : "text-white/55"
          )}
        >
          {/* {title} */}
        </span>
      </div>
    </div>
  );
}
