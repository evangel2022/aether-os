import { motion } from 'framer-motion';
import { FlaskConical, RotateCcw, SearchX, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { TaskDetailSheet } from '@/components/tasks/TaskDetailSheet';
import { TaskRow } from '@/components/tasks/TaskRow';
import { TaskToolbar, type TaskFilter } from '@/components/tasks/TaskToolbar';
import { Button } from '@/components/ui/Button';
import { DemoBadge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { getAgent } from '@/data/agents';
import { useI18n, type TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';
import { useWindows } from '@/state/windows';
import type { LocalizedText, TaskRecord, TaskStatus } from '@/types';

/** Labels shared by the summary line, the empty state and the filter pills. */
const STATUS_FILTER_KEYS = {
  in_progress: 'status.inProgress',
  queued: 'status.queued',
  review: 'status.review',
  completed: 'status.completed',
} as const satisfies Record<TaskStatus, TranslationKey>;

const EMPTY_TITLE_KEYS = {
  in_progress: 'tasks.empty.filteredTitle.in_progress',
  queued: 'tasks.empty.filteredTitle.queued',
  review: 'tasks.empty.filteredTitle.review',
  completed: 'tasks.empty.filteredTitle.completed',
} as const satisfies Record<TaskStatus, TranslationKey>;

type Translate = (
  key: TranslationKey,
  vars?: Record<string, string | number>,
) => string;

/** Natural count phrasing in both languages: "1 task" / "2 tasks" vs "1 个任务". */
function formatTaskCount(t: Translate, count: number): string {
  return count === 1
    ? t('tasks.count.one', { count })
    : t('tasks.count.other', { count });
}

function matchesQuery(
  task: TaskRecord,
  needle: string,
  tr: (value: LocalizedText) => string,
): boolean {
  const agent = getAgent(task.agentId);
  return [
    tr(task.title),
    tr(task.description),
    tr(agent.name),
    tr(agent.shortName),
    ...task.tags.map((tag) => tr(tag)),
  ].some((value) => value.toLowerCase().includes(needle));
}

export function TasksPage({ embedded = false }: { embedded?: boolean }) {
  const { navigate } = useDesktop();
  const { openApp } = useWindows();
  const { tasks } = useDemoData();
  const { t, tr } = useI18n();
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [query, setQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<TaskRecord | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const counts = useMemo<Record<TaskFilter, number>>(() => {
    const next: Record<TaskFilter, number> = {
      all: tasks.length,
      in_progress: 0,
      queued: 0,
      review: 0,
      completed: 0,
    };
    for (const task of tasks) {
      next[task.status] += 1;
    }
    return next;
  }, [tasks]);

  /* Keep source order — the demo library is pre-grouped, and the Command Center
     prepends new simulated plans so they surface at the top of the list. */
  const filteredTasks = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tasks
      .filter((task) => filter === 'all' || task.status === filter)
      .filter((task) => (needle ? matchesQuery(task, needle, tr) : true));
  }, [tasks, filter, query, tr]);

  const summary = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed) {
      const filterLabel = filter === 'all' ? null : t(STATUS_FILTER_KEYS[filter]);
      return filterLabel
        ? t('tasks.summary.searchInFilter', {
            tasks: formatTaskCount(t, filteredTasks.length),
            query: trimmed,
            filter: filterLabel,
          })
        : t('tasks.summary.search', {
            tasks: formatTaskCount(t, filteredTasks.length),
            query: trimmed,
          });
    }
    if (filter !== 'all') {
      return t('tasks.summary.filtered', {
        filtered: filteredTasks.length,
        total: tasks.length,
        filter: t(STATUS_FILTER_KEYS[filter]),
      });
    }
    return t('tasks.summary.all', {
      tasks: formatTaskCount(t, tasks.length),
      active: counts.in_progress,
      review: counts.review,
      completed: counts.completed,
    });
  }, [counts, filter, filteredTasks.length, query, t, tasks.length]);

  const simulatedCount = tasks.filter((task) => task.origin === 'simulated').length;
  const isFiltered = filter !== 'all' || query.trim().length > 0;

  const resetFilters = () => {
    setFilter('all');
    setQuery('');
  };

  const openNewPlan = () => {
    if (embedded) {
      openApp('command');
    } else {
      navigate('command');
    }
  };

  const openTask = (task: TaskRecord) => {
    setSelectedTask(task);
    setSheetOpen(true);
  };

  const closeSheet = () => setSheetOpen(false);

  const trimmedQuery = query.trim();
  const emptyTitle = trimmedQuery
    ? t('tasks.empty.searchTitle')
    : filter === 'all'
      ? t('tasks.empty.title')
      : t(EMPTY_TITLE_KEYS[filter]);
  const emptyDescription = trimmedQuery
    ? filter === 'all'
      ? t('tasks.empty.searchDescription', { query: trimmedQuery })
      : t('tasks.empty.searchDescriptionFiltered', { query: trimmedQuery })
    : t('tasks.empty.description');

  return (
    <div
      className={cn(
        'aether-scroll h-full overflow-y-auto page-pad',
        embedded ? 'pb-5 pt-4' : 'pb-8 pt-7',
      )}
      data-testid="tasks-page"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col">
        {embedded ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <DemoBadge />
              <span className="text-[10.5px] font-medium text-muted">
                {t('tasks.embeddedSummary', {
                  tasks: formatTaskCount(t, counts.all),
                  active: counts.in_progress,
                  review: counts.review,
                })}
              </span>
            </div>
            <Button
              size="sm"
              leadingIcon={<Sparkles className="size-3.5" />}
              onClick={openNewPlan}
            >
              {t('tasks.newPlan')}
            </Button>
          </div>
        ) : (
          <>
            <PageHeader
              eyebrow={t('tasks.eyebrow')}
              title={t('tasks.title')}
              description={t('tasks.description')}
              actions={
                <>
                  <DemoBadge />
                  <Button
                    data-testid="tasks-new-plan"
                    leadingIcon={<Sparkles className="size-3.5" />}
                    onClick={openNewPlan}
                  >
                    {t('tasks.newPlan')}
                  </Button>
                </>
              }
            />

            <div className="mt-4 flex items-start gap-2 rounded-[14px] border border-line/[0.06] bg-line/[0.02] px-3 py-2 text-[10.5px] leading-relaxed text-muted">
              <FlaskConical
                className="mt-0.5 size-3 shrink-0"
                strokeWidth={1.8}
                aria-hidden
              />
              <p>
                {t('tasks.demoNote')}
                {simulatedCount > 0
                  ? t(
                      simulatedCount === 1
                        ? 'tasks.demoNote.simulated.one'
                        : 'tasks.demoNote.simulated.other',
                      { count: simulatedCount },
                    )
                  : null}
              </p>
            </div>
          </>
        )}

        <TaskToolbar
          filter={filter}
          onFilterChange={setFilter}
          query={query}
          onQueryChange={setQuery}
          counts={counts}
          summary={summary}
          isFiltered={isFiltered}
          onReset={resetFilters}
          dense={embedded}
        />

        {filteredTasks.length === 0 ? (
          <div className="mt-3" data-testid="tasks-empty">
            <EmptyState
              icon={trimmedQuery ? SearchX : RotateCcw}
              title={emptyTitle}
              description={emptyDescription}
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  leadingIcon={<RotateCcw className="size-3.5" />}
                  onClick={resetFilters}
                >
                  {t('common.resetFilters')}
                </Button>
              }
            />
          </div>
        ) : (
          <div
            data-testid="task-list"
            className="mt-3 overflow-hidden rounded-[24px] border border-line/[0.07] bg-surface/55 shadow-[0_14px_36px_-30px_rgb(var(--shadow-tint)/0.45)]"
          >
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.26,
                  delay: Math.min(index * 0.025, 0.2),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-line/[0.05] last:border-b-0"
              >
                <TaskRow task={task} onOpen={openTask} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <TaskDetailSheet task={selectedTask} open={sheetOpen} onClose={closeSheet} />
    </div>
  );
}
