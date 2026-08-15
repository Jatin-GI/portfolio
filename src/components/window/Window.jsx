"use client";

import { useSyncExternalStore } from "react";
import { Rnd } from "react-rnd";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import WindowHeader from "@/components/window/WindowHeader";
import { useWindowStore, MENU_BAR_HEIGHT, DOCK_CLEARANCE } from "@/store/windowStore";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export default function Window({
  id,
  icon,
  title,
  children,
  minWidth = 320,
  minHeight = 240,
}) {
  const win = useWindowStore((s) => s.windows[id]);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const isMobile = useWindowStore((s) => s.isMobile);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
  const updateWindowBounds = useWindowStore((s) => s.updateWindowBounds);
  const reduceMotion = useReducedMotion();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!win || !win.isOpen || !isClient) return null;

  const isActive = activeWindowId === id;
  const disableDragResize = isMobile || win.isMaximized;

  const content = (
    <div
      className={cn(
        "mac-window flex h-full w-full flex-col overflow-hidden",
        win.isMaximized || isMobile ? "rounded-none" : "rounded-xl",
        isActive ? "is-active" : "is-inactive"
      )}
      onMouseDown={() => focusWindow(id)}
      role="dialog"
      aria-label={title || win.title}
      aria-modal="false"
    >
      <WindowHeader
        icon={icon}
        title={title || win.title}
        isMaximized={win.isMaximized}
        isActive={isActive}
        onMinimize={() => minimizeWindow(id)}
        onMaximize={() => {
          if (!isMobile) maximizeWindow(id);
        }}
        onClose={() => closeWindow(id)}
        onPointerDown={() => focusWindow(id)}
      />
      <div className="mac-window-body min-h-0 flex-1 overflow-auto bg-[#1e1e1e] text-zinc-200">
        {children}
      </div>
    </div>
  );

  if (win.isMinimized) return null;

  if (disableDragResize) {
    const style =
      win.isMaximized || isMobile
        ? {
            position: "fixed",
            left: 0,
            top: MENU_BAR_HEIGHT,
            width: "100vw",
            height: `calc(100dvh - ${MENU_BAR_HEIGHT + DOCK_CLEARANCE}px)`,
            zIndex: win.zIndex,
          }
        : {
            position: "absolute",
            left: win.x,
            top: win.y,
            width: win.width,
            height: win.height,
            zIndex: win.zIndex,
          };

    return (
      <AnimatePresence>
        <motion.div
          key={id}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          style={style}
          className="pointer-events-auto"
        >
          {content}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <Rnd
      size={{ width: win.width, height: win.height }}
      position={{ x: win.x, y: win.y }}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{ zIndex: win.zIndex }}
      onDragStart={() => focusWindow(id)}
      onResizeStart={() => focusWindow(id)}
      onDragStop={(_e, d) => updateWindowBounds(id, { x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        updateWindowBounds(id, {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          x: position.x,
          y: position.y,
        });
      }}
      enableResizing={!disableDragResize}
      disableDragging={disableDragResize}
      className="pointer-events-auto"
    >
      <motion.div
        className="h-full w-full"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
      >
        {content}
      </motion.div>
    </Rnd>
  );
}
