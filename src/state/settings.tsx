import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AetherSettings } from '@/types';

const STORAGE_KEY = 'aether-os-demo-settings-v1';

export const DEFAULT_SETTINGS: AetherSettings = {
  language: 'zh-CN',
  appearance: 'light',
  accent: 'blue',
  wallpaper: 'dawn',
  dockMagnification: true,
  reduceMotion: false,
  showSeconds: false,
  memoryEnabled: true,
  localOnly: true,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function loadSettings(): AetherSettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return DEFAULT_SETTINGS;

    return {
      language:
        parsed.language === 'en-US' || parsed.language === 'zh-CN'
          ? parsed.language
          : DEFAULT_SETTINGS.language,
      appearance:
        parsed.appearance === 'dark' ||
        parsed.appearance === 'light' ||
        parsed.appearance === 'system'
          ? parsed.appearance
          : DEFAULT_SETTINGS.appearance,
      accent:
        parsed.accent === 'blue' ||
        parsed.accent === 'iris' ||
        parsed.accent === 'teal' ||
        parsed.accent === 'graphite'
          ? parsed.accent
          : DEFAULT_SETTINGS.accent,
      wallpaper:
        parsed.wallpaper === 'dawn' ||
        parsed.wallpaper === 'mist' ||
        parsed.wallpaper === 'linen'
          ? parsed.wallpaper
          : DEFAULT_SETTINGS.wallpaper,
      dockMagnification:
        typeof parsed.dockMagnification === 'boolean'
          ? parsed.dockMagnification
          : DEFAULT_SETTINGS.dockMagnification,
      reduceMotion:
        typeof parsed.reduceMotion === 'boolean'
          ? parsed.reduceMotion
          : DEFAULT_SETTINGS.reduceMotion,
      showSeconds:
        typeof parsed.showSeconds === 'boolean'
          ? parsed.showSeconds
          : DEFAULT_SETTINGS.showSeconds,
      memoryEnabled:
        typeof parsed.memoryEnabled === 'boolean'
          ? parsed.memoryEnabled
          : DEFAULT_SETTINGS.memoryEnabled,
      localOnly:
        typeof parsed.localOnly === 'boolean'
          ? parsed.localOnly
          : DEFAULT_SETTINGS.localOnly,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

interface SettingsContextValue {
  settings: AetherSettings;
  resolvedTheme: 'light' | 'dark';
  updateSetting: <Key extends keyof AetherSettings>(
    key: Key,
    value: AetherSettings[Key],
  ) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function getSystemDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AetherSettings>(loadSettings);
  const [systemDark, setSystemDark] = useState<boolean>(getSystemDark);

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    settings.appearance === 'system' ? (systemDark ? 'dark' : 'light') : settings.appearance;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.accent = settings.accent;
    root.dataset.wallpaper = settings.wallpaper;
    root.classList.toggle('reduce-motion', settings.reduceMotion);
  }, [resolvedTheme, settings.accent, settings.wallpaper, settings.reduceMotion]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Local storage can be unavailable in private modes; the demo should still work.
    }
  }, [settings]);

  const updateSetting = useCallback(
    <Key extends keyof AetherSettings>(key: Key, value: AetherSettings[Key]) => {
      setSettings((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const resetSettings = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, resolvedTheme, updateSetting, resetSettings }),
    [settings, resolvedTheme, updateSetting, resetSettings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return context;
}
