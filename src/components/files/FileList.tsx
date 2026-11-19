import { ChevronRight, Star } from 'lucide-react';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { FileEntry } from '@/types';
import { FileIcon } from './FileIcon';
import {
  formatCount,
  getEntryLocation,
  getFileTypeMeta,
  getFolderStats,
  isFolderEntry,
} from './file-utils';

interface FileListProps {
  entries: FileEntry[];
  mode: 'browse' | 'search';
  query: string;
  selectedId: string | null;
  onSelect: (entry: FileEntry) => void;
  onOpenFolder: (entry: FileEntry) => void;
}

interface FileRowProps {
  entry: FileEntry;
  searching: boolean;
  selected: boolean;
  onSelect: (entry: FileEntry) => void;
  onOpenFolder: (entry: FileEntry) => void;
}

function FileRow({
  entry,
  searching,
  selected,
  onSelect,
  onOpenFolder,
}: FileRowProps) {
  const { t, tr, locale } = useI18n();
  const folder = isFolderEntry(entry);
  const meta = getFileTypeMeta(entry.type);
  const name = tr(entry.name);
  const location = getEntryLocation(entry, locale);
  const typeLabel = t(meta.labelKey);
  const sizeLabel =
    entry.size ??
    (folder
      ? formatCount(
          t,
          getFolderStats(entry.id).total,
          'files.count.item.one',
          'files.count.item.other',
        )
      : '—');

  return (
    <button
      type="button"
      data-testid={`file-row-${entry.id}`}
      data-selected={selected ? 'true' : undefined}
      aria-label={name}
      aria-pressed={selected}
      onClick={() => {
        if (folder && !searching) {
          onOpenFolder(entry);
        } else {
          onSelect(entry);
        }
      }}
      onDoubleClick={folder && searching ? () => onOpenFolder(entry) : undefined}
      title={
        folder
          ? searching
            ? t('files.row.folderHint', { name })
            : t('files.row.openFolder', { name })
          : name
      }
      className={cn(
        'group grid w-full items-center gap-2 rounded-[10px] px-2.5 text-left transition-colors duration-150',
        searching
          ? 'grid-cols-[minmax(0,1fr)_18px] py-[7px]'
          : 'grid-cols-[minmax(0,1fr)_18px] py-2 sm:grid-cols-[minmax(0,1fr)_84px_64px_18px]',
        selected ? 'bg-accent/[0.075]' : 'hover:bg-line/[0.04]',
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <FileIcon entry={entry} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[12px] font-medium leading-snug text-ink">
              {name}
            </span>
            {entry.starred && (
              <Star
                className="size-2.5 shrink-0 fill-current text-accent/70"
                aria-hidden="true"
              />
            )}
          </span>
          {searching && (
            <span className="mt-[1px] block truncate text-[9.5px] text-muted">
              {typeLabel} · {location}
            </span>
          )}
        </span>
      </span>

      {searching ? (
        <ChevronRight
          className={cn(
            'size-3.5 justify-self-end',
            folder ? 'text-muted/60' : 'invisible',
          )}
          aria-hidden="true"
        />
      ) : (
        <>
          <span className="hidden truncate text-[10.5px] text-muted sm:block">
            {tr(entry.modified)}
          </span>
          <span className="hidden truncate text-[10.5px] tabular-nums text-muted sm:block">
            {sizeLabel}
          </span>
          <ChevronRight
            className={cn(
              'size-3.5 justify-self-end transition-transform duration-150',
              folder
                ? 'text-muted/60 group-hover:translate-x-0.5 group-hover:text-ink-2'
                : 'invisible',
            )}
            aria-hidden="true"
          />
        </>
      )}
    </button>
  );
}

export function FileList({
  entries,
  mode,
  query,
  selectedId,
  onSelect,
  onOpenFolder,
}: FileListProps) {
  const { t } = useI18n();
  const searching = mode === 'search';

  return (
    <div className="px-1.5 pb-1.5" data-testid="file-list">
      <div
        aria-hidden="true"
        className={cn(
          'sticky top-0 z-10 grid items-center gap-2 border-b border-line/[0.055] bg-surface/85 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.09em] text-muted/80 backdrop-blur-xl',
          searching
            ? 'grid-cols-[minmax(0,1fr)_auto]'
            : 'grid-cols-[minmax(0,1fr)_18px] sm:grid-cols-[minmax(0,1fr)_84px_64px_18px]',
        )}
      >
        {searching ? (
          <>
            <span className="truncate">
              {t('files.list.resultsPrefix')}
              <span className="text-ink-2">“{query.trim()}”</span>
              {t('files.list.resultsSuffix')}
            </span>
            <span className="tabular-nums">{entries.length}</span>
          </>
        ) : (
          <>
            <span>{t('files.list.name')}</span>
            <span className="hidden sm:block">{t('files.list.modified')}</span>
            <span className="hidden sm:block">{t('files.list.size')}</span>
            <span />
          </>
        )}
      </div>

      <div className="pt-1">
        {entries.map((entry) => (
          <FileRow
            key={entry.id}
            entry={entry}
            searching={searching}
            selected={selectedId === entry.id}
            onSelect={onSelect}
            onOpenFolder={onOpenFolder}
          />
        ))}
      </div>
    </div>
  );
}
