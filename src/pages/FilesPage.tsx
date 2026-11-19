import { ChevronLeft, FolderOpen, LockKeyhole, RotateCcw, SearchX } from 'lucide-react';
import { useState } from 'react';
import { FileGrid } from '@/components/files/FileGrid';
import { FileList } from '@/components/files/FileList';
import { FilePreview } from '@/components/files/FilePreview';
import { FileSidebar } from '@/components/files/FileSidebar';
import { FileToolbar, type FileView } from '@/components/files/FileToolbar';
import {
  ROOT_FOLDER_ID,
  formatCount,
  getBreadcrumbs,
  getFileEntry,
  getFolderChildren,
  getFolderStats,
  searchFileEntries,
} from '@/components/files/file-utils';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { DEMO_FILES, STARTER_FOLDER_ID } from '@/data/files';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { FileEntry } from '@/types';

export function FilesPage({ embedded = false }: { embedded?: boolean }) {
  const { t, tr, locale } = useI18n();
  const [currentFolderId, setCurrentFolderId] = useState(STARTER_FOLDER_ID);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<FileView>('list');

  const currentFolder =
    getFileEntry(currentFolderId) ?? getFileEntry(ROOT_FOLDER_ID) ?? DEMO_FILES[0];
  const selectedEntry = getFileEntry(selectedId) ?? null;
  const parentFolder = getFileEntry(currentFolder.parentId);
  const trimmedQuery = query.trim();
  const searching = trimmedQuery.length > 0;
  const entries: FileEntry[] = searching
    ? searchFileEntries(trimmedQuery, locale).map((match) => match.entry)
    : getFolderChildren(currentFolder.id, locale);
  const breadcrumbs = getBreadcrumbs(currentFolder.id);
  const folderStats = getFolderStats(currentFolder.id);

  const navigateTo = (folderId: string, selectId: string | null = null) => {
    const folder = getFileEntry(folderId);
    if (!folder || folder.type !== 'folder') return;
    setCurrentFolderId(folder.id);
    setSelectedId(selectId);
    setQuery('');
  };

  const handleSelect = (entry: FileEntry) => {
    setSelectedId(entry.id);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    // Leaving search returns to the folder, where a search-only selection would be stale.
    if (!value.trim()) setSelectedId(null);
  };

  const handleOpenFolder = (entry: FileEntry) => {
    navigateTo(entry.id);
  };

  const handleReveal = (entry: FileEntry) => {
    if (!entry.parentId) return;
    setCurrentFolderId(entry.parentId);
    setSelectedId(entry.id);
    setQuery('');
  };

  const handleBack = () => {
    if (parentFolder) navigateTo(parentFolder.id);
  };

  const resetSearch = () => {
    setQuery('');
    setSelectedId(null);
  };

  return (
    <div
      data-testid="files-page"
      className={cn(
        'aether-scroll h-full overflow-y-auto page-pad',
        embedded ? 'pb-4 pt-4' : 'pb-7 pt-7',
      )}
    >
      <div
        className={cn(
          'flex h-full flex-col',
          embedded ? 'min-h-0' : 'min-h-[520px]',
        )}
      >
        {!embedded && (
          <PageHeader
            className="shrink-0"
            eyebrow={t('files.eyebrow')}
            title={t('files.title')}
            description={t('files.description')}
            actions={
              <div className="flex items-center gap-2">
                <Badge tone="neutral" className="hidden sm:inline-flex">
                  <LockKeyhole className="size-2.5" aria-hidden="true" />
                  {t('common.localOnly')}
                </Badge>
                <DemoBadge />
              </div>
            }
          />
        )}

        <section
          aria-label={t('files.browser')}
          data-testid="files-browser"
          className={cn(
            'flex min-h-0 flex-1 overflow-hidden rounded-[22px] border border-line/[0.075] bg-surface/45 shadow-[0_24px_48px_-40px_rgb(var(--shadow-tint)/0.5)] backdrop-blur-sm',
            embedded ? 'mt-0' : 'mt-4',
          )}
        >
          <FileSidebar
            currentFolderId={currentFolder.id}
            selectedId={selectedId}
            onNavigate={navigateTo}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <FileToolbar
              crumbs={breadcrumbs}
              canGoBack={Boolean(parentFolder)}
              itemCount={entries.length}
              searching={searching}
              query={query}
              view={view}
              onBack={handleBack}
              onCrumbClick={(folderId) => navigateTo(folderId)}
              onQueryChange={handleQueryChange}
              onViewChange={setView}
            />

            <div className="flex min-h-0 flex-1">
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="aether-scroll min-h-0 flex-1 overflow-y-auto">
                  {entries.length === 0 ? (
                    searching ? (
                      <div className="p-4" data-testid="files-search-empty">
                        <EmptyState
                          icon={SearchX}
                          title={t('files.empty.search.title', { query: trimmedQuery })}
                          description={t('files.empty.search.description')}
                          action={
                            <Button
                              size="sm"
                              variant="secondary"
                              data-testid="files-reset-search"
                              leadingIcon={<RotateCcw className="size-3.5" />}
                              onClick={resetSearch}
                            >
                              {t('files.empty.search.action')}
                            </Button>
                          }
                        />
                      </div>
                    ) : (
                      <div className="p-4" data-testid="files-folder-empty">
                        <EmptyState
                          icon={FolderOpen}
                          title={t('files.empty.folder.title')}
                          description={t('files.empty.folder.description')}
                          action={
                            parentFolder ? (
                              <Button
                                size="sm"
                                variant="secondary"
                                leadingIcon={<ChevronLeft className="size-3.5" />}
                                onClick={handleBack}
                              >
                                {t('files.empty.folder.action')}
                              </Button>
                            ) : undefined
                          }
                        />
                      </div>
                    )
                  ) : view === 'list' ? (
                    <FileList
                      entries={entries}
                      mode={searching ? 'search' : 'browse'}
                      query={trimmedQuery}
                      selectedId={selectedId}
                      onSelect={handleSelect}
                      onOpenFolder={handleOpenFolder}
                    />
                  ) : (
                    <FileGrid
                      entries={entries}
                      mode={searching ? 'search' : 'browse'}
                      selectedId={selectedId}
                      onSelect={handleSelect}
                      onOpenFolder={handleOpenFolder}
                    />
                  )}
                </div>

                <div className="flex h-[30px] shrink-0 items-center justify-between gap-3 border-t border-line/[0.05] px-3 text-[9.5px] leading-none text-muted">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <LockKeyhole className="size-2.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{t('files.footer.localOnly')}</span>
                  </span>
                  <span className="shrink-0 tabular-nums text-muted/85">
                    {searching
                      ? t(
                          entries.length === 1
                            ? 'files.footer.search.one'
                            : 'files.footer.search.other',
                          { count: entries.length },
                        )
                      : t('files.footer.stats', {
                          folders: formatCount(
                            t,
                            folderStats.folders,
                            'files.count.folder.one',
                            'files.count.folder.other',
                          ),
                          files: formatCount(
                            t,
                            folderStats.files,
                            'files.count.file.one',
                            'files.count.file.other',
                          ),
                        })}
                  </span>
                </div>
              </div>

              <FilePreview
                currentFolder={currentFolder}
                selectedEntry={selectedEntry}
                searching={searching}
                onOpenFolder={(folderId) => navigateTo(folderId)}
                onRevealFile={handleReveal}
                onSelectFile={handleSelect}
                onClearSelection={() => setSelectedId(null)}
              />
            </div>
          </div>
        </section>

        <p className="sr-only" aria-live="polite">
          {searching
            ? t(
                entries.length === 1 ? 'files.sr.search.one' : 'files.sr.search.other',
                { count: entries.length, query: trimmedQuery },
              )
            : t(entries.length === 1 ? 'files.sr.folder.one' : 'files.sr.folder.other', {
                folder: tr(currentFolder.name),
                count: entries.length,
              })}
        </p>
      </div>
    </div>
  );
}
