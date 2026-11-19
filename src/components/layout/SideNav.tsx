import { Sparkles } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { NAVIGATION } from '@/data/navigation';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { useDesktop } from '@/state/desktop';

export function SideNav() {
  const { page, navigate } = useDesktop();
  const { t, tr } = useI18n();

  return (
    <aside className="hidden shrink-0 sm:flex" aria-label={t('shell.navigationRailAria')}>
      <div className="glass-panel flex w-[82px] flex-col rounded-[26px] px-2 py-2.5 xl:w-[88px]">
        <button
          type="button"
          onClick={() => navigate('home')}
          aria-label={t('shell.aetherHomeAria')}
          className="group mx-auto flex size-11 items-center justify-center rounded-2xl transition-transform duration-300 ease-aether hover:scale-[1.04] active:scale-95"
        >
          <span className="relative">
            <LogoMark size={27} />
            <span className="absolute -bottom-1 -right-1 size-2.5 rounded-full border-2 border-[rgb(var(--surface))] bg-positive" />
          </span>
        </button>

        <div className="mx-2 my-2 h-px bg-line/[0.08]" aria-hidden />

        <nav
          aria-label={t('shell.primaryNavigationAria')}
          className="aether-scroll flex min-h-0 flex-1 flex-col items-stretch justify-center gap-1 overflow-y-auto py-2"
        >
          {NAVIGATION.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-testid={`nav-${item.id}`}
                onClick={() => navigate(item.id)}
                aria-current={active ? 'page' : undefined}
                title={tr(item.description)}
                className={cn(
                  'group relative flex flex-col items-center justify-center gap-[3px] rounded-[15px] py-[8px] transition-all duration-200 ease-aether',
                  active
                    ? 'bg-white/70 text-accent-strong shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_5px_14px_-9px_rgb(15_32_60/0.32)] dark:bg-white/[0.08]'
                    : 'text-muted hover:bg-white/35 hover:text-ink-2 dark:hover:bg-white/[0.04]',
                )}
              >
                {active && (
                  <span
                    className="absolute left-1 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-accent"
                    aria-hidden
                  />
                )}
                <Icon
                  className={cn(
                    'size-[18px] transition-transform duration-200 group-hover:scale-[1.05]',
                    active && 'text-accent',
                  )}
                  strokeWidth={active ? 2 : 1.8}
                />
                <span className="text-[9.5px] font-medium leading-none tracking-[0.01em]">
                  {tr(item.label)}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mx-2 mt-2 h-px bg-line/[0.08]" aria-hidden />

        <button
          type="button"
          onClick={() => navigate('command')}
          aria-label={t('shell.aiReadyAria')}
          title={t('shell.aiReadyTitle')}
          className="mx-auto mt-2 flex flex-col items-center gap-1.5 rounded-2xl px-1 py-1.5 transition-opacity hover:opacity-80"
        >
          <span className="command-orb flex size-[30px] items-center justify-center rounded-full">
            <Sparkles className="size-3.5 text-white" strokeWidth={1.9} />
          </span>
          <span className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.1em] text-muted">
            <span className="size-1 rounded-full bg-positive animate-soft-pulse" aria-hidden />
            {t('shell.aiReady')}
          </span>
        </button>
      </div>
    </aside>
  );
}
