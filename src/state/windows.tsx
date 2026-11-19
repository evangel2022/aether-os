import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { getApp } from '@/data/apps';
import type { AppId, DesktopWindow } from '@/types';

export interface ViewportSize {
  width: number;
  height: number;
}

export interface WindowManagerState {
  windows: DesktopWindow[];
  activeWindowId: string | null;
  zCounter: number;
  nextId: number;
}

export type WindowAction =
  | { type: 'open'; appId: AppId; viewport: ViewportSize }
  | { type: 'close'; id: string }
  | { type: 'minimize'; id: string }
  | { type: 'restore'; id: string }
  | { type: 'focus'; id: string }
  | { type: 'toggle-pin'; id: string }
  | { type: 'toggle-maximize'; id: string }
  | { type: 'move'; id: string; x: number; y: number }
  | { type: 'close-all' }
  | { type: 'reflow'; viewport: ViewportSize };

export const initialWindowState: WindowManagerState = {
  windows: [],
  activeWindowId: null,
  zCounter: 0,
  nextId: 1,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function topVisibleWindow(windows: DesktopWindow[]): DesktopWindow | undefined {
  return windows
    .filter((window) => !window.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];
}

function defaultBounds(
  appId: AppId,
  viewport: ViewportSize,
  previous?: DesktopWindow,
): Pick<DesktopWindow, 'x' | 'y' | 'width' | 'height'> {
  const app = getApp(appId);
  const maxWidth = Math.max(360, viewport.width - 40);
  const maxHeight = Math.max(320, viewport.height - 150);
  const width = Math.min(app.defaultWindow.width, maxWidth);
  const height = Math.min(app.defaultWindow.height, maxHeight);

  if (!previous) {
    const x = clamp(
      Math.round((viewport.width - width) / 2),
      12,
      Math.max(12, viewport.width - width - 12),
    );
    const y = clamp(
      Math.round(54 + Math.max(6, (viewport.height - 150 - height) / 2)),
      46,
      Math.max(46, viewport.height - height - 96),
    );
    return { x, y, width, height };
  }

  // Cascade from the current top window so every title bar stays visible and
  // reachable. Windows may tuck slightly behind the Dock, as on macOS.
  const x = clamp(
    previous.x + 36,
    12,
    Math.max(12, viewport.width - width - 12),
  );
  const y = clamp(
    previous.y + 30,
    46,
    Math.max(46, viewport.height - height - 24),
  );

  return { x, y, width, height };
}

export function windowReducer(
  state: WindowManagerState,
  action: WindowAction,
): WindowManagerState {
  switch (action.type) {
    case 'open': {
      const existing = state.windows.find((window) => window.appId === action.appId);
      const z = state.zCounter + 1;
      if (existing) {
        return {
          ...state,
          zCounter: z,
          activeWindowId: existing.id,
          windows: state.windows.map((window) =>
            window.id === existing.id
              ? { ...window, minimized: false, zIndex: z }
              : window,
          ),
        };
      }

      const previous = topVisibleWindow(state.windows);
      const bounds = defaultBounds(action.appId, action.viewport, previous);
      const id = `window-${state.nextId}`;
      const nextWindow: DesktopWindow = {
        id,
        appId: action.appId,
        ...bounds,
        zIndex: z,
        minimized: false,
        pinned: false,
        maximized: false,
      };

      return {
        windows: [...state.windows, nextWindow],
        activeWindowId: id,
        zCounter: z,
        nextId: state.nextId + 1,
      };
    }

    case 'close': {
      const remaining = state.windows.filter((window) => window.id !== action.id);
      const currentIsActive = state.activeWindowId === action.id;
      return {
        ...state,
        windows: remaining,
        activeWindowId: currentIsActive
          ? (topVisibleWindow(remaining)?.id ?? null)
          : state.activeWindowId,
      };
    }

    case 'minimize': {
      const windows = state.windows.map((window) =>
        window.id === action.id ? { ...window, minimized: true } : window,
      );
      const nextActive = state.windows
        .filter((window) => window.id !== action.id && !window.minimized)
        .sort((a, b) => b.zIndex - a.zIndex)[0];
      return {
        ...state,
        windows,
        activeWindowId:
          state.activeWindowId === action.id
            ? (nextActive?.id ?? null)
            : state.activeWindowId,
      };
    }

    case 'restore':
    case 'focus': {
      const z = state.zCounter + 1;
      return {
        ...state,
        zCounter: z,
        activeWindowId: action.id,
        windows: state.windows.map((window) =>
          window.id === action.id
            ? {
                ...window,
                zIndex: z,
                minimized: action.type === 'restore' ? false : window.minimized,
              }
            : window,
        ),
      };
    }

    case 'toggle-pin': {
      const target = state.windows.find((window) => window.id === action.id);
      if (!target) return state;
      const z = state.zCounter + 1;
      return {
        ...state,
        zCounter: z,
        activeWindowId: target.id,
        windows: state.windows.map((window) =>
          window.id === action.id
            ? { ...window, pinned: !window.pinned, zIndex: z }
            : window,
        ),
      };
    }

    case 'toggle-maximize': {
      const z = state.zCounter + 1;
      return {
        ...state,
        zCounter: z,
        activeWindowId: action.id,
        windows: state.windows.map((window) =>
          window.id === action.id
            ? {
                ...window,
                maximized: !window.maximized,
                minimized: false,
                zIndex: z,
              }
            : window,
        ),
      };
    }

    case 'move': {
      return {
        ...state,
        windows: state.windows.map((window) =>
          window.id === action.id
            ? { ...window, x: action.x, y: action.y }
            : window,
        ),
      };
    }

    case 'close-all': {
      return { ...initialWindowState, nextId: state.nextId, zCounter: state.zCounter };
    }

    case 'reflow': {
      const { width: viewportWidth, height: viewportHeight } = action.viewport;
      return {
        ...state,
        windows: state.windows.map((window) => {
          if (window.maximized) return window;
          const width = Math.min(window.width, Math.max(360, viewportWidth - 40));
          const height = Math.min(window.height, Math.max(320, viewportHeight - 150));
          return {
            ...window,
            width,
            height,
            x: clamp(window.x, 8, Math.max(8, viewportWidth - width - 8)),
            y: clamp(window.y, 50, Math.max(50, viewportHeight - 80)),
          };
        }),
      };
    }

    default:
      return state;
  }
}

interface WindowManagerContextValue {
  windows: DesktopWindow[];
  activeWindowId: string | null;
  openApp: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  togglePin: (id: string) => void;
  toggleMaximize: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  closeAllWindows: () => void;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

function getViewport(): ViewportSize {
  if (typeof window === 'undefined') return { width: 1440, height: 900 };
  return { width: window.innerWidth, height: window.innerHeight };
}

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowReducer, initialWindowState);

  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'reflow', viewport: getViewport() });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openApp = useCallback((appId: AppId) => {
    dispatch({ type: 'open', appId, viewport: getViewport() });
  }, []);
  const closeWindow = useCallback((id: string) => dispatch({ type: 'close', id }), []);
  const minimizeWindow = useCallback(
    (id: string) => dispatch({ type: 'minimize', id }),
    [],
  );
  const restoreWindow = useCallback(
    (id: string) => dispatch({ type: 'restore', id }),
    [],
  );
  const focusWindow = useCallback((id: string) => dispatch({ type: 'focus', id }), []);
  const togglePin = useCallback((id: string) => dispatch({ type: 'toggle-pin', id }), []);
  const toggleMaximize = useCallback(
    (id: string) => dispatch({ type: 'toggle-maximize', id }),
    [],
  );
  const moveWindow = useCallback(
    (id: string, x: number, y: number) => dispatch({ type: 'move', id, x, y }),
    [],
  );
  const closeAllWindows = useCallback(() => dispatch({ type: 'close-all' }), []);

  const value = useMemo<WindowManagerContextValue>(
    () => ({
      windows: state.windows,
      activeWindowId: state.activeWindowId,
      openApp,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      togglePin,
      toggleMaximize,
      moveWindow,
      closeAllWindows,
    }),
    [
      state.windows,
      state.activeWindowId,
      openApp,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      togglePin,
      toggleMaximize,
      moveWindow,
      closeAllWindows,
    ],
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindows(): WindowManagerContextValue {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindows must be used inside WindowManagerProvider');
  }
  return context;
}
