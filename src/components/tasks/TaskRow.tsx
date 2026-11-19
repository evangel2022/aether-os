import { CalendarClock, ChevronRight, Clock } from 'lucide-react';
import { getAgent } from '@/data/agents';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { PriorityBadge, TaskStatusBadge } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useI18n } from '@/i18n';
import type { TaskRecord } from '@/types';

interface TaskRowProps {
  task: TaskRecord;
  onOpen: (task: TaskRecord) => void;
}

export function TaskRow({ task, onOpen }: TaskRowProps) {
  const { t, tr } = useI18n();
  const agent = getAgent(task.agentId);
  const showProgress = task.status === 'in_progress' || task.status === 'review';

  return (
    <button
      type="button"
      data-testid={`task-row-${task.id}`}
      aria-haspopup="dialog"
      onClick={() => onOpen(task)}
      className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 px-4 py-4 text-left transition-colors duration-200 hover:bg-line/[0.025] focus-visible:bg-line/[0.03] sm:gap-4 sm:px-5 sm:py-5"
    >
      <AgentAvatar agent={agent} size="md" className="mt-0.5" />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <h3 className="truncate text-[13px] font-semibold tracking-[-0.012em] text-ink">
            {tr(task.title)}
          </h3>
          <TaskStatusBadge status={task.status} />
          {task.origin === 'simulated' && (
            <Badge tone="accent" className="normal-case tracking-normal">
              {t('tasks.simulatedPlan')}
            </Badge>
          )}
        </div>

        <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-muted">
          {tr(task.description)}
        </p>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span className="text-[11px] font-medium text-ink-2">{tr(agent.name)}</span>
          <span className="text-muted/40" aria-hidden>
            ·
          </span>
          <PriorityBadge priority={task.priority} />
          <span className="text-muted/40" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[10.5px] text-muted">
            <Clock className="size-3" strokeWidth={1.8} aria-hidden />
            {t('tasks.row.updated', { time: tr(task.updatedAt) })}
          </span>
          {task.tags.map((tag) => (
            <span
              key={tag['en-US']}
              className="rounded-full bg-line/[0.05] px-2 py-[2px] text-[10px] font-medium leading-4 text-ink-2"
            >
              {tr(tag)}
            </span>
          ))}
        </div>

        {showProgress && (
          <div className="mt-3 flex items-center gap-2.5">
            <Progress
              className="max-w-[220px]"
              size="xs"
              value={task.progress}
              tone={task.status === 'review' ? 'warning' : 'accent'}
              label={t('tasks.progressLabel', { title: tr(task.title) })}
            />
            <span className="text-[10px] font-medium tabular-nums text-muted">
              {task.progress}%
            </span>
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-3 pt-0.5">
        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-line/10 bg-surface/55 px-2.5 py-1 text-[10.5px] font-medium leading-4 text-ink-2">
          <CalendarClock className="size-3 text-muted" strokeWidth={1.8} aria-hidden />
          {tr(task.dueLabel)}
        </span>
        <span className="flex size-7 items-center justify-center rounded-full border border-line/10 bg-surface/60 text-muted transition-colors duration-200 group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent-strong">
          <ChevronRight className="size-3.5" strokeWidth={2} aria-hidden />
        </span>
      </div>
    </button>
  );
}
