import { ChevronRight, Clock } from 'lucide-react';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { AgentStatusBadge } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
  onOpen: (agent: Agent) => void;
}

export function AgentCard({ agent, onOpen }: AgentCardProps) {
  const { t, tr } = useI18n();
  const recent = agent.activity[0];
  const stats: { label: string; value: string }[] = [
    { label: t('agents.stats.tasksDone'), value: String(agent.tasksCompleted) },
    { label: t('agents.stats.success'), value: `${agent.successRate}%` },
    { label: t('agents.stats.avgTime'), value: tr(agent.avgDuration) },
  ];

  return (
    <button
      type="button"
      data-testid={`agent-card-${agent.id}`}
      aria-haspopup="dialog"
      onClick={() => onOpen(agent)}
      className="glass-card card-lift group flex h-full w-full flex-col rounded-[24px] p-5 text-left"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3.5">
          <AgentAvatar agent={agent} size="xl" showStatus />
          <div className="min-w-0 pt-0.5">
            <h3 className="text-[15px] font-semibold leading-tight tracking-[-0.02em] text-ink">
              {tr(agent.name)}
            </h3>
            <p className="mt-1 text-[11.5px] leading-snug text-muted">{tr(agent.role)}</p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <AgentStatusBadge status={agent.status} />
              <Badge tone="demo">{t('common.simulated')}</Badge>
            </div>
          </div>
        </div>
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-line/10 bg-surface/60 text-muted transition-colors duration-200 group-hover:border-accent/20 group-hover:bg-accent-soft group-hover:text-accent-strong">
          <ChevronRight className="size-3.5" strokeWidth={2} aria-hidden />
        </span>
      </div>

      <div className="mt-4 rounded-[17px] border border-line/[0.06] bg-line/[0.025] px-3.5 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
            {t('agents.card.currentFocus')}
          </span>
          <span className="text-[10.5px] font-medium tabular-nums text-ink-2">
            {agent.progress}%
          </span>
        </div>
        <p className="mt-1 truncate text-[12px] font-medium text-ink">{tr(agent.focus)}</p>
        <Progress
          className="mt-2.5"
          size="xs"
          value={agent.progress}
          tone={agent.status === 'waiting' ? 'warning' : 'accent'}
          label={t('agents.card.focusProgress', { name: tr(agent.name) })}
        />
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="min-w-0 rounded-[13px] px-1 py-0.5">
            <dt className="text-[9.5px] font-medium uppercase tracking-[0.07em] text-muted">
              {stat.label}
            </dt>
            <dd className="mt-0.5 text-[15px] font-semibold tabular-nums leading-tight tracking-[-0.025em] text-ink">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {agent.capabilities.map((capability) => (
          <span
            key={capability['en-US']}
            className={cn(
              'rounded-full border border-line/[0.08] bg-surface/55 px-2.5 py-[3px]',
              'text-[10.5px] font-medium leading-4 text-ink-2',
            )}
          >
            {tr(capability)}
          </span>
        ))}
      </div>

      {recent && (
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2 border-t border-line/[0.06] pt-3">
            <Clock className="size-3 shrink-0 text-muted" strokeWidth={1.8} aria-hidden />
            <p className="min-w-0 flex-1 truncate text-[11px] text-muted">
              <span className="font-medium text-ink-2">{tr(recent.title)}</span>
              <span className="mx-1.5 text-muted/50" aria-hidden>
                ·
              </span>
              {tr(recent.time)}
            </p>
            <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {t('common.open')}
            </span>
          </div>
        </div>
      )}
    </button>
  );
}
