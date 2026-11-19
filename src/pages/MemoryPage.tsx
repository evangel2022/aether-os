import { LockKeyhole, RotateCcw, SearchX } from 'lucide-react';
import { useState } from 'react';
import { MemoryCard } from '@/components/memory/MemoryCard';
import { MemoryPausedState } from '@/components/memory/MemoryPausedState';
import { MemorySummary } from '@/components/memory/MemorySummary';
import {
  MEMORY_CATEGORY_META,
  MEMORY_FILTER_ORDER,
  localizedVariants,
} from '@/components/memory/memory-meta';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterPills, type FilterOption } from '@/components/ui/FilterPills';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchField } from '@/components/ui/SearchField';
import { useI18n } from '@/i18n';
import { useDemoData } from '@/state/demo-data';
import { useSettings } from '@/state/settings';
import { cn } from '@/lib/cn';
import type { MemoryFilter } from '@/types';

export function MemoryPage({ embedded = false }: { embedded?: boolean }) {
  const { t } = useI18n();
  const { memories, toggleMemoryPin } = useDemoData();
  const { settings, updateSetting } = useSettings();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<MemoryFilter>('all');

  const memoryEnabled = settings.memoryEnabled;
  const total = memories.length;
  const pinnedCount = memories.filter((memory) => memory.pinned).length;
  const normalizedQuery = query.trim().toLowerCase();

  const searchScoped = normalizedQuery
    ? memories.filter((memory) => {
        const category = MEMORY_CATEGORY_META[memory.category];
        const haystack = [
          ...localizedVariants(memory.title),
          ...localizedVariants(memory.summary),
          ...localizedVariants(memory.source),
          ...memory.tags.flatMap(localizedVariants),
          t(category.labelKey),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : memories;

  const countFor = (value: MemoryFilter): number =>
    value === 'all'
      ? searchScoped.length
      : searchScoped.filter((memory) => memory.category === value).length;

  const filterOptions: FilterOption<MemoryFilter>[] = MEMORY_FILTER_ORDER.map((value) => ({
    value,
    label: value === 'all' ? t('common.all') : t(MEMORY_CATEGORY_META[value].pluralKey),
    count: countFor(value),
  }));

  const visibleMemories = searchScoped
    .filter((memory) => filter === 'all' || memory.category === filter)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const resetFilters = () => {
    setQuery('');
    setFilter('all');
  };

  const activeCategoryLabel =
    filter === 'all'
      ? t('memory.filter.allCategories')
      : t(MEMORY_CATEGORY_META[filter].sentenceKey);

  return (
    <div
      data-testid="memory-page"
      className={cn(
        'aether-scroll h-full overflow-y-auto page-pad',
        embedded ? 'pb-5 pt-4' : 'pb-8 pt-7',
      )}
    >
      {embedded && (
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge tone="accent" data-testid="memory-count">
              {t('memory.count', { pinned: pinnedCount, total })}
            </Badge>
            <DemoBadge />
          </div>
          <span className="text-[10px] text-muted">{t('memory.localOnlyNeverSynced')}</span>
        </div>
      )}

      {!embedded && (
        <PageHeader
          eyebrow={t('memory.eyebrow')}
          title={t('memory.title')}
          description={t('memory.description')}
          actions={
            <div className="flex items-center gap-2">
              <Badge tone="accent" data-testid="memory-count">
                {t('memory.count', { pinned: pinnedCount, total })}
              </Badge>
              <DemoBadge />
            </div>
          }
        />
      )}

      <MemorySummary
        total={total}
        pinned={pinnedCount}
        enabled={memoryEnabled}
        onToggle={(enabled) => updateSetting('memoryEnabled', enabled)}
      />

      {memoryEnabled ? (
        <>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div data-testid="memory-filters">
              <FilterPills<MemoryFilter>
                ariaLabel={t('memory.filtersAria')}
                options={filterOptions}
                value={filter}
                onChange={setFilter}
              />
            </div>
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder={t('memory.search.placeholder')}
              ariaLabel={t('memory.search.label')}
              className="w-full sm:w-[262px]"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-[10px] text-muted">
            <span>
              {t(normalizedQuery ? 'memory.showingMatching' : 'memory.showing', {
                visible: visibleMemories.length,
                total,
                category: activeCategoryLabel,
                query: query.trim(),
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <LockKeyhole className="size-2.5 shrink-0" aria-hidden="true" />
              {t('memory.pinnedFirst')}
            </span>
          </div>

          {visibleMemories.length > 0 ? (
            <div
              data-testid="memory-grid"
              className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {visibleMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onTogglePin={toggleMemoryPin}
                />
              ))}
            </div>
          ) : (
            <div data-testid="memory-empty" className="mt-3">
              <EmptyState
                icon={SearchX}
                title={t('memory.empty.title')}
                description={
                  normalizedQuery
                    ? t('memory.empty.searchDescription', {
                        total,
                        query: query.trim(),
                      })
                    : t('memory.empty.filterDescription')
                }
                action={
                  <Button
                    size="sm"
                    variant="secondary"
                    data-testid="memory-reset-search"
                    leadingIcon={<RotateCcw className="size-3.5" />}
                    onClick={resetFilters}
                  >
                    {t('memory.empty.reset')}
                  </Button>
                }
              />
            </div>
          )}
        </>
      ) : (
        <MemoryPausedState
          total={total}
          pinned={pinnedCount}
          onEnable={() => updateSetting('memoryEnabled', true)}
        />
      )}

      <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9.5px] leading-relaxed text-muted">
        <span className="flex items-center gap-1.5">
          <LockKeyhole className="size-2.5 shrink-0" aria-hidden="true" />
          {t('memory.footer.demo')}
        </span>
        <span>{t('memory.footer.privacy')}</span>
      </p>
    </div>
  );
}
