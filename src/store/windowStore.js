import { create } from "zustand";

const MENU_BAR_HEIGHT = 28;
const DOCK_CLEARANCE = 88;
const TASKBAR_HEIGHT = DOCK_CLEARANCE;
const DEFAULT_OFFSET = 36;

const APP_DEFAULTS = {
  about: { title: "About Me", width: 620, height: 480, x: 80, y: 50 },
  projects: { title: "Projects", width: 820, height: 540, x: 140, y: 40 },
  experience: { title: "Experience", width: 660, height: 500, x: 120, y: 55 },
  skills: { title: "Skills", width: 700, height: 500, x: 160, y: 60 },
  resume: { title: "Resume", width: 720, height: 560, x: 100, y: 36 },
  terminal: { title: "Terminal", width: 680, height: 420, x: 200, y: 80 },
  contact: { title: "Contact", width: 580, height: 500, x: 180, y: 70 },
  settings: { title: "System Settings", width: 720, height: 520, x: 150, y: 48 },
  calculator: { title: "Calculator", width: 320, height: 460, x: 260, y: 70 },
  notes: { title: "Notes", width: 680, height: 480, x: 170, y: 60 },
};

let nextZIndex = 20;

function getCascadePosition(openCount) {
  const step = openCount % 6;
  return {
    x: DEFAULT_OFFSET + step * 28,
    y: 16 + step * 24,
  };
}

function createProjectWindow(project) {
  return {
    id: `project-${project.id}`,
    appId: "project-details",
    title: project.name,
    projectId: project.id,
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    x: 160,
    y: 36,
    width: 640,
    height: 540,
    zIndex: ++nextZIndex,
    prevBounds: null,
  };
}

