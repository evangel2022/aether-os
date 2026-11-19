import { ChevronRight, FolderOpen, FolderSearch, LockKeyhole, MousePointerClick, Star, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { IconButton } from '@/components/ui/IconButton';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { FileEntry } from '@/types';
import { FileIcon } from './FileIcon';
import { FileImageArt } from './FileImageArt';
import {
  ROOT_FOLDER_ID,
  formatCount,
  getArtworkVariant,
  getEntryLocation,
  getFileEntry,
  getFileTypeMeta,
  getFolderChildren,
  getFolderStats,
  isFolderEntry,
} from './file-utils';

interface FilePreviewProps {
  currentFolder: FileEntry;
  selectedEntry: FileEntry | null;
  searching: boolean;
  onOpenFolder: (folderId: string) => void;
  onRevealFile: (entry: FileEntry) => void;
  onSelectFile: (entry: FileEntry) => void;
  onClearSelection: () => void;
}

function DemoFooter({ label }: { label: string }) {
  return (
    <div className="mt-auto flex items-start gap-1.5 pt-5 text-[9px] leading-relaxed text-muted">
      <LockKeyhole className="mt-[1px] size-2.5 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted/80">
        {label}
      </dt>
      <dd className="mt-0.5 truncate text-[10.5px] font-medium text-ink-2">{children}</dd>
    </div>
  );
}

function SelectedEntryPreview({
  entry,
  searching,
  onOpenFolder,
  onRevealFile,
  onClearSelection,
}: {
  entry: FileEntry;
  searching: boolean;
  onOpenFolder: (folderId: string) => void;
  onRevealFile: (entry: FileEntry) => void;
  onClearSelection: () => void;
}) {
  const { t, tr, locale } = useI18n();
  const folder = isFolderEntry(entry);
  const meta = getFileTypeMeta(entry.type);
  const stats = folder ? getFolderStats(entry.id) : null;
  const location = getEntryLocation(entry, locale);
  const name = tr(entry.name);
  const typeLabel = t(meta.labelKey);
  const itemCountLabel = folder
    ? formatCount(t, stats?.total ?? 0, 'files.count.item.one', 'files.count.item.other')
    : null;
  const sizeLabel =
    entry.size ?? (folder && stats ? itemCountLabel : '—');

  return (
    <div key={entry.id} className="flex flex-1 animate-fade-up flex-col">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{t('files.preview.title')}</p>
        <IconButton
          label={t('files.preview.clear')}
          data-testid="file-preview-close"
          size="sm"
          onClick={onClearSelection}
        >
          <X />
        </IconButton>
      </div>

      {entry.type === 'image' ? (
        <div className="mt-2 overflow-hidden rounded-[14px] border border-line/[0.08] shadow-[0_10px_24px_-22px_rgb(var(--shadow-tint)/0.5)]">
          <div className="aspect-[16/10]">
            <FileImageArt
              variant={getArtworkVariant(entry.id)}
              className="h-full w-full"
            />
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <FileIcon entry={entry} size="lg" />
        </div>
      )}

      <h2 className="mt-3 break-words text-[14.5px] font-semibold leading-snug tracking-[-0.02em] text-ink">
        {name}
      </h2>
      <p className="mt-1 flex items-center gap-1.5 text-[9.5px] leading-relaxed text-muted">
        <span className="truncate">{location}</span>
      </p>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <Badge tone="neutral">{typeLabel}</Badge>
        {entry.starred && (
          <Badge tone="neutral">
            <Star className="size-2.5 fill-current text-accent/80" aria-hidden="true" />
            {t('files.starred')}
          </Badge>
        )}
        {folder && stats && <Badge tone="neutral">{itemCountLabel}</Badge>}
      </div>

      <dl className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2.5 rounded-[13px] border border-line/[0.06] bg-surface/55 p-3">
        <Fact label={t('files.preview.fact.type')}>{typeLabel}</Fact>
        <Fact label={t('files.preview.fact.modified')}>{tr(entry.modified)}</Fact>
        <Fact label={t('files.preview.fact.size')}>{sizeLabel}</Fact>
        <Fact label={t('files.preview.fact.origin')}>{t('files.preview.originDemo')}</Fact>
      </dl>

      {entry.excerpt && (
        <div className="mt-4">
          <p className="eyebrow">
            {entry.type === 'image'
              ? t('files.preview.imageAbout')
              : entry.type === 'code'
                ? t('files.preview.codeExcerpt')
                : t('files.preview.contents')}
          </p>
          <div
            className={cn(
              'aether-scroll mt-2 max-h-[190px] overflow-y-auto rounded-[12px] border border-line/[0.06] bg-surface/60 p-3 text-[10.5px] leading-[1.7] text-ink-2',
              entry.type === 'code'
                ? 'whitespace-pre-wrap font-mono text-[10px] leading-[1.65]'
                : 'whitespace-pre-line',
            )}
          >
            {tr(entry.excerpt)}
          </div>
          {entry.type === 'image' && (
            <p className="mt-1.5 text-[9px] italic leading-relaxed text-muted/80">
              {t('files.preview.imageNote')}
            </p>
          )}
        </div>
      )}

      {(folder || searching) && (
        <div className="mt-4">
          {folder ? (
            <Button
              size="sm"
              fullWidth
              data-testid="file-preview-open"
              leadingIcon={<FolderOpen className="size-3.5" />}
              onClick={() => onOpenFolder(entry.id)}
            >
              {t('files.preview.openFolder')}
            </Button>
          ) : (
            <Button
              size="sm"
              fullWidth
              variant="secondary"
              data-testid="file-preview-reveal"
              leadingIcon={<FolderSearch className="size-3.5" />}
              onClick={() => onRevealFile(entry)}
            >
              {t('files.preview.showInFolder')}
            </Button>
          )}
        </div>
      )}

      <DemoFooter label={t('files.preview.demoFooter')} />
    </div>
  );
}

function FolderOverview({
  folder,
  searching,
  onOpenFolder,
  onSelectFile,
}: {
  folder: FileEntry;
  searching: boolean;
  onOpenFolder: (folderId: string) => void;
  onSelectFile: (entry: FileEntry) => void;
}) {
  const { t, tr, locale } = useI18n();
  const stats = getFolderStats(folder.id);
  const children = getFolderChildren(folder.id, locale).slice(0, 4);
  const driveEntry = getFileEntry(ROOT_FOLDER_ID);
  const driveName = driveEntry ? tr(driveEntry.name) : '';
  const folderName = tr(folder.name);

  if (searching) {
    return (
      <div className="flex flex-1 flex-col">
        <p className="eyebrow">{t('files.preview.title')}</p>
        <EmptyState
          compact
          icon={MousePointerClick}
          title={t('files.preview.emptyTitle')}
          description={t('files.preview.emptyDescription')}
          className="mt-3 border-0 bg-transparent px-2 py-8"
        />
        <p className="mt-1 px-2 text-[9.5px] leading-relaxed text-muted/80">
          {t('files.preview.searchingNote', {
            drive: driveName,
            count: formatCount(
              t,
              stats.total,
              'files.count.item.one',
              'files.count.item.other',
            ),
            folder: folderName,
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{t('files.preview.currentFolder')}</p>
      </div>

      <div className="mt-3">
        <FileIcon entry={folder} size="lg" />
      </div>

      <h2 className="mt-3 break-words text-[14.5px] font-semibold leading-snug tracking-[-0.02em] text-ink">
        {folderName}
      </h2>
      <p className="mt-1 text-[9.5px] text-muted">{getEntryLocation(folder, locale)}</p>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <Badge tone="neutral">
          {formatCount(t, stats.folders, 'files.count.folder.one', 'files.count.folder.other')}
        </Badge>
        <Badge tone="neutral">
          {formatCount(t, stats.files, 'files.count.file.one', 'files.count.file.other')}
        </Badge>
        <Badge tone="neutral">
          {t('files.preview.updated', { date: tr(folder.modified) })}
        </Badge>
      </div>

      <p className="mt-3 text-[10.5px] leading-relaxed text-ink-2">
        {t('files.preview.description', { drive: driveName })}
      </p>

      {children.length > 0 && (
        <div className="mt-4">
          <p className="eyebrow">{t('files.preview.inThisFolder')}</p>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {children.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => {
                  if (isFolderEntry(child)) {
                    onOpenFolder(child.id);
                  } else {
                    onSelectFile(child);
                  }
                }}
                className="group flex w-full items-center gap-2 rounded-[9px] px-1.5 py-1.5 text-left transition-colors duration-150 hover:bg-line/[0.045]"
              >
                <FileIcon entry={child} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[10.5px] text-ink-2 group-hover:text-ink">
                  {tr(child.name)}
                </span>
                <ChevronRight
                  className="size-3 shrink-0 text-muted/55 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <DemoFooter label={t('files.preview.folderFooter')} />
    </div>
  );
}

export function FilePreview({
  currentFolder,
  selectedEntry,
  searching,
  onOpenFolder,
  onRevealFile,
  onSelectFile,
  onClearSelection,
}: FilePreviewProps) {
  const { t } = useI18n();

  return (
    <aside
      data-testid="file-preview"
      aria-label={t('files.preview.aria')}
      className="hidden w-[272px] shrink-0 flex-col border-l border-line/[0.06] bg-surface-alt/25 lg:flex xl:w-[292px]"
    >
      <div className="aether-scroll flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
        {selectedEntry ? (
          <SelectedEntryPreview
            entry={selectedEntry}
            searching={searching}
            onOpenFolder={onOpenFolder}
            onRevealFile={onRevealFile}
            onClearSelection={onClearSelection}
          />
        ) : (
          <FolderOverview
            folder={currentFolder}
            searching={searching}
            onOpenFolder={onOpenFolder}
            onSelectFile={onSelectFile}
          />
        )}
      </div>
    </aside>
  );
}
