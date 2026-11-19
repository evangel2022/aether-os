import { ArrowUpRight } from 'lucide-react';
import { AppIcon } from '@/components/app-icons/AppIcon';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { useI18n, type TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';
import type { AppDefinition } from '@/types';

export type AppCardState = 'closed' | 'minimized' | 'running' | 'active';

const STATUS_META: Record<
  AppCardState,
  { labelKey: TranslationKey; tone: BadgeTone; dot: boolean }
> = {
  closed: { labelKey: 'common.launch', tone: 'neutral', dot: false },
  minimized: { labelKey: 'common.minimized', tone: 'neutral', dot: true },
  running: { labelKey: 'common.running', tone: 'positive', dot: true },
  active: { labelKey: 'common.active', tone: 'accent', dot: true },
};

interface AppCardProps {
  app: AppDefinition;
  state: AppCardState;
  onOpen: () => void;
}

export function AppCard({ app, state, onOpen }: AppCardProps) {
  const { t, tr } = useI18n();
  const running = state !== 'closed';
  const status = STATUS_META[state];
  const name = tr(app.name);
  const tagline = tr(app.tagline);

  return (
    <button
      type="button"
      onClick={onOpen}
      data-testid={`app-card-${app.id}`}
      data-state={state}
      aria-label={t(running ? 'apps.bringForwardAria' : 'apps.launchAria', {
        name,
        tagline,
      })}
      className={cn(
        'group card-lift relative flex w-full flex-col overflow-hidden rounded-[22px] border bg-surface/70 p-3.5 text-left',
        running
          ? 'border-line/[0.11] shadow-[0_10px_26px_-20px_rgb(var(--shadow-tint)/0.4)]'
          : 'border-line/[0.08] hover:border-line/[0.16]',
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-accent/[0.07] blur-2xl opacity-0 transition-opacity duration-300 ease-aether group-hover:opacity-100"
      />

      <span className="flex items-start justify-between gap-2">
        <AppIcon
          app={app}
          size="xl"
          className="transition-transform duration-300 ease-aether group-hover:-translate-y-0.5 group-hover:scale-[1.045]"
        />
        {running ? (
          <span className="flex flex-col items-end gap-1 pt-0.5">
            <Badge tone={status.tone} dot={status.dot} className="text-[9.5px]">
              {t(status.labelKey)}
            </Badge>
            <span className="text-[8.5px] uppercase tracking-[0.1em] text-muted/80">
              {t('common.windowOpen')}
            </span>
          </span>
        ) : (
          <span
            aria-hidden
            className="flex size-6 items-center justify-center rounded-full border border-line/10 text-muted opacity-0 transition-all duration-200 ease-aether group-hover:bg-surface group-hover:text-ink group-hover:opacity-100"
          >
            <ArrowUpRight className="size-3.5" />
          </span>
        )}
      </span>

      <span className="mt-3.5 block flex-1">
        <span className="block text-[13.5px] font-semibold tracking-[-0.015em] text-ink">
          {name}
        </span>
        <span className="mt-1 block line-clamp-2 text-[11px] leading-relaxed text-muted">
          {tagline}
        </span>
      </span>

      <span className="mt-3 flex items-center justify-between gap-2 border-t border-line/[0.06] pt-2.5">
        <span className="text-[8.5px] uppercase tracking-[0.1em] text-muted/80 tabular-nums">
          {t('apps.windowSize', {
            width: app.defaultWindow.width,
            height: app.defaultWindow.height,
          })}
        </span>
        <span className="flex items-center gap-1 whitespace-nowrap text-[10.5px] font-medium text-accent-strong">
          {t(running ? 'common.bringForward' : 'common.launch')}
          <ArrowUpRight className="size-3 transition-transform duration-200 ease-aether group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  );
}