export const useWindowStore = create((set, get) => ({
  windows: {},
  activeWindowId: null,
  startMenuOpen: false,
  calendarOpen: false,
  controlCenterOpen: false,
  spotlightOpen: false,
  contextMenu: null,
  selectedIconId: null,
  isMobile: false,
  wallpaperVariant: "default",
  wifiOn: true,
  soundLevel: 70,
  brightness: 85,
  refreshKey: 0,
  bootSession: 0,
  desktopReady: false,
  notifications: [],

  setIsMobile: (isMobile) => set({ isMobile }),

  setSelectedIconId: (id) => set({ selectedIconId: id }),

  setStartMenuOpen: (open) =>
    set({
      startMenuOpen: open,
      calendarOpen: false,
      controlCenterOpen: false,
      spotlightOpen: false,
      contextMenu: open ? null : get().contextMenu,
    }),

  toggleStartMenu: () =>
    set((state) => ({
      startMenuOpen: !state.startMenuOpen,
      calendarOpen: false,
      controlCenterOpen: false,
      spotlightOpen: false,
      contextMenu: null,
    })),

  setSpotlightOpen: (open) =>
    set({
      spotlightOpen: open,
      startMenuOpen: false,
      calendarOpen: false,
      controlCenterOpen: false,
      contextMenu: null,
    }),

  toggleSpotlight: () =>
    set((state) => ({
      spotlightOpen: !state.spotlightOpen,
      startMenuOpen: false,
      calendarOpen: false,
      controlCenterOpen: false,
      contextMenu: null,
    })),

  pushNotification: ({ title = "", message, type = "info", ttl = 3200 }) =>
    set((state) => ({
      notifications: [
        ...state.notifications.slice(-4),
        {
          id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title,
          message,
          type,
          ttl,
        },
      ],
    })),

  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  setCalendarOpen: (open) =>
    set({
      calendarOpen: open,
      controlCenterOpen: open ? false : get().controlCenterOpen,
      startMenuOpen: open ? false : get().startMenuOpen,
      spotlightOpen: false,
      contextMenu: null,
    }),

  toggleCalendar: () =>
    set((state) => ({
      calendarOpen: !state.calendarOpen,
      controlCenterOpen: false,
      startMenuOpen: false,
      contextMenu: null,
    })),

  setControlCenterOpen: (open) =>
    set({
      controlCenterOpen: open,
      calendarOpen: open ? false : get().calendarOpen,
      startMenuOpen: open ? false : get().startMenuOpen,
      contextMenu: null,
    }),

  toggleControlCenter: () =>
    set((state) => ({
      controlCenterOpen: !state.controlCenterOpen,
      calendarOpen: false,
      startMenuOpen: false,
      contextMenu: null,
    })),

  setContextMenu: (menu) =>
    set({
      contextMenu: menu,
      startMenuOpen: menu ? false : get().startMenuOpen,
      calendarOpen: false,
      controlCenterOpen: false,
    }),

  setWallpaperVariant: (variant) => set({ wallpaperVariant: variant }),
  setWifiOn: (wifiOn) => set({ wifiOn }),
  setSoundLevel: (soundLevel) => set({ soundLevel }),
  setBrightness: (brightness) => set({ brightness }),

  refreshDesktop: () =>
    set((state) => ({
      selectedIconId: null,
      startMenuOpen: false,
      calendarOpen: false,
      controlCenterOpen: false,
      contextMenu: null,
      refreshKey: state.refreshKey + 1,
    })),

  closeAllWindows: () => {
    const windows = { ...get().windows };
    Object.keys(windows).forEach((id) => {
      windows[id] = { ...windows[id], isOpen: false, isMinimized: false };
    });
    set({ windows, activeWindowId: null });
  },

  reboot: () => {
    const windows = { ...get().windows };
    Object.keys(windows).forEach((id) => {
      windows[id] = { ...windows[id], isOpen: false, isMinimized: false };
    });
    try {
      sessionStorage.removeItem("jatin-os-booted");
    } catch {
      // ignore
    }
    set((state) => ({
      windows,
      activeWindowId: null,
      selectedIconId: null,
      startMenuOpen: false,
      calendarOpen: false,
      controlCenterOpen: false,
      contextMenu: null,
      bootSession: state.bootSession + 1,
      desktopReady: false,
    }));
  },

  finishBoot: () => set({ desktopReady: true }),

  closePanels: () =>
    set({
      startMenuOpen: false,
      calendarOpen: false,
      controlCenterOpen: false,
      spotlightOpen: false,
      contextMenu: null,
    }),

  openWindow: (appId, options = {}) => {
    const state = get();
    const existing = state.windows[appId];

    if (existing?.isOpen) {
      get().focusWindow(appId);
      if (existing.isMinimized) {
        set((s) => ({
          windows: {
            ...s.windows,
            [appId]: { ...s.windows[appId], isMinimized: false },
          },
        }));
      }
      set({ startMenuOpen: false, contextMenu: null });
      return;
    }

    const defaults = APP_DEFAULTS[appId] || {
      title: options.title || appId,
      width: 640,
      height: 480,
      x: 100,
      y: 80,
    };

    const openCount = Object.values(state.windows).filter((w) => w.isOpen).length;
    const cascade = getCascadePosition(openCount);
    const isMobile = state.isMobile;

    const windowState = {
      id: appId,
      appId,
      title: options.title || defaults.title,
      isOpen: true,
      isMinimized: false,
      isMaximized: isMobile,
      x: isMobile ? 0 : options.x ?? cascade.x ?? defaults.x,
      y: isMobile ? 0 : options.y ?? cascade.y ?? defaults.y,
      width: isMobile ? (typeof window !== "undefined" ? window.innerWidth : 360) : defaults.width,
      height: isMobile
        ? typeof window !== "undefined"
          ? window.innerHeight - TASKBAR_HEIGHT
          : 640
        : defaults.height,
      zIndex: ++nextZIndex,
      prevBounds: null,
      ...options.extra,
    };

    set({
      windows: { ...state.windows, [appId]: windowState },
      activeWindowId: appId,
      startMenuOpen: false,
      contextMenu: null,
    });
  },

  openProjectDetails: (project) => {
    const id = `project-${project.id}`;
    const state = get();
    const existing = state.windows[id];

    if (existing?.isOpen) {
      get().focusWindow(id);
      if (existing.isMinimized) {
        set((s) => ({
          windows: {
            ...s.windows,
            [id]: { ...s.windows[id], isMinimized: false },
          },
        }));
      }
      return;
    }

    const win = createProjectWindow(project);
    if (state.isMobile) {
      win.isMaximized = true;
      win.x = 0;
      win.y = 0;
      win.width = typeof window !== "undefined" ? window.innerWidth : 360;
      win.height =
        typeof window !== "undefined" ? window.innerHeight - TASKBAR_HEIGHT : 640;
    }

    set({
      windows: { ...state.windows, [id]: win },
      activeWindowId: id,
      startMenuOpen: false,
      contextMenu: null,
    });
  },

  closeWindow: (id) => {
    const state = get();
    const windows = { ...state.windows };
    if (!windows[id]) return;

    windows[id] = { ...windows[id], isOpen: false, isMinimized: false };

    const remaining = Object.values(windows)
      .filter((w) => w.isOpen && !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex);

    set({
      windows,
      activeWindowId: remaining[0]?.id || null,
    });
  },

  minimizeWindow: (id) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;

      const windows = {
        ...state.windows,
        [id]: { ...win, isMinimized: true },
      };

      const remaining = Object.values(windows)
        .filter((w) => w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);

      return {
        windows,
        activeWindowId: remaining[0]?.id || null,
      };
    });
  },

  maximizeWindow: (id) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;

      if (win.isMaximized) {
        const prev = win.prevBounds || {
          x: win.x,
          y: win.y,
          width: win.width,
          height: win.height,
        };
        return {
          windows: {
            ...state.windows,
            [id]: {
              ...win,
              isMaximized: false,
              ...prev,
              prevBounds: null,
              zIndex: ++nextZIndex,
            },
          },
          activeWindowId: id,
        };
      }

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...win,
            isMaximized: true,
            prevBounds: {
              x: win.x,
              y: win.y,
              width: win.width,
              height: win.height,
            },
            x: 0,
            y: MENU_BAR_HEIGHT,
            width: typeof window !== "undefined" ? window.innerWidth : 1280,
            height:
              typeof window !== "undefined"
                ? window.innerHeight - MENU_BAR_HEIGHT - DOCK_CLEARANCE
                : 720,
            zIndex: ++nextZIndex,
          },
        },
        activeWindowId: id,
      };
    });
  },

  restoreWindow: (id) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, isMinimized: false, zIndex: ++nextZIndex },
        },
        activeWindowId: id,
        startMenuOpen: false,
      };
    });
  },

  focusWindow: (id) => {
    set((state) => {
      const win = state.windows[id];
      if (!win || !win.isOpen) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, zIndex: ++nextZIndex, isMinimized: false },
        },
        activeWindowId: id,
        startMenuOpen: false,
        contextMenu: null,
      };
    });
  },

  updateWindowBounds: (id, bounds) => {
    set((state) => {
      const win = state.windows[id];
      if (!win || win.isMaximized) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, ...bounds },
        },
      };
    });
  },

  closeActiveWindow: () => {
    const { activeWindowId } = get();
    if (activeWindowId) get().closeWindow(activeWindowId);
  },

  getOpenWindows: () =>
    Object.values(get().windows).filter((w) => w.isOpen),
}));

export { APP_DEFAULTS, TASKBAR_HEIGHT, MENU_BAR_HEIGHT, DOCK_CLEARANCE };
