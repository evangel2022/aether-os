import { Info, LayoutGrid, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AppCard, type AppCardState } from '@/components/apps/AppCard';
import { DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchField } from '@/components/ui/SearchField';
import { APP_DEFINITIONS } from '@/data/apps';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { useWindows } from '@/state/windows';
import type { AppId } from '@/types';

export function AppsPage() {
  const { t, tr } = useI18n();
  const [query, setQuery] = useState('');
  const { windows, activeWindowId, openApp, focusWindow, restoreWindow } = useWindows();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredApps = useMemo(() => {
    if (!normalizedQuery) return APP_DEFINITIONS;
    return APP_DEFINITIONS.filter(
      (app) =>
        tr(app.name).toLowerCase().includes(normalizedQuery) ||
        tr(app.tagline).toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery, tr]);

  const runningCount = windows.length;

  const getState = (appId: AppId): AppCardState => {
    const target = windows.find((window) => window.appId === appId);
    if (!target) return 'closed';
    if (target.minimized) return 'minimized';
    if (target.id === activeWindowId) return 'active';
    return 'running';
  };

  const handleOpen = (appId: AppId) => {
    const target = windows.find((window) => window.appId === appId);
    if (!target) {
      openApp(appId);
      return;
    }
    if (target.minimized) {
      restoreWindow(target.id);
      return;
    }
    focusWindow(target.id);
  };

  return (
    <div
      className="aether-scroll h-full overflow-y-auto page-pad pb-8 pt-7"
      data-testid="apps-page"
    >
      <PageHeader
        eyebrow={t('apps.eyebrow')}
        title={t('apps.title')}
        description={t('apps.description')}
        actions={
          <>
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder={t('apps.searchPlaceholder')}
              ariaLabel={t('apps.searchAria')}
              className="w-[188px]"
              inputClassName="text-[11.5px]"
            />
            <DemoBadge />
          </>
        }
      />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-ink">
            <LayoutGrid className="size-4 text-accent" strokeWidth={1.9} aria-hidden />
            {t('apps.library')}
          </h2>
          <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
            {t('apps.libraryDescription', { count: APP_DEFINITIONS.length })}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-medium text-muted">
          <span className="tabular-nums">
            {t('apps.filteredCount', {
              shown: filteredApps.length,
              total: APP_DEFINITIONS.length,
            })}
          </span>
          <span className="h-3 w-px bg-line/15" aria-hidden />
          <span className="flex items-center gap-1.5">
            <span
              className={cn(
                'size-1.5 rounded-full',
                runningCount > 0 ? 'bg-positive' : 'bg-line/30',
              )}
              aria-hidden
            />
            <span className="tabular-nums">
              {t(runningCount === 1 ? 'apps.windowsOpenOne' : 'apps.windowsOpen', {
                count: runningCount,
              })}
            </span>
          </span>
        </div>
      </div>

      {filteredApps.length > 0 ? (
        <div
          className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          data-testid="apps-grid"
        >
          {filteredApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              state={getState(app.id)}
              onOpen={() => handleOpen(app.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          compact
          icon={Search}
          title={t('apps.emptyTitle', { query: query.trim() })}
          description={t('apps.emptyDescription')}
          action={
            <Button variant="secondary" size="sm" onClick={() => setQuery('')}>
              {t('common.clearSearch')}
            </Button>
          }
          className="mt-4"
        />
      )}

      <div className="mt-5 flex items-start gap-2.5 rounded-[16px] border border-dashed border-line/20 bg-line/[0.02] px-3.5 py-3">
        <Info className="mt-px size-3.5 shrink-0 text-muted" strokeWidth={1.9} aria-hidden />
        <p className="text-[10.5px] leading-relaxed text-muted">{t('apps.infoNote')}</p>
      </div>
    </div>
  );
}
