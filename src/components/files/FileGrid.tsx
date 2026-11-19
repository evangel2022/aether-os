import { ChevronRight, Folder } from 'lucide-react';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { FileEntry } from '@/types';
import { FileIcon } from './FileIcon';
import { FileImageArt } from './FileImageArt';
import {
  formatCount,
  getArtworkVariant,
  getEntryLocation,
  getFileTypeMeta,
  getFolderStats,
  isFolderEntry,
} from './file-utils';

interface FileGridProps {
  entries: FileEntry[];
  mode: 'browse' | 'search';
  selectedId: string | null;
  onSelect: (entry: FileEntry) => void;
  onOpenFolder: (entry: FileEntry) => void;
}

interface FileGridCardProps {
  entry: FileEntry;
  searching: boolean;
  selected: boolean;
  onSelect: (entry: FileEntry) => void;
  onOpenFolder: (entry: FileEntry) => void;
}

function FileGridCard({
  entry,
  searching,
  selected,
  onSelect,
  onOpenFolder,
}: FileGridCardProps) {
  const { t, tr, locale } = useI18n();
  const folder = isFolderEntry(entry);
  const meta = getFileTypeMeta(entry.type);
  const name = tr(entry.name);
  const subtitle = searching
    ? getEntryLocation(entry, locale)
    : folder
      ? formatCount(
          t,
          getFolderStats(entry.id).total,
          'files.count.item.one',
          'files.count.item.other',
        )
      : entry.size
        ? t('files.grid.meta', { type: t(meta.labelKey), size: entry.size })
        : t(meta.labelKey);

  return (
    <button
      type="button"
      data-testid={`file-card-${entry.id}`}
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
        'group flex flex-col overflow-hidden rounded-[15px] border bg-surface/55 text-left transition-all duration-200 ease-aether',
        selected
          ? 'border-accent/40 ring-1 ring-accent/15'
          : 'border-line/[0.075] hover:-translate-y-[1px] hover:border-line/[0.16] hover:shadow-[0_14px_26px_-22px_rgb(var(--shadow-tint)/0.5)]',
      )}
    >
      <span className="relative flex h-[86px] items-center justify-center overflow-hidden bg-surface-alt/55">
        {entry.type === 'image' ? (
          <FileImageArt
            variant={getArtworkVariant(entry.id)}
            className="absolute inset-0 h-full w-full"
          />
        ) : folder ? (
          <span className="flex size-12 items-center justify-center rounded-[14px] border border-accent/15 bg-accent/[0.09] text-accent-strong">
            <Folder className="size-6" strokeWidth={1.6} aria-hidden="true" />
          </span>
        ) : (
          <FileIcon entry={entry} size="lg" />
        )}
        {selected && (
          <span
            className="absolute right-2 top-2 size-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
        )}
      </span>

      <span className="flex min-w-0 flex-1 flex-col border-t border-line/[0.05] px-2.5 py-2">
        <span className="block truncate text-[11.5px] font-medium leading-snug text-ink">
          {name}
        </span>
        <span className="mt-0.5 flex min-w-0 items-center gap-1 text-[9.5px] text-muted">
          <span className="truncate">{subtitle}</span>
          {folder && (
            <ChevronRight
              className="ml-auto size-3 shrink-0 text-muted/60 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          )}
        </span>
      </span>
    </button>
  );
}

export function FileGrid({
  entries,
  mode,
  selectedId,
  onSelect,
  onOpenFolder,
}: FileGridProps) {
  const searching = mode === 'search';

  return (
    <div
      data-testid="file-grid"
      className="grid grid-cols-[repeat(auto-fill,minmax(168px,1fr))] gap-2.5 p-1.5"
    >
      {entries.map((entry) => (
        <FileGridCard
          key={entry.id}
          entry={entry}
          searching={searching}
          selected={selectedId === entry.id}
          onSelect={onSelect}
          onOpenFolder={onOpenFolder}
        />
      ))}
    </div>
  );
}
