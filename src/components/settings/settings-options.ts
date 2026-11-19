import { Cpu, Monitor, Palette, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { TranslationKey } from '@/i18n/translate';
import type { AccentId, Appearance, Locale, WallpaperId } from '@/types';

export type SettingsTabId = 'appearance' | 'desktop' | 'privacy' | 'system';

export interface SettingsTabDefinition {
  id: SettingsTabId;
  labelKey: TranslationKey;
  descriptionKey: TranslationKey;
  icon: LucideIcon;
}

export const SETTINGS_TABS: SettingsTabDefinition[] = [
  {
    id: 'appearance',
    labelKey: 'settings.tabs.appearance.label',
    descriptionKey: 'settings.tabs.appearance.description',
    icon: Palette,
  },
  {
    id: 'desktop',
    labelKey: 'settings.tabs.desktop.label',
    descriptionKey: 'settings.tabs.desktop.description',
    icon: Monitor,
  },
  {
    id: 'privacy',
    labelKey: 'settings.tabs.privacy.label',
    descriptionKey: 'settings.tabs.privacy.description',
    icon: ShieldCheck,
  },
  {
    id: 'system',
    labelKey: 'settings.tabs.system.label',
    descriptionKey: 'settings.tabs.system.description',
    icon: Cpu,
  },
];

export interface LanguageOption {
  value: Locale;
  labelKey: TranslationKey;
  hintKey: TranslationKey;
  testId: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    value: 'zh-CN',
    labelKey: 'settings.language.zhLabel',
    hintKey: 'settings.language.zhHint',
    testId: 'settings-language-zh',
  },
  {
    value: 'en-US',
    labelKey: 'settings.language.enLabel',
    hintKey: 'settings.language.enHint',
    testId: 'settings-language-en',
  },
];

export interface AppearanceOption {
  value: Appearance;
  labelKey: TranslationKey;
  descriptionKey: TranslationKey;
}

export const APPEARANCE_OPTIONS: AppearanceOption[] = [
  {
    value: 'light',
    labelKey: 'settings.appearance.light.label',
    descriptionKey: 'settings.appearance.light.description',
  },
  {
    value: 'dark',
    labelKey: 'settings.appearance.dark.label',
    descriptionKey: 'settings.appearance.dark.description',
  },
  {
    value: 'system',
    labelKey: 'settings.appearance.system.label',
    descriptionKey: 'settings.appearance.system.description',
  },
];

export interface AccentOption {
  id: AccentId;
  labelKey: TranslationKey;
  color: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { id: 'blue', labelKey: 'settings.appearance.accent.blue', color: '#007aff' },
  { id: 'iris', labelKey: 'settings.appearance.accent.iris', color: '#6c5cf0' },
  { id: 'teal', labelKey: 'settings.appearance.accent.teal', color: '#0c929a' },
  { id: 'graphite', labelKey: 'settings.appearance.accent.graphite', color: '#565f70' },
];

export interface WallpaperOption {
  id: WallpaperId;
  labelKey: TranslationKey;
  descriptionKey: TranslationKey;
  light: CSSProperties;
  dark: CSSProperties;
}

export const WALLPAPER_OPTIONS: WallpaperOption[] = [
  {
    id: 'dawn',
    labelKey: 'settings.appearance.wallpaper.dawn.label',
    descriptionKey: 'settings.appearance.wallpaper.dawn.description',
    light: {
      background:
        'radial-gradient(120% 100% at 12% -10%, rgb(126 177 255 / 0.55) 0%, transparent 58%), radial-gradient(85% 80% at 96% 4%, rgb(223 203 255 / 0.5) 0%, transparent 56%), radial-gradient(95% 75% at 70% 112%, rgb(255 224 202 / 0.62) 0%, transparent 66%), linear-gradient(142deg, #f4f7fc, #edf1f8)',
    },
    dark: {
      background:
        'radial-gradient(120% 100% at 12% -10%, rgb(35 92 176 / 0.6) 0%, transparent 58%), radial-gradient(85% 80% at 96% 4%, rgb(98 68 154 / 0.48) 0%, transparent 56%), radial-gradient(95% 75% at 70% 112%, rgb(22 87 83 / 0.42) 0%, transparent 66%), linear-gradient(142deg, #0d1119, #080b12)',
    },
  },
  {
    id: 'mist',
    labelKey: 'settings.appearance.wallpaper.mist.label',
    descriptionKey: 'settings.appearance.wallpaper.mist.description',
    light: {
      background:
        'radial-gradient(120% 100% at 10% -12%, rgb(149 190 214 / 0.52) 0%, transparent 58%), radial-gradient(90% 85% at 94% 6%, rgb(196 210 226 / 0.55) 0%, transparent 56%), radial-gradient(95% 80% at 66% 112%, rgb(164 205 196 / 0.5) 0%, transparent 62%), linear-gradient(142deg, #f2f5f8, #edf1f5)',
    },
    dark: {
      background:
        'radial-gradient(120% 100% at 10% -12%, rgb(28 74 96 / 0.58) 0%, transparent 58%), radial-gradient(90% 85% at 94% 6%, rgb(52 64 96 / 0.52) 0%, transparent 56%), radial-gradient(95% 80% at 66% 112%, rgb(24 70 68 / 0.46) 0%, transparent 62%), linear-gradient(142deg, #0c1117, #090d12)',
    },
  },
  {
    id: 'linen',
    labelKey: 'settings.appearance.wallpaper.linen.label',
    descriptionKey: 'settings.appearance.wallpaper.linen.description',
    light: {
      background:
        'radial-gradient(120% 100% at 10% -12%, rgb(238 197 159 / 0.56) 0%, transparent 58%), radial-gradient(90% 85% at 94% 6%, rgb(197 209 232 / 0.52) 0%, transparent 56%), radial-gradient(95% 80% at 66% 112%, rgb(234 214 190 / 0.56) 0%, transparent 62%), linear-gradient(142deg, #f7f4ef, #f3f0eb)',
    },
    dark: {
      background:
        'radial-gradient(120% 100% at 10% -12%, rgb(107 75 45 / 0.55) 0%, transparent 58%), radial-gradient(90% 85% at 94% 6%, rgb(55 62 92 / 0.5) 0%, transparent 56%), radial-gradient(95% 80% at 66% 112%, rgb(94 71 40 / 0.46) 0%, transparent 62%), linear-gradient(142deg, #12100e, #0e0d0c)',
    },
  },
];
