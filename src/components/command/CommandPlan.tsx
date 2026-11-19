import {
  Check,
  Circle,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Sparkles,
  Square,
} from 'lucide-react';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { getAgent } from '@/data/agents';
import { useI18n } from '@/i18n';
import type { TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';
import type { CommandRun } from '@/types';

const statusMeta: Record<
  CommandRun['status'],
  { labelKey: TranslationKey; tone: 'accent' | 'positive' | 'neutral'; dot: boolean }
> = {
  running: {
    labelKey: 'command.plan.status.running',
    tone: 'accent',
    dot: true,
  },
  ready: {
    labelKey: 'command.plan.status.ready',
    tone: 'positive',
    dot: true,
  },
  cancelled: {
    labelKey: 'command.plan.status.cancelled',
    tone: 'neutral',
    dot: true,
  },
};

export function CommandPlan({
  run,
  onStop,
  onOpenTasks,
}: {
  run: CommandRun;
  onStop?: () => void;
  onOpenTasks: () => void;
}) {
  const { t, tr } = useI18n();
  const agent = getAgent(run.agentId);
  const completed = run.steps.filter((step) => step.status === 'done').length;
  const progress =
    run.status === 'ready'
      ? 100
      : Math.round(
          (Math.min(completed, run.steps.length - 1) / (run.steps.length - 1)) * 100,
        );
  const meta = statusMeta[run.status];
  const completedStages = run.status === 'ready' ? run.steps.length : completed;

  return (
    <section
      aria-label={t('command.plan.aria')}
      data-testid="command-plan"
      className="overflow-hidden rounded-[26px] border border-line/[0.08] bg-surface/55 shadow-[0_16px_40px_-36px_rgb(var(--shadow-tint)/0.35)] backdrop-blur-xl"
    >
      <div className="border-b border-line/[0.065] px-5 py-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-line/[0.08] bg-surface/60">
              <Sparkles className="size-4 text-accent" strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[13px] font-semibold tracking-[-0.015em] text-ink">
                  {t('command.plan.title')}
                </h2>
                <Badge tone="demo">{t('command.plan.noModel')}</Badge>
              </div>
              <p className="mt-0.5 max-w-[62ch] text-[11.5px] leading-relaxed text-ink-2">
                {run.prompt}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Badge tone={meta.tone} dot={meta.dot}>
              {t(meta.labelKey)}
            </Badge>
            {run.status === 'running' && onStop && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-[9.5px] text-muted"
                leadingIcon={<Square className="size-2.5" />}
                onClick={onStop}
              >
                {t('command.plan.stop')}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <AgentAvatar agent={agent} size="sm" />
            <div className="min-w-0 text-[10px] leading-tight">
              <p className="font-medium text-ink-2">{tr(agent.name)}</p>
              <p className="text-muted">{t('command.plan.agentRoute')}</p>
            </div>
          </div>
          <div className="flex min-w-[180px] flex-1 items-center gap-3 sm:max-w-[260px]">
            <Progress
              value={progress}
              size="xs"
              tone={run.status === 'ready' ? 'positive' : 'accent'}
              aria-label={t('command.plan.progressAria')}
              className="flex-1"
            />
            <span className="text-[9.5px] font-medium tabular-nums text-muted">
              {t('command.plan.stages', {
                completed: completedStages,
                total: run.steps.length,
              })}
            </span>
          </div>
        </div>
      </div>

      <div
        className="aether-scroll max-h-[380px] overflow-y-auto px-5 py-3"
        aria-live="polite"
      >
        <ol className="space-y-0">
          {run.steps.map((step, index) => {
            const isDone = step.status === 'done';
            const isActive = step.status === 'active';
            return (
              <li key={step.id} className="relative flex gap-3.5 pb-2 last:pb-0">
                {index < run.steps.length - 1 && (
                  <span
                    className={cn(
                      'absolute left-[10px] top-[22px] h-[calc(100%-14px)] w-px',
                      isDone ? 'bg-accent/25' : 'bg-line/10',
                    )}
                    aria-hidden
                  />
                )}
                <span className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
                  {isDone ? (
                    <span className="flex size-[19px] items-center justify-center rounded-full bg-accent/12 text-accent">
                      <Check className="size-3" strokeWidth={2.1} />
                    </span>
                  ) : isActive ? (
                    <span className="flex size-[19px] items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                      <Loader2 className="size-3 animate-spin" strokeWidth={2} />
                    </span>
                  ) : (
                    <Circle className="size-[17px] text-line/25" strokeWidth={1.6} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={cn(
                        'text-[11.5px] font-medium leading-tight',
                        isActive || isDone ? 'text-ink' : 'text-muted',
                      )}
                    >
                      {tr(step.label)}
                    </p>
                    <span
                      className={cn(
                        'shrink-0 text-[8.5px] font-medium uppercase tracking-[0.08em]',
                        isDone
                          ? 'text-positive/80'
                          : isActive
                            ? 'text-accent'
                            : 'text-muted/55',
                      )}
                    >
                      {isDone
                        ? t('command.plan.step.done')
                        : isActive
                          ? t('command.plan.step.now')
                          : t('command.plan.step.waiting')}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[10.5px] leading-relaxed text-muted">
                    {tr(step.detail)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {run.status === 'ready' && (
        <div className="border-t border-line/[0.065] bg-positive/[0.035] px-5 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2.5">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-positive/10 text-positive">
                <ShieldCheck className="size-4" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold text-ink">
                  {t('command.plan.readyTitle')}
                </p>
                <p className="mt-0.5 max-w-[58ch] text-[10px] leading-relaxed text-muted">
                  {t('command.plan.readyDescription', {
                    title: tr(run.resultTitle),
                  })}
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="shrink-0 text-[10.5px]"
              onClick={onOpenTasks}
              trailingIcon={<ExternalLink className="size-3" />}
            >
              {t('command.plan.openTasks')}
            </Button>
          </div>
        </div>
      )}

      {run.status === 'cancelled' && (
        <div className="border-t border-line/[0.065] bg-line/[0.02] px-5 py-3">
          <p className="text-[10.5px] leading-relaxed text-muted">
            {t('command.plan.cancelledNote')}
          </p>
        </div>
      )}
    </section>
  );
}
