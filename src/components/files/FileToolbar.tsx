import { ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { Fragment } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { SearchField } from '@/components/ui/SearchField';
import { SegmentedControl, type SegmentOption } from '@/components/ui/SegmentedControl';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { FileEntry } from '@/types';
import { formatCount } from './file-utils';

export type FileView = 'list' | 'grid';

interface FileToolbarProps {
  crumbs: FileEntry[];
  canGoBack: boolean;
  itemCount: number;
  searching: boolean;
  query: string;
  view: FileView;
  onBack: () => void;
  onCrumbClick: (folderId: string) => void;
  onQueryChange: (value: string) => void;
  onViewChange: (view: FileView) => void;
}

export function FileToolbar({
  crumbs,
  canGoBack,
  itemCount,
  searching,
  query,
  view,
  onBack,
  onCrumbClick,
  onQueryChange,
  onViewChange,
}: FileToolbarProps) {
  const { t, tr } = useI18n();

  const viewOptions: SegmentOption<FileView>[] = [
    {
      value: 'list',
      label: t('files.view.list'),
      icon: <List className="size-3.5" strokeWidth={1.8} />,
    },
    {
      value: 'grid',
      label: t('files.view.grid'),
      icon: <LayoutGrid className="size-3.5" strokeWidth={1.8} />,
    },
  ];

  const countLabel = searching
    ? formatCount(t, itemCount, 'files.count.result.one', 'files.count.result.other')
    : formatCount(t, itemCount, 'files.count.item.one', 'files.count.item.other');

  return (
    <div className="flex h-[50px] shrink-0 items-center gap-1.5 border-b border-line/[0.06] px-2.5">
      <IconButton
        label={t('files.toolbar.back')}
        data-testid="files-back"
        size="sm"
        disabled={!canGoBack}
        onClick={onBack}
      >
        <ChevronLeft />
      </IconButton>

      <nav
        aria-label={t('files.toolbar.breadcrumb')}
        data-testid="files-breadcrumbs"
        className="flex min-w-0 flex-1 items-center gap-0.5 overflow-hidden"
      >
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1;
          return (
            <Fragment key={crumb.id}>
              {index > 0 && (
                <ChevronRight
                  className="size-3 shrink-0 text-muted/55"
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                data-testid={`files-breadcrumb-${crumb.id}`}
                aria-current={isCurrent ? 'page' : undefined}
                disabled={isCurrent}
                onClick={() => onCrumbClick(crumb.id)}
                className={cn(
                  'min-w-0 max-w-[132px] truncate rounded-md px-1.5 py-1 text-[11.5px] transition-colors duration-150',
                  isCurrent
                    ? 'font-semibold text-ink'
                    : 'text-ink-2 hover:bg-line/[0.05] hover:text-ink',
                )}
              >
                {tr(crumb.name)}
              </button>
            </Fragment>
          );
        })}
        <span className="ml-1 hidden shrink-0 text-[10px] tabular-nums text-muted/80 xl:inline">
          {countLabel}
        </span>
      </nav>

      <SearchField
        value={query}
        onChange={onQueryChange}
        placeholder={t('files.toolbar.searchPlaceholder')}
        ariaLabel={t('files.toolbar.searchLabel')}
        className="w-[148px] shrink-0 sm:w-[176px] xl:w-[200px]"
      />

      <div data-testid="files-view-toggle" className="hidden shrink-0 sm:block">
        <SegmentedControl<FileView>
          ariaLabel={t('files.toolbar.view')}
          size="sm"
          options={viewOptions}
          value={view}
          onChange={onViewChange}
        />
      </div>
    </div>
  );
}
