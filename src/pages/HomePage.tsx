import { ArrowUpRight, Circle, Sparkles } from 'lucide-react';
import { ActivityFeed } from '@/components/home/ActivityFeed';
import { AgentPulse } from '@/components/home/AgentPulse';
import { HomeCommand } from '@/components/home/HomeCommand';
import { MemoryContext } from '@/components/home/MemoryContext';
import { QuickActions } from '@/components/home/QuickActions';
import { RecentTasks } from '@/components/home/RecentTasks';
import { SystemWidget } from '@/components/home/SystemWidget';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AGENTS } from '@/data/agents';
import { useI18n } from '@/i18n';
import type { TranslationKey } from '@/i18n';
import { formatLongDate } from '@/lib/format';
import { useDesktop } from '@/state/desktop';

function greetingKey(hour: number): TranslationKey {
  if (hour < 5) return 'home.greeting.late';
  if (hour < 12) return 'home.greeting.morning';
  if (hour < 17) return 'home.greeting.afternoon';
  if (hour < 22) return 'home.greeting.evening';
  return 'home.greeting.winding';
}

export function HomePage() {
  const { navigate } = useDesktop();
  const { locale, t } = useI18n();
  const now = new Date();
  const workingCount = AGENTS.filter((agent) => agent.status === 'working').length;
  const waitingCount = AGENTS.filter((agent) => agent.status === 'waiting').length;
  const dateLabel = formatLongDate(now, locale);

  return (
    <div data-testid="home-page" className="aether-scroll h-full overflow-y-auto">
      <div className="page-pad pb-6 pt-6 short:pb-3 short:pt-5">
        <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow">{dateLabel}</p>
              <span className="h-px w-5 bg-line/15" aria-hidden />
              <Badge tone="demo">{t('home.demoWorkspace')}</Badge>
            </div>
            <h1 className="mt-2.5 text-[clamp(1.55rem,2.3vw,2.05rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-ink">
              {t(greetingKey(now.getHours()), { name: t('shell.profile.name') })}
            </h1>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
              {t('home.summary', {
                working: workingCount,
                waiting: waitingCount,
              })}
              <span className="ml-1.5 hidden text-muted sm:inline">
                {t('home.localDemoNote')}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-line/[0.08] bg-surface/45 px-2.5 py-1.5 text-[9.5px] font-medium text-muted backdrop-blur-md md:flex">
              <Circle className="size-1.5 fill-positive text-positive" />
              {t('home.systemsCalm')}
            </span>
            <Button
              variant="secondary"
              size="sm"
              className="h-8 rounded-full px-3 text-[10.5px]"
              onClick={() => navigate('command')}
              trailingIcon={<ArrowUpRight className="size-3" strokeWidth={2} />}
            >
              {t('home.openCommandCenter')}
            </Button>
          </div>
        </header>

        <div className="mt-4 grid grid-cols-1 gap-3 short:mt-3 short:gap-2.5 xl:grid-cols-12">
          <div className="min-w-0 xl:col-span-8">
            <HomeCommand />
          </div>
          <div className="flex min-w-0 flex-col gap-3 short:gap-2.5 xl:col-span-4">
            <QuickActions />
            <SystemWidget />
          </div>

          <div className="min-w-0 xl:col-span-7">
            <RecentTasks />
          </div>
          <div className="min-w-0 xl:col-span-5">
            <AgentPulse />
          </div>

          {/* Extra breathing room for full-HD canvases, where the viewport has room for more context. */}
          <div className="hidden min-w-0 2xl:col-span-8 2xl:block">
            <MemoryContext />
          </div>
          <div className="hidden min-w-0 2xl:col-span-4 2xl:block">
            <ActivityFeed />
          </div>
        </div>

        <footer className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1 text-[9.5px] text-muted short:hidden">
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-2.5" />
            {t('home.footer.disclaimer')}
          </span>
          <span>{t('home.footer.tagline')}</span>
        </footer>
      </div>
    </div>
  );
}
