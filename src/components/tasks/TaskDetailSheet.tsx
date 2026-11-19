import { FlaskConical } from 'lucide-react';
import type { ReactNode } from 'react';
import { getAgent } from '@/data/agents';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { PriorityBadge, TaskStatusBadge } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DetailSheet } from '@/components/ui/DetailSheet';
import { Progress } from '@/components/ui/Progress';
import { TaskStepTimeline } from '@/components/tasks/TaskStepTimeline';
import { useI18n } from '@/i18n';
import type { TaskRecord } from '@/types';

interface TaskDetailSheetProps {
  task: TaskRecord | null;
  open: boolean;
  onClose: () => void;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
      {children}
    </h3>
  );
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-[11px] text-muted">{label}</dt>
      <dd className="min-w-0 text-right text-[11.5px] font-medium text-ink-2">{children}</dd>
    </div>
  );
}

function TaskDetailContent({ task }: { task: TaskRecord }) {
  const { t, tr } = useI18n();
  const agent = getAgent(task.agentId);
  const originLabel =
    task.origin === 'simulated' ? t('tasks.simulatedPlan') : t('tasks.origin.demo');
  const showProgress = task.status === 'in_progress' || task.status === 'review';
  const doneSteps = task.steps.filter((step) => step.status === 'done').length;

  return (
    <div data-testid="task-detail-sheet">
      <div className="flex flex-wrap items-center gap-2">
        <TaskStatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
        <Badge tone={task.origin === 'simulated' ? 'accent' : 'demo'}>{originLabel}</Badge>
      </div>

      <p className="mt-3 text-[12.5px] leading-[1.7] text-ink-2">
        {tr(task.description)}
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-[17px] border border-line/[0.07] bg-surface/50 px-3.5 py-3">
        <AgentAvatar agent={agent} size="md" showStatus />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold text-ink">{tr(agent.name)}</p>
          <p className="truncate text-[10.5px] text-muted">
            {t('tasks.detail.roleSuffix', { role: tr(agent.role) })}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-line/10 px-2 py-[3px] text-[9.5px] font-medium uppercase tracking-[0.06em] text-muted">
          {task.id}
        </span>
      </div>

      {showProgress && (
        <div className="mt-5">
          <div className="flex items-baseline justify-between gap-3">
            <SectionLabel>{t('tasks.detail.progress')}</SectionLabel>
            <span className="text-[10.5px] font-medium tabular-nums text-muted">
              {task.progress}%
            </span>
          </div>
          <Progress
            className="mt-2"
            size="sm"
            value={task.progress}
            tone={task.status === 'review' ? 'warning' : 'accent'}
            label={t('tasks.progressLabel', { title: tr(task.title) })}
          />
        </div>
      )}

      {task.origin === 'simulated' && (
        <div
          data-testid="task-simulated-note"
          className="mt-4 flex items-start gap-2.5 rounded-[17px] border border-accent/15 bg-accent/[0.045] px-3.5 py-3"
        >
          <FlaskConical
            className="mt-0.5 size-3.5 shrink-0 text-accent-strong"
            strokeWidth={1.8}
            aria-hidden
          />
          <p className="text-[10.5px] leading-relaxed text-ink-2">
            {t('tasks.detail.simulatedNote')}
          </p>
        </div>
      )}

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <SectionLabel>{t('tasks.detail.planTimeline')}</SectionLabel>
          <span className="text-[10px] font-medium tabular-nums text-muted">
            {t('tasks.detail.stepsComplete', {
              done: doneSteps,
              total: task.steps.length,
            })}
          </span>
        </div>
        <div className="mt-3">
          <TaskStepTimeline steps={task.steps} />
        </div>
      </div>

      {task.output && (
        <div className="mt-5">
          <SectionLabel>{t('tasks.detail.output')}</SectionLabel>
          <p className="mt-2 rounded-[17px] border border-line/[0.07] bg-line/[0.02] px-3.5 py-3 text-[11.5px] leading-relaxed text-ink-2">
            {tr(task.output)}
          </p>
        </div>
      )}

      <div className="mt-5">
        <SectionLabel>{t('tasks.detail.details')}</SectionLabel>
        <dl className="mt-2 divide-y divide-line/[0.06] px-1">
          <MetaRow label={t('tasks.detail.origin')}>{originLabel}</MetaRow>
          <MetaRow label={t('tasks.detail.agent')}>{tr(agent.name)}</MetaRow>
          <MetaRow label={t('tasks.detail.created')}>{tr(task.createdAt)}</MetaRow>
          <MetaRow label={t('tasks.detail.updated')}>{tr(task.updatedAt)}</MetaRow>
          <MetaRow label={t('tasks.detail.due')}>{tr(task.dueLabel)}</MetaRow>
          <MetaRow label={t('tasks.detail.tags')}>
            <span className="inline-flex flex-wrap justify-end gap-1.5">
              {task.tags.map((tag) => (
                <span
                  key={tag['en-US']}
                  className="rounded-full bg-line/[0.05] px-2 py-[2px] text-[10px] font-medium leading-4 text-ink-2"
                >
                  {tr(tag)}
                </span>
              ))}
            </span>
          </MetaRow>
        </dl>
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-[17px] border border-dashed border-line/15 px-3.5 py-3">
        <FlaskConical
          className="mt-0.5 size-3.5 shrink-0 text-muted"
          strokeWidth={1.8}
          aria-hidden
        />
        <p className="text-[10.5px] leading-relaxed text-muted">
          {t('tasks.detail.demoNote')}
        </p>
      </div>
    </div>
  );
}

export function TaskDetailSheet({ task, open, onClose }: TaskDetailSheetProps) {
  const { t, tr } = useI18n();
  const agent = task ? getAgent(task.agentId) : null;
  const originLabel =
    task?.origin === 'simulated'
      ? t('tasks.simulatedPlan')
      : t('tasks.origin.demoTask');

  return (
    <DetailSheet
      open={open}
      onClose={onClose}
      eyebrow={t('tasks.detail.eyebrow')}
      title={task ? tr(task.title) : t('tasks.detail.fallbackTitle')}
      subtitle={task && agent ? `${tr(agent.name)} · ${originLabel}` : undefined}
      footer={
        task ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] leading-relaxed text-muted">
              {t('tasks.detail.footerNote')}
            </p>
            <Button variant="secondary" size="sm" data-testid="task-close" onClick={onClose}>
              {t('common.close')}
            </Button>
          </div>
        ) : null
      }
    >
      {task ? <TaskDetailContent task={task} /> : null}
    </DetailSheet>
  );
}
