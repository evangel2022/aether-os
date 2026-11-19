import { AppWindow, Info, MousePointer2 } from 'lucide-react';
import { SettingsCard } from '@/components/settings/SettingsCard';
import { Toggle } from '@/components/ui/Toggle';
import { useI18n } from '@/i18n';
import { useSettings } from '@/state/settings';
import { useWindows } from '@/state/windows';

export function DesktopSection() {
  const { t } = useI18n();
  const { settings, updateSetting } = useSettings();
  const { windows } = useWindows();

  return (
    <div className="space-y-4">
      <SettingsCard
        title={t('settings.desktop.title')}
        description={t('settings.desktop.description')}
      >
        <div className="divide-y divide-line/[0.06] overflow-hidden rounded-[16px] border border-line/[0.07] bg-surface/40">
          <div data-testid="settings-toggle-dock-magnification">
            <Toggle
              className="px-3.5 py-3"
              label={t('settings.desktop.dockMagnification.label')}
              description={t('settings.desktop.dockMagnification.description')}
              checked={settings.dockMagnification}
              onChange={(value) => updateSetting('dockMagnification', value)}
            />
          </div>
          <div data-testid="settings-toggle-show-seconds">
            <Toggle
              className="px-3.5 py-3"
              label={t('settings.desktop.showSeconds.label')}
              description={t('settings.desktop.showSeconds.description')}
              checked={settings.showSeconds}
              onChange={(value) => updateSetting('showSeconds', value)}
            />
          </div>
          <div data-testid="settings-toggle-reduce-motion">
            <Toggle
              className="px-3.5 py-3"
              label={t('settings.desktop.reduceMotion.label')}
              description={t('settings.desktop.reduceMotion.description')}
              checked={settings.reduceMotion}
              onChange={(value) => updateSetting('reduceMotion', value)}
            />
          </div>
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-muted">
          <Info className="mt-px size-3 shrink-0" strokeWidth={1.9} aria-hidden />
          {t('settings.desktop.note')}
        </p>
      </SettingsCard>

      <SettingsCard
        title={t('settings.desktop.windows.title')}
        description={t('settings.desktop.windows.description')}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 rounded-[14px] border border-line/[0.06] bg-line/[0.02] px-3.5 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-[9px] bg-line/[0.05] text-ink-2">
                <AppWindow className="size-[14px]" strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-ink">
                  {t('settings.desktop.windows.openTitle')}
                </p>
                <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted">
                  {t('settings.desktop.windows.openDescription')}
                </p>
              </div>
            </div>
            <span
              className="shrink-0 text-[14px] font-semibold tabular-nums text-ink"
              data-testid="settings-open-windows"
            >
              {windows.length}
            </span>
          </div>

          <div className="flex items-start gap-2.5 rounded-[14px] border border-line/[0.06] bg-line/[0.02] px-3.5 py-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[9px] bg-line/[0.05] text-ink-2">
              <MousePointer2 className="size-[14px]" strokeWidth={1.9} />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-ink">
                {t('settings.desktop.windows.controlsTitle')}
              </p>
              <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted">
                {t('settings.desktop.windows.controlsDescription')}
              </p>
            </div>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}
