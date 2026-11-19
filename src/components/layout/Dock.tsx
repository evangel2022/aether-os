import { useState } from 'react';
import { AppIcon } from '@/components/app-icons/AppIcon';
import { DOCK_APPS } from '@/data/apps';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { useSettings } from '@/state/settings';
import { useWindows } from '@/state/windows';

export function Dock() {
  const { t, tr } = useI18n();
  const { settings } = useSettings();
  const {
    windows,
    activeWindowId,
    openApp,
    restoreWindow,
    minimizeWindow,
    focusWindow,
  } = useWindows();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      role="toolbar"
      aria-label={t('shell.dockAria')}
      className="fixed bottom-4 left-1/2 z-[110] -translate-x-1/2"
    >
      <div className="glass-panel flex items-end gap-1 rounded-[23px] px-2.5 pb-[7px] pt-2 shadow-dock">
        {DOCK_APPS.map((app) => {
          const window = windows.find((item) => item.appId === app.id);
          const isRunning = Boolean(window);
          const isActive = Boolean(window && window.id === activeWindowId && !window.minimized);
          const hovered = hoveredId === app.id;
          const index = DOCK_APPS.findIndex((item) => item.id === app.id);
          const hoveredIndex = hoveredId
            ? DOCK_APPS.findIndex((item) => item.id === hoveredId)
            : -1;
          const distance = hoveredIndex >= 0 ? Math.abs(index - hoveredIndex) : 99;
          const magnify =
            settings.dockMagnification && !hovered
              ? distance === 1
                ? 1.08
                : 1
              : 1;
          const scale = hovered
            ? settings.dockMagnification
              ? 1.22
              : 1.06
            : magnify;
          const status = !window
            ? t('shell.appStatus.open')
            : window.minimized
              ? t('shell.appStatus.minimized')
              : isActive
                ? t('shell.appStatus.active')
                : t('shell.appStatus.open');
          const appName = tr(app.name);

          const handleClick = () => {
            if (!window) {
              openApp(app.id);
              return;
            }
            if (window.minimized) {
              restoreWindow(window.id);
              return;
            }
            if (window.id === activeWindowId) {
              minimizeWindow(window.id);
              return;
            }
            focusWindow(window.id);
          };

          return (
            <div key={app.id} className="group relative flex flex-col items-center">
              <div
                className="pointer-events-none absolute -top-12 left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg border border-line/10 bg-elevated/95 px-2.5 py-1 text-[10.5px] font-medium text-ink opacity-0 shadow-float backdrop-blur-xl transition-all duration-200 ease-aether group-hover:translate-y-0 group-hover:opacity-100"
                role="tooltip"
              >
                {appName}
                <span className="ml-1.5 font-normal text-muted">{status}</span>
              </div>
              <button
                type="button"
                data-testid={`dock-${app.id}`}
                aria-label={t('shell.dockItemAria', { app: appName, status })}
                onClick={handleClick}
                onMouseEnter={() => setHoveredId(app.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(app.id)}
                onBlur={() => setHoveredId(null)}
                className="relative flex size-[52px] items-center justify-center rounded-[15px] transition-transform duration-200 ease-aether active:translate-y-[1px]"
                style={{
                  transform: `translateY(${hovered ? -3 : 0}px) scale(${scale})`,
                  transformOrigin: 'bottom center',
                }}
              >
                <AppIcon app={app} size="dock" />
                <span
                  className={cn(
                    'absolute -bottom-[7px] left-1/2 size-[4px] -translate-x-1/2 rounded-full transition-all duration-200',
                    isRunning ? 'bg-ink/55' : 'bg-transparent',
                    window?.minimized && 'bg-ink/25',
                    isActive && 'w-[10px] bg-accent',
                  )}
                  aria-hidden
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
