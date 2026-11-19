import { Check } from 'lucide-react';
import { useI18n, type TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';
import type { TaskStep, TaskStepStatus } from '@/types';

const STEP_STATUS_KEYS = {
  done: 'tasks.step.done',
  active: 'tasks.step.active',
  pending: 'tasks.step.pending',
} as const satisfies Record<TaskStepStatus, TranslationKey>;

interface TaskStepTimelineProps {
  steps: TaskStep[];
}

export function TaskStepTimeline({ steps }: TaskStepTimelineProps) {
  const { t, tr } = useI18n();

  return (
    <ol data-testid="task-steps">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isDone = step.status === 'done';
        const isActive = step.status === 'active';

        return (
          <li key={step.id} className="relative flex gap-3.5 pb-5 last:pb-0">
            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  'absolute bottom-0 left-[13px] top-[30px] w-px rounded-full',
                  isDone ? 'bg-positive/30' : 'bg-line/10',
                )}
              />
            )}
            <span
              className={cn(
                'relative z-[1] flex size-7 shrink-0 items-center justify-center rounded-full border text-[10.5px] font-semibold tabular-nums',
                isDone && 'border-positive/20 bg-positive/10 text-positive',
                isActive &&
                  'border-accent/25 bg-accent text-on-accent shadow-[0_4px_12px_-6px_rgb(var(--accent)/0.65)]',
                step.status === 'pending' && 'border-line/10 bg-surface text-muted',
              )}
              aria-hidden
            >
              {isDone ? <Check className="size-3.5" strokeWidth={2.6} /> : index + 1}
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className={cn(
                    'text-[12px] font-semibold leading-snug',
                    step.status === 'pending' ? 'text-ink-2' : 'text-ink',
                  )}
                >
                  {tr(step.label)}
                </p>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-[0.08em]',
                    isDone && 'bg-positive/10 text-positive',
                    isActive && 'bg-accent/10 text-accent-strong',
                    step.status === 'pending' && 'bg-line/[0.06] text-muted',
                  )}
                >
                  {t(STEP_STATUS_KEYS[step.status])}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                {tr(step.detail)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
