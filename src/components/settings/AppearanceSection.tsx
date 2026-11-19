import { Check, Info, Languages } from 'lucide-react';
import { SettingsCard } from '@/components/settings/SettingsCard';
import {
  ACCENT_OPTIONS,
  APPEARANCE_OPTIONS,
  LANGUAGE_OPTIONS,
  WALLPAPER_OPTIONS,
} from '@/components/settings/settings-options';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { useSettings } from '@/state/settings';
import type { Appearance } from '@/types';

function ThemePreview({ appearance }: { appearance: Appearance }) {
  const isSystem = appearance === 'system';
  const dark = appearance === 'dark';

  const canvas = isSystem
    ? 'linear-gradient(112deg, #e9eff8 0 49.5%, #0b0f16 50% 100%)'
    : dark
      ? 'linear-gradient(150deg, #141a24, #0a0e15)'
      : 'linear-gradient(150deg, #e9eff8, #f8fafd)';
  const windowSurface = isSystem
    ? 'linear-gradient(112deg, #ffffff 0 49.5%, #1b222d 50% 100%)'
    : dark
      ? '#1b222d'
      : '#ffffff';
  const rail = dark ? 'rgba(255,255,255,0.07)' : 'rgba(110, 130, 160, 0.13)';
  const bar = isSystem ? 'bg-[#9aa6b8]/55' : dark ? 'bg-white/20' : 'bg-[#9aa6b8]/45';

  return (
    <div
      aria-hidden
      className="relative aspect-[16/11] w-full overflow-hidden rounded-[11px] border border-black/[0.06] dark:border-white/[0.08]"
      style={{ background: canvas }}
    >
      <span className="absolute left-2 top-[7%] h-[3px] w-[26%] rounded-full bg-[#9aa6b8]/40" />
      <span className="absolute right-2 top-[7%] h-[3px] w-[10%] rounded-full bg-[#9aa6b8]/30" />
      <span
        className="absolute bottom-2 left-2 top-[20%] w-[13%] rounded-[4px]"
        style={{ background: rail }}
      />
      <div
        className="absolute bottom-2 right-[7%] top-[24%] w-[62%] overflow-hidden rounded-[5px] shadow-[0_4px_10px_-6px_rgb(15_32_62/0.35)]"
        style={{ background: windowSurface }}
      >
        <div className="flex h-[20%] items-center gap-[3px] border-b border-black/[0.06] px-1.5 dark:border-white/[0.07]">
          <span className="size-[3px] rounded-full bg-[#ff5f57]" />
          <span className="size-[3px] rounded-full bg-[#febc2e]" />
          <span className="size-[3px] rounded-full bg-[#28c840]" />
        </div>
        <div className="space-y-[5px] px-1.5 pt-1.5">
          <span className={cn('block h-[3px] w-[72%] rounded-full', bar)} />
          <span className={cn('block h-[2px] w-[54%] rounded-full', bar)} />
          <span className="mt-1 block h-[6px] w-[34%] rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}

export function AppearanceSection() {
  const { t, locale, setLocale } = useI18n();
  const { settings, resolvedTheme, updateSetting } = useSettings();

  return (
    <div className="space-y-4">
      <SettingsCard
        title={t('settings.language.title')}
        description={t('settings.language.description')}
      >
        <div
          className="grid gap-2.5 sm:grid-cols-2"
          role="group"
          aria-label={t('settings.language.groupAria')}
        >
          {LANGUAGE_OPTIONS.map((option) => {
            const selected = locale === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                data-testid={option.testId}
                data-locale={option.value}
                onClick={() => setLocale(option.value)}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-[16px] border p-3 text-left transition-all duration-200 ease-aether active:scale-[0.99]',
                  selected
                    ? 'border-accent/40 bg-accent/[0.055] shadow-[0_1px_0_rgb(255_255_255/0.45)_inset]'
                    : 'border-line/[0.08] bg-surface/40 hover:border-line/20 hover:bg-surface/70',
                )}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-[11px] border transition-colors',
                      selected
                        ? 'border-accent/25 bg-accent/10 text-accent-strong'
                        : 'border-line/10 bg-line/[0.04] text-ink-2',
                    )}
                  >
                    <Languages className="size-4" strokeWidth={1.9} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block text-[13px] font-semibold leading-tight',
                        selected ? 'text-ink' : 'text-ink-2',
                      )}
                    >
                      {t(option.labelKey)}
                    </span>
                    <span className="mt-1 block text-[10.5px] leading-relaxed text-muted">
                      {t(option.hintKey)}
                    </span>
                  </span>
                </span>
                <span
                  className={cn(
                    'flex size-[18px] shrink-0 items-center justify-center rounded-full border transition-colors',
                    selected
                      ? 'border-accent bg-accent text-on-accent'
                      : 'border-line/20 bg-transparent',
                  )}
                  aria-hidden
                >
                  {selected && <Check className="size-3" strokeWidth={2.8} />}
                </span>
                {selected && <span className="sr-only">{t('settings.language.current')}</span>}
              </button>
            );
          })}
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-muted">
          <Info className="mt-px size-3 shrink-0" strokeWidth={1.9} aria-hidden />
          {t('settings.language.saved')}
        </p>
      </SettingsCard>

      <SettingsCard
        title={t('settings.appearance.title')}
        description={t('settings.appearance.description')}
      >
        <div
          className="grid gap-2.5 sm:grid-cols-3"
          role="group"
          aria-label={t('settings.appearance.groupAria')}
        >
          {APPEARANCE_OPTIONS.map((option) => {
            const selected = settings.appearance === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                data-testid={`settings-theme-${option.value}`}
                onClick={() => updateSetting('appearance', option.value)}
                className={cn(
                  'rounded-[16px] border p-2 text-left transition-all duration-200 ease-aether active:scale-[0.99]',
                  selected
                    ? 'border-accent/40 bg-accent/[0.055] shadow-[0_1px_0_rgb(255_255_255/0.45)_inset]'
                    : 'border-line/[0.08] bg-surface/40 hover:border-line/20 hover:bg-surface/70',
                )}
              >
                <ThemePreview appearance={option.value} />
                <span className="mt-2.5 flex items-center justify-between gap-2 px-0.5 pb-0.5">
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block text-[11.5px] font-medium',
                        selected ? 'text-ink' : 'text-ink-2',
                      )}
                    >
                      {t(option.labelKey)}
                    </span>
                    <span className="mt-0.5 block text-[9.5px] leading-tight text-muted">
                      {t(option.descriptionKey)}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'flex size-[18px] shrink-0 items-center justify-center rounded-full border transition-colors',
                      selected
                        ? 'border-accent bg-accent text-on-accent'
                        : 'border-line/20 bg-transparent',
                    )}
                    aria-hidden
                  >
                    {selected && <Check className="size-3" strokeWidth={2.8} />}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </SettingsCard>

      <SettingsCard
        title={t('settings.appearance.accentTitle')}
        description={t('settings.appearance.accentDescription')}
      >
        <div
          className="flex flex-wrap items-start gap-x-4 gap-y-3"
          role="group"
          aria-label={t('settings.appearance.accentGroupAria')}
        >
          {ACCENT_OPTIONS.map((option) => {
            const selected = settings.accent === option.id;
            const label = t(option.labelKey);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                aria-label={t('settings.appearance.accentAria', { label })}
                data-testid={`settings-accent-${option.id}`}
                onClick={() => updateSetting('accent', option.id)}
                className="group flex min-w-[52px] flex-col items-center gap-1.5 rounded-[12px] p-1 transition-transform duration-200 ease-aether active:scale-95"
              >
                <span
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full border transition-all duration-200',
                    selected
                      ? 'border-transparent ring-2 ring-accent ring-offset-2 ring-offset-[rgb(var(--window-bg))]'
                      : 'border-black/[0.07] group-hover:scale-[1.06] dark:border-white/[0.12]',
                  )}
                  style={{ backgroundColor: option.color }}
                >
                  {selected && (
                    <Check
                      className="size-4 text-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.3)]"
                      strokeWidth={2.8}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-medium leading-tight transition-colors',
                    selected ? 'text-ink' : 'text-muted group-hover:text-ink-2',
                  )}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </SettingsCard>

      <SettingsCard
        title={t('settings.appearance.wallpaperTitle')}
        description={t('settings.appearance.wallpaperDescription')}
      >
        <div
          className="grid gap-2.5 sm:grid-cols-3"
          role="group"
          aria-label={t('settings.appearance.wallpaperGroupAria')}
        >
          {WALLPAPER_OPTIONS.map((option) => {
            const selected = settings.wallpaper === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                data-testid={`settings-wallpaper-${option.id}`}
                onClick={() => updateSetting('wallpaper', option.id)}
                className={cn(
                  'rounded-[16px] border p-2 text-left transition-all duration-200 ease-aether active:scale-[0.99]',
                  selected
                    ? 'border-accent/40 bg-accent/[0.055] shadow-[0_1px_0_rgb(255_255_255/0.45)_inset]'
                    : 'border-line/[0.08] bg-surface/40 hover:border-line/20 hover:bg-surface/70',
                )}
              >
                <span className="relative block aspect-[16/9] w-full overflow-hidden rounded-[10px] border border-black/[0.06] dark:border-white/[0.08]">
                  <span
                    className="absolute inset-0"
                    style={resolvedTheme === 'dark' ? option.dark : option.light}
                    aria-hidden
                  />
                  {selected && (
                    <span className="absolute right-1.5 top-1.5 flex size-[18px] items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_2px_6px_-2px_rgb(0_60_140/0.5)]">
                      <Check className="size-3" strokeWidth={2.8} />
                    </span>
                  )}
                </span>
                <span className="mt-2 block px-0.5 pb-0.5">
                  <span
                    className={cn(
                      'block text-[11.5px] font-medium',
                      selected ? 'text-ink' : 'text-ink-2',
                    )}
                  >
                    {t(option.labelKey)}
                  </span>
                  <span className="mt-0.5 block truncate text-[9.5px] text-muted">
                    {t(option.descriptionKey)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-muted">
          <Info className="mt-px size-3 shrink-0" strokeWidth={1.9} aria-hidden />
          {t('settings.appearance.localNote')}
        </p>
      </SettingsCard>
    </div>
  );
}
