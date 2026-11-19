import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { useI18n } from '@/i18n';
import type { TranslationKey } from '@/i18n';
import type { AgentStatus, TaskPriority, TaskStatus } from '@/types';

const agentStatus: Record<
  AgentStatus,
  { labelKey: TranslationKey; tone: BadgeTone; dot: boolean }
> = {
  working: { labelKey: 'status.working', tone: 'accent', dot: true },
  idle: { labelKey: 'status.idle', tone: 'neutral', dot: true },
  waiting: { labelKey: 'status.waiting', tone: 'warning', dot: true },
};

const taskStatus: Record<
  TaskStatus,
  { labelKey: TranslationKey; tone: BadgeTone; dot: boolean }
> = {
  in_progress: { labelKey: 'status.inProgress', tone: 'accent', dot: true },
  queued: { labelKey: 'status.queued', tone: 'neutral', dot: true },
  review: { labelKey: 'status.review', tone: 'warning', dot: true },
  completed: { labelKey: 'status.completed', tone: 'positive', dot: true },
};

const priorityKey: Record<TaskPriority, TranslationKey> = {
  high: 'status.high',
  medium: 'status.medium',
  low: 'status.low',
};

export function AgentStatusBadge({ status }: { status: AgentStatus }) {
  const { t } = useI18n();
  const meta = agentStatus[status];
  return (
    <Badge tone={meta.tone} dot={meta.dot}>
      {t(meta.labelKey)}
    </Badge>
  );
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const { t } = useI18n();
  const meta = taskStatus[status];
  return (
    <Badge tone={meta.tone} dot={meta.dot}>
      {t(meta.labelKey)}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center gap-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted">
      <span
        className={
          priority === 'high'
            ? 'size-1.5 rounded-full bg-danger'
            : priority === 'medium'
              ? 'size-1.5 rounded-full bg-warning'
              : 'size-1.5 rounded-full bg-muted/60'
        }
        aria-hidden
      />
      {t(priorityKey[priority])}
    </span>
  );
}
