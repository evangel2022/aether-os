import { Folder, HardDrive, LockKeyhole, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Progress } from '@/components/ui/Progress';
import { SYSTEM_SNAPSHOT } from '@/data/system';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { FileEntry } from '@/types';
import {
  ROOT_FOLDER_ID,
  getFileEntry,
  getFolderStats,
  isFolderEntry,
} from './file-utils';

interface LocationRow {
  id: string;
  icon: LucideIcon;
}

/** The named places surfaced on the left rail. Labels come from the localized demo data. */
const LOCATION_ROWS: LocationRow[] = [
  { id: ROOT_FOLDER_ID, icon: HardDrive },
  { id: 'projects', icon: Folder },
  { id: 'design', icon: Folder },
  { id: 'documents', icon: Folder },
  { id: 'downloads', icon: Folder },
  { id: 'archive', icon: Folder },
];

const LOCATION_IDS = new Set(LOCATION_ROWS.map((row) => row.id));

/** Starred entries that are not already one of the named locations. */
const FAVORITE_ENTRIES: FileEntry[] = Array.from(
  new Map(
    (['aether-prototype', 'principles'] as const)
      .map((id) => getFileEntry(id))
      .filter((entry): entry is FileEntry => Boolean(entry))
      .filter((entry) => entry.starred && !LOCATION_IDS.has(entry.id))
      .map((entry) => [entry.id, entry] as const),
  ).values(),
);

interface FileSidebarProps {
  currentFolderId: string;
  selectedId: string | null;
  onNavigate: (folderId: string, selectId?: string) => void;
}

function RowCount({ count, active }: { count: number; active: boolean }) {
  return (
    <span
      className={cn(
        'ml-auto shrink-0 tabular-nums text-[9.5px]',
        active ? 'text-accent-strong/70' : 'text-muted/70',
      )}
    >
      {count}
    </span>
  );
}

export function FileSidebar({ currentFolderId, selectedId, onNavigate }: FileSidebarProps) {
  const { t, tr } = useI18n();
  const storagePct = Math.round(
    (SYSTEM_SNAPSHOT.storageUsedGb / SYSTEM_SNAPSHOT.storageTotalGb) * 100,
  );

  return (
    <aside
      data-testid="files-sidebar"
      aria-label={t('files.sidebar.aria')}
      className="hidden w-[186px] shrink-0 flex-col border-r border-line/[0.06] bg-surface-alt/35 p-2.5 md:flex"
    >
      <div className="aether-scroll flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto">
        <p className="eyebrow px-2 pb-1 pt-0.5">{t('files.sidebar.favorites')}</p>
        {FAVORITE_ENTRIES.map((entry) => {
          const label = tr(entry.name);
          const active =
            currentFolderId === entry.id || (!isFolderEntry(entry) && selectedId === entry.id);
          return (
            <button
              key={`favorite-${entry.id}`}
              type="button"
              data-testid={`files-favorite-${entry.id}`}
              onClick={() => {
                if (isFolderEntry(entry)) {
                  onNavigate(entry.id);
                } else if (entry.parentId) {
                  onNavigate(entry.parentId, entry.id);
                }
              }}
              title={label}
              aria-label={label}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'group flex w-full items-center gap-2 rounded-[10px] px-2 py-[7px] text-left text-[11.5px] transition-colors duration-150',
                active
                  ? 'bg-accent/[0.085] font-medium text-accent-strong'
                  : 'text-ink-2 hover:bg-line/[0.045] hover:text-ink',
              )}
            >
              <Star
                className={cn(
                  'size-3 shrink-0',
                  active ? 'fill-current text-accent' : 'fill-current text-muted/50',
                )}
                strokeWidth={1.9}
              />
              <span className="min-w-0 flex-1 truncate">{label}</span>
              {isFolderEntry(entry) ? (
                <RowCount count={getFolderStats(entry.id).total} active={active} />
              ) : (
                <span className="ml-auto shrink-0 text-[9px] text-muted/70">
                  {t('files.sidebar.file')}
                </span>
              )}
            </button>
          );
        })}

        <p className="eyebrow px-2 pb-1 pt-3">{t('files.sidebar.locations')}</p>
        {LOCATION_ROWS.map((row) => {
          const Icon = row.icon;
          const active = currentFolderId === row.id;
          const rowEntry = getFileEntry(row.id);
          const label = rowEntry ? tr(rowEntry.name) : row.id;
          return (
            <button
              key={row.id}
              type="button"
              data-testid={`files-location-${row.id}`}
              onClick={() => onNavigate(row.id)}
              aria-label={label}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'group flex w-full items-center gap-2 rounded-[10px] px-2 py-[7px] text-left text-[11.5px] transition-colors duration-150',
                active
                  ? 'bg-accent/[0.085] font-medium text-accent-strong'
                  : 'text-ink-2 hover:bg-line/[0.045] hover:text-ink',
              )}
            >
              <Icon
                className={cn('size-3.5 shrink-0', active ? 'text-accent' : 'text-muted/80')}
                strokeWidth={1.8}
              />
              <span className="min-w-0 flex-1 truncate">{label}</span>
              <RowCount count={getFolderStats(row.id).total} active={active} />
            </button>
          );
        })}
      </div>

      <div
        data-testid="files-storage"
        className="mt-2 shrink-0 rounded-[13px] border border-line/[0.06] bg-surface/50 p-2.5"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-ink-2">
            {t('files.sidebar.storage.title')}
          </span>
          <span className="tabular-nums text-[9.5px] text-muted">{storagePct}%</span>
        </div>
        <Progress
          value={storagePct}
          size="xs"
          tone="accent"
          className="mt-1.5"
          label={t('files.sidebar.storage.label')}
        />
        <p className="mt-1.5 text-[9px] tabular-nums leading-relaxed text-muted/85">
          {t('files.sidebar.storage.summary', {
            used: SYSTEM_SNAPSHOT.storageUsedGb,
            total: SYSTEM_SNAPSHOT.storageTotalGb,
          })}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[9px] leading-relaxed text-muted/85">
          <LockKeyhole className="size-2.5 shrink-0" />
          {t('files.footer.localOnly')}
        </p>
      </div>
    </aside>
  );
}
