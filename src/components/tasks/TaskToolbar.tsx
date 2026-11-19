import { RotateCcw } from 'lucide-react';
import { FilterPills, type FilterOption } from '@/components/ui/FilterPills';
import { SearchField } from '@/components/ui/SearchField';
import { useI18n, type TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';
import type { TaskStatus } from '@/types';

export type TaskFilter = 'all' | TaskStatus;

const STATUS_LABEL_KEYS = {
  in_progress: 'status.inProgress',
  queued: 'status.queued',
  review: 'status.review',
  completed: 'status.completed',
} as const satisfies Record<TaskStatus, TranslationKey>;

interface TaskToolbarProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  query: string;
  onQueryChange: (query: string) => void;
  counts: Record<TaskFilter, number>;
  summary: string;
  isFiltered: boolean;
  onReset: () => void;
  dense?: boolean;
}

export function TaskToolbar({
  filter,
  onFilterChange,
  query,
  onQueryChange,
  counts,
  summary,
  isFiltered,
  onReset,
  dense = false,
}: TaskToolbarProps) {
  const { t } = useI18n();

  const statusFilters: { value: TaskStatus; label: string }[] = [
    { value: 'in_progress', label: t(STATUS_LABEL_KEYS.in_progress) },
    { value: 'queued', label: t(STATUS_LABEL_KEYS.queued) },
    { value: 'review', label: t(STATUS_LABEL_KEYS.review) },
    { value: 'completed', label: t(STATUS_LABEL_KEYS.completed) },
  ];

  const options: FilterOption<TaskFilter>[] = [
    { value: 'all', label: t('common.all'), count: counts.all },
    ...statusFilters.map((item) => ({ ...item, count: counts[item.value] })),
  ];

  return (
    <div className={cn(dense ? 'mt-3' : 'mt-6')}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div data-testid="task-filters">
          <FilterPills
            options={options}
            value={filter}
            onChange={onFilterChange}
            ariaLabel={t('tasks.filter.aria')}
          />
        </div>
        <SearchField
          value={query}
          onChange={onQueryChange}
          placeholder={t('tasks.search.placeholder')}
          ariaLabel={t('tasks.search.aria')}
          className="w-full sm:w-[250px]"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p
          data-testid="task-count-summary"
          aria-live="polite"
          className="text-[11.5px] leading-relaxed text-muted"
        >
          {summary}
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-accent-strong transition-opacity duration-200 hover:opacity-70"
          >
            <RotateCcw className="size-3" strokeWidth={2} aria-hidden />
            {t('common.resetFilters')}
          </button>
        )}
      </div>
    </div>
  );
}
