"use client";

import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import MenuBar from "@/components/desktop/MenuBar";
import Dock from "@/components/desktop/Dock";
import Launchpad from "@/components/desktop/Launchpad";
import ContextMenu from "@/components/desktop/ContextMenu";
import CalendarPanel from "@/components/desktop/CalendarPanel";
import ControlCenter from "@/components/desktop/ControlCenter";
import WindowManager from "@/components/window/WindowManager";
import BootScreen from "@/components/boot/BootScreen";
import NotificationCenter from "@/components/desktop/NotificationCenter";
import Spotlight from "@/components/desktop/Spotlight";
import IPhoneHome from "@/components/mobile/IPhoneHome";
import { useWindowStore } from "@/store/windowStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import profile from "@/data/profile";
import {
  AboutIcon,
  ProjectsIcon,
  ExperienceIcon,
  SkillsIcon,
  ResumeIcon,
  TerminalIcon,
  ContactIcon,
  SettingsIcon,
  CalculatorIcon,
  NotesIcon,
} from "@/components/icons/MacAppIcons";
import { cn } from "@/lib/utils";

const ICONS = [
  { id: "projects", label: "Projects", icon: <ProjectsIcon className="h-12 w-12" /> },
  { id: "about", label: "About Me", icon: <AboutIcon className="h-12 w-12" /> },
  { id: "experience", label: "Experience", icon: <ExperienceIcon className="h-12 w-12" /> },
  { id: "skills", label: "Skills", icon: <SkillsIcon className="h-12 w-12" /> },
  { id: "resume", label: "Resume", icon: <ResumeIcon className="h-12 w-12" /> },
  { id: "terminal", label: "Terminal", icon: <TerminalIcon className="h-12 w-12" /> },
  { id: "calculator", label: "Calculator", icon: <CalculatorIcon className="h-12 w-12" /> },
  { id: "notes", label: "Notes", icon: <NotesIcon className="h-12 w-12" /> },
  { id: "contact", label: "Contact", icon: <ContactIcon className="h-12 w-12" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon className="h-12 w-12" /> },
];

export default function Desktop() {
  const isMobile = useIsMobile();
  const selectedIconId = useWindowStore((s) => s.selectedIconId);
  const setSelectedIconId = useWindowStore((s) => s.setSelectedIconId);
  const openWindow = useWindowStore((s) => s.openWindow);
  const setContextMenu = useWindowStore((s) => s.setContextMenu);
  const closePanels = useWindowStore((s) => s.closePanels);
  const setIsMobile = useWindowStore((s) => s.setIsMobile);
  const wallpaperVariant = useWindowStore((s) => s.wallpaperVariant);
  const brightness = useWindowStore((s) => s.brightness);
  const refreshKey = useWindowStore((s) => s.refreshKey);
  const bootSession = useWindowStore((s) => s.bootSession);
  const desktopReady = useWindowStore((s) => s.desktopReady);
  const finishBoot = useWindowStore((s) => s.finishBoot);
  const windows = useWindowStore((s) => s.windows);

  const hasOpenApp = Object.values(windows).some((w) => w.isOpen && !w.isMinimized);

  const handleBootComplete = useCallback(() => {
    finishBoot();
  }, [finishBoot]);

  useKeyboardShortcuts();

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  const handleDesktopClick = useCallback(() => {
    setSelectedIconId(null);
    setContextMenu(null);
    closePanels();
  }, [setSelectedIconId, setContextMenu, closePanels]);

  const handleContextMenu = useCallback(
    (e) => {
      if (isMobile) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      closePanels();
      setContextMenu({ x: e.clientX, y: e.clientY });
    },
    [setContextMenu, closePanels, isMobile]
  );

  return (
    <>
      <BootScreen
        key={bootSession}
        sessionId={bootSession}
        force={bootSession > 0}
        onComplete={handleBootComplete}
      />

      <div
        className={cn(
          "desktop-root relative h-[100dvh] w-full overflow-hidden text-zinc-100",
          isMobile && "iphone-root"
        )}
        onClick={handleDesktopClick}
        onContextMenu={handleContextMenu}
        role="application"
        aria-label={
          isMobile ? `${profile.name}'s iPhone` : `${profile.name}'s desktop`
        }
      >
        <div
          key={refreshKey}
          className={cn(
            "absolute inset-0",
            wallpaperVariant === "aurora" ? "wallpaper-aurora" : "wallpaper-default",
            isMobile && "iphone-wallpaper"
          )}
          style={{ filter: `brightness(${Math.max(0.45, brightness / 100)})` }}
        />
        <div className="desktop-vignette pointer-events-none absolute inset-0" />

        {desktopReady ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 h-full w-full"
          >
            {isMobile ? (
              <>
                <IPhoneHome hideSpringboard={hasOpenApp} />
                <div className="pointer-events-none absolute inset-0 z-40">
                  <WindowManager />
                </div>
                <NotificationCenter />
              </>
            ) : (
              <>
                <MenuBar />
                <CalendarPanel />
                <ControlCenter />
                <Spotlight />
                <NotificationCenter />

                <nav
                  aria-label="Desktop icons"
                  className="pointer-events-auto absolute left-3 top-10 z-20 flex max-h-[calc(100dvh-120px)] flex-col flex-wrap content-start gap-y-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {ICONS.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * index, duration: 0.2 }}
                    >
                      <DesktopIcon
                        id={item.id}
                        icon={item.icon}
                        label={item.label}
                        selected={selectedIconId === item.id}
                        onSelect={setSelectedIconId}
                        onOpen={(id) => openWindow(id)}
                      />
                    </motion.div>
                  ))}
                </nav>

                <div className="pointer-events-none absolute inset-x-0 top-7 bottom-[88px] z-30">
                  <div className="pointer-events-none relative h-full w-full overflow-hidden">
                    <WindowManager />
                  </div>
                </div>

                <Launchpad />
                <ContextMenu />
                <Dock />
              </>
            )}
          </motion.div>
        ) : null}
      </div>
    </>
  );
}
