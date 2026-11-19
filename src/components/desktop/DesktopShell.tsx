import { MotionConfig } from 'framer-motion';
import { Dock } from '@/components/layout/Dock';
import { OverlayHost } from '@/components/layout/OverlayHost';
import { SideNav } from '@/components/layout/SideNav';
import { TopBar } from '@/components/layout/TopBar';
import { WindowLayer } from '@/components/windows/WindowLayer';
import { Wallpaper } from '@/components/desktop/Wallpaper';
import { Workspace } from '@/components/workspace/Workspace';
import { useI18n } from '@/i18n';
import { useSettings } from '@/state/settings';

export function DesktopShell() {
  const { settings } = useSettings();
  const { t } = useI18n();

  return (
    <MotionConfig reducedMotion={settings.reduceMotion ? 'always' : 'user'}>
      <div
        data-testid="desktop-shell"
        className="relative h-dvh w-screen overflow-hidden text-ink"
      >
        <Wallpaper />
        <a
          href="#workspace"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[200] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-[12px] focus:shadow-float"
        >
          {t('shell.skipToWorkspace')}
        </a>
        <TopBar />
        <main className="relative z-10 mx-auto flex h-full w-full max-w-[1760px] gap-3 px-3 pb-[102px] pt-[54px] sm:px-4">
          <SideNav />
          <Workspace />
        </main>
        <WindowLayer />
        <Dock />
        <OverlayHost />
      </div>
    </MotionConfig>
  );
}
