import {
  Activity,
  ArrowRight,
  Check,
  FlaskConical,
  ListChecks,
  Wrench,
} from 'lucide-react';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { AgentStatusBadge } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DetailSheet } from '@/components/ui/DetailSheet';
import { Progress } from '@/components/ui/Progress';
import { useI18n, type TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';
import type { Agent, AgentStatus } from '@/types';

interface AgentDetailSheetProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
  onViewTasks: () => void;
}

const STATUS_COPY_KEYS = {
  working: 'agents.detail.status.working',
  waiting: 'agents.detail.status.waiting',
  idle: 'agents.detail.status.idle',
} as const satisfies Record<AgentStatus, TranslationKey>;

function SectionLabel({ children }: { children: string }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
      {children}
    </h3>
  );
}

function AgentDetailContent({ agent }: { agent: Agent }) {
  const { t, tr } = useI18n();

  return (
    <div data-testid="agent-detail-sheet">
      <div className="flex items-start gap-4">
        <AgentAvatar agent={agent} size="xl" showStatus />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <AgentStatusBadge status={agent.status} />
            <Badge tone="demo">{t('agents.detail.demoProfile')}</Badge>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-[1.7] text-ink-2">
            {tr(agent.description)}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[17px] border border-line/[0.07] bg-line/[0.025] px-4 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium text-ink-2">
            {t('agents.detail.simulatedStatus')}
          </span>
          <AgentStatusBadge status={agent.status} />
        </div>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
          {t(STATUS_COPY_KEYS[agent.status])}
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-3">
          <SectionLabel>{t('agents.card.currentFocus')}</SectionLabel>
          <span className="text-[10.5px] font-medium tabular-nums text-muted">
            {agent.progress}%
          </span>
        </div>
        <p className="mt-1.5 text-[12.5px] font-medium text-ink">{tr(agent.focus)}</p>
        <Progress
          className="mt-2"
          size="sm"
          value={agent.progress}
          tone={agent.status === 'waiting' ? 'warning' : 'accent'}
          label={t('agents.card.focusProgress', { name: tr(agent.name) })}
        />
        <p className="mt-2 text-[10px] leading-relaxed text-muted">{tr(agent.model)}</p>
      </div>

      <dl className="mt-5 grid grid-cols-3 divide-x divide-line/[0.06] overflow-hidden rounded-[17px] border border-line/[0.07] bg-surface/50">
        <div className="px-3 py-3.5 text-center">
          <dt className="text-[9.5px] font-medium uppercase tracking-[0.07em] text-muted">
            {t('agents.stats.tasksDone')}
          </dt>
          <dd className="mt-1 text-[17px] font-semibold leading-none tracking-[-0.03em] text-ink">
            {agent.tasksCompleted}
          </dd>
        </div>
        <div className="px-3 py-3.5 text-center">
          <dt className="text-[9.5px] font-medium uppercase tracking-[0.07em] text-muted">
            {t('agents.stats.successRate')}
          </dt>
          <dd className="mt-1 text-[17px] font-semibold leading-none tracking-[-0.03em] text-ink">
            {agent.successRate}%
          </dd>
        </div>
        <div className="px-3 py-3.5 text-center">
          <dt className="text-[9.5px] font-medium uppercase tracking-[0.07em] text-muted">
            {t('agents.stats.avgDuration')}
          </dt>
          <dd className="mt-1 text-[17px] font-semibold leading-none tracking-[-0.03em] text-ink">
            {tr(agent.avgDuration)}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <SectionLabel>{t('agents.detail.capabilities')}</SectionLabel>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {agent.capabilities.map((capability) => (
            <span
              key={capability['en-US']}
              className="inline-flex items-center gap-1.5 rounded-full border border-line/[0.08] bg-surface/60 px-2.5 py-[3px] text-[10.5px] font-medium leading-4 text-ink-2"
            >
              <Check className="size-2.5 text-positive" strokeWidth={2.4} aria-hidden />
              {tr(capability)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <SectionLabel>{t('agents.detail.tools')}</SectionLabel>
        <ul className="mt-2 space-y-1.5">
          {agent.tools.map((tool) => (
            <li
              key={tool['en-US']}
              className="flex items-center gap-2 text-[11.5px] text-ink-2"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-[6px] bg-line/[0.055] text-muted">
                <Wrench className="size-2.5" strokeWidth={1.9} aria-hidden />
              </span>
              {tr(tool)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <SectionLabel>{t('agents.detail.recentActivity')}</SectionLabel>
          <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted/80">
            <Activity className="size-2.5" aria-hidden />
            {t('common.simulated')}
          </span>
        </div>
        <ol className="mt-3">
          {agent.activity.map((item, index) => (
            <li key={item.id} className="relative flex gap-3 pb-4 last:pb-0">
              {index < agent.activity.length - 1 && (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-[5px] top-3.5 w-px bg-line/10"
                />
              )}
              <span
                aria-hidden
                className={cn(
                  'relative z-[1] mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-surface ring-1',
                  index === 0
                    ? 'bg-accent ring-accent/25'
                    : 'bg-line/15 ring-line/10',
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium leading-snug text-ink">
                  {tr(item.title)}
                </p>
                <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted">
                  {tr(item.meta)}
                  <span className="mx-1.5 text-muted/50" aria-hidden>
                    ·
                  </span>
                  {tr(item.time)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-[17px] border border-dashed border-line/15 px-3.5 py-3">
        <FlaskConical className="mt-0.5 size-3.5 shrink-0 text-muted" strokeWidth={1.8} aria-hidden />
        <p className="text-[10.5px] leading-relaxed text-muted">
          {t('agents.detail.demoNote')}
        </p>
      </div>
    </div>
  );
}

export function AgentDetailSheet({
  agent,
  open,
  onClose,
  onViewTasks,
}: AgentDetailSheetProps) {
  const { t, tr } = useI18n();

  return (
    <DetailSheet
      open={open}
      onClose={onClose}
      eyebrow={t('agents.detail.eyebrow')}
      title={agent ? tr(agent.name) : t('agents.detail.fallbackTitle')}
      subtitle={agent ? tr(agent.role) : undefined}
      footer={
        agent ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] leading-relaxed text-muted">
              {t('agents.detail.footerNote')}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={onClose}>
                {t('common.close')}
              </Button>
              <Button
                size="sm"
                data-testid="agent-view-tasks"
                leadingIcon={<ListChecks className="size-3.5" />}
                trailingIcon={<ArrowRight className="size-3" />}
                onClick={onViewTasks}
              >
                {t('agents.viewTasks')}
              </Button>
            </div>
          </div>
        ) : null
      }
    >
      {agent ? <AgentDetailContent agent={agent} /> : null}
    </DetailSheet>
  );
}
