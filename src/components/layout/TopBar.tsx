import {
  BatteryMedium,
  Bell,
  Search,
  SlidersHorizontal,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { LogoMark, Wordmark } from '@/components/brand/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { Kbd } from '@/components/ui/Kbd';
import { NAVIGATION } from '@/data/navigation';
import { SYSTEM_SNAPSHOT } from '@/data/system';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { formatClock, formatMenuDate } from '@/lib/format';
import { commandShortcut } from '@/lib/platform';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';
import { useSettings } from '@/state/settings';

function TopBarIconButton({
  label,
  active = false,
  onClick,
  children,
  badge = false,
  expanded,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
  badge?: boolean;
  expanded?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-expanded={expanded}
      onClick={onClick}
      className={cn(
        'relative flex size-[30px] items-center justify-center rounded-[9px] text-topbar-muted transition-colors duration-200 hover:bg-white/25 hover:text-topbar-ink active:scale-95',
        active && 'bg-white/30 text-topbar-ink shadow-[0_1px_0_rgb(255_255_255/0.3)_inset]',
      )}
    >
      {children}
      {badge && (
        <span className="absolute right-[5px] top-[5px] size-[6px] rounded-full bg-accent ring-2 ring-white/70" />
      )}
    </button>
  );
}

export function TopBar() {
  const { page, navigate, overlay, toggleOverlay } = useDesktop();
  const { unreadCount } = useDemoData();
  const { settings } = useSettings();
  const { locale, t, tr } = useI18n();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const activePage = NAVIGATION.find((item) => item.id === page);

  return (
    <header className="fixed inset-x-0 top-0 z-[120] flex h-[46px] select-none items-center justify-between pl-4 pr-3 sm:pl-5">
      <div className="flex min-w-0 items-center gap-2.5">
        <button
          type="button"
          onClick={() => navigate('home')}
          aria-label={t('shell.goHomeAria')}
          className="flex items-center gap-2 rounded-lg px-0.5 py-1 transition-opacity hover:opacity-75"
        >
          <LogoMark size={21} />
          <Wordmark />
        </button>
        <span className="mx-0.5 hidden h-3.5 w-px bg-line/15 sm:block" aria-hidden />
        <span className="hidden items-center gap-1.5 text-[11px] font-medium text-topbar-muted sm:flex">
          <span className="size-1 rounded-full bg-accent/75" aria-hidden />
          {activePage ? tr(activePage.label) : t('shell.aetherHomeAria')}
        </span>
        <span className="hidden rounded-full border border-line/10 bg-white/15 px-2 py-[2px] text-[9px] font-medium uppercase tracking-[0.12em] text-topbar-muted lg:inline-block">
          {t('shell.prototype')}
        </span>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <button
          type="button"
          onClick={() => toggleOverlay('command')}
          aria-label={t('shell.askAether')}
          aria-expanded={overlay === 'command'}
          className="mr-0.5 hidden h-[30px] items-center gap-2 rounded-full border border-white/30 bg-white/25 px-3 text-[11.5px] font-medium text-topbar-ink shadow-[0_1px_0_rgb(255_255_255/0.3)_inset] backdrop-blur-md transition-all duration-200 hover:bg-white/35 sm:flex"
        >
          <Sparkles className="size-3.5 text-accent" strokeWidth={1.9} />
          <span className="hidden md:inline">{t('shell.askAether')}</span>
          <Kbd className="ml-0.5 hidden border-line/10 bg-black/[0.035] md:inline-flex">
            {commandShortcut}
          </Kbd>
        </button>

        <TopBarIconButton
          label={t('shell.searchOrAskAether')}
          onClick={() => toggleOverlay('command')}
        >
          <Search className="size-[15px]" strokeWidth={1.9} />
        </TopBarIconButton>
        <TopBarIconButton
          label={t('shell.controlCenter')}
          active={overlay === 'control-center'}
          expanded={overlay === 'control-center'}
          onClick={() => toggleOverlay('control-center')}
        >
          <SlidersHorizontal className="size-[15px]" strokeWidth={1.9} />
        </TopBarIconButton>
        <TopBarIconButton
          label={
            unreadCount > 0
              ? t('shell.notificationsUnread', { count: unreadCount })
              : t('shell.notifications')
          }
          active={overlay === 'notifications'}
          expanded={overlay === 'notifications'}
          onClick={() => toggleOverlay('notifications')}
          badge={unreadCount > 0}
        >
          <Bell className="size-[15px]" strokeWidth={1.9} />
        </TopBarIconButton>

        <span className="mx-1.5 hidden h-3.5 w-px bg-line/15 sm:block" aria-hidden />

        <div className="hidden items-center gap-1.5 pr-1 text-topbar-muted sm:flex">
          <Wifi className="size-[14px]" strokeWidth={1.9} />
          <span className="flex items-center gap-1 text-[10.5px] font-medium tabular-nums">
            <BatteryMedium className="size-[15px]" strokeWidth={1.8} />
            {SYSTEM_SNAPSHOT.battery}%
          </span>
        </div>

        <div className="ml-1 hidden flex-col items-end px-1.5 leading-tight md:flex">
          <span className="text-[11.5px] font-semibold tabular-nums tracking-[-0.01em] text-topbar-ink">
            {formatClock(now, settings.showSeconds, locale)}
          </span>
          <span className="text-[9.5px] font-medium uppercase tracking-[0.04em] text-topbar-muted">
            {formatMenuDate(now, locale)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => toggleOverlay('user')}
          aria-label={t('shell.openUserMenu')}
          aria-expanded={overlay === 'user'}
          className={cn(
            'ml-0.5 flex items-center rounded-full p-[3px] transition-all duration-200 hover:bg-white/25',
            overlay === 'user' && 'bg-white/30',
          )}
        >
          <Avatar
            name={t('shell.profile.name')}
            size="sm"
            tone="slate"
            status="online"
          />
        </button>
      </div>
    </header>
  );
}
