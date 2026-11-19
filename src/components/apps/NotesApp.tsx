import {
  Check,
  HardDrive,
  NotebookPen,
  PencilLine,
  Plus,
  StickyNote,
  Trash2,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { IconButton } from '@/components/ui/IconButton';
import { useI18n, type TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';

type SeedId = 'morningBrief' | 'quietIdeas' | 'weekendList';

interface DemoNote {
  id: string;
  seed?: SeedId;
  titleOverride?: string;
  bodyOverride?: string;
  updatedKey: TranslationKey;
}

interface SeededNoteDefinition {
  id: string;
  seed: SeedId;
}

const SEED_KEYS: Record<
  SeedId,
  { title: TranslationKey; body: TranslationKey; updated: TranslationKey }
> = {
  morningBrief: {
    title: 'notes.seed.morningBrief.title',
    body: 'notes.seed.morningBrief.body',
    updated: 'notes.seed.morningBrief.updated',
  },
  quietIdeas: {
    title: 'notes.seed.quietIdeas.title',
    body: 'notes.seed.quietIdeas.body',
    updated: 'notes.seed.quietIdeas.updated',
  },
  weekendList: {
    title: 'notes.seed.weekendList.title',
    body: 'notes.seed.weekendList.body',
    updated: 'notes.seed.weekendList.updated',
  },
};

const SEEDED_NOTES: SeededNoteDefinition[] = [
  { id: 'note-morning-brief', seed: 'morningBrief' },
  { id: 'note-quiet-ideas', seed: 'quietIdeas' },
  { id: 'note-weekend-list', seed: 'weekendList' },
];

const INITIAL_NOTES: DemoNote[] = SEEDED_NOTES.map((note) => ({
  id: note.id,
  seed: note.seed,
  updatedKey: SEED_KEYS[note.seed].updated,
}));

type SaveState = 'saved' | 'saving';

const JUST_NOW: TranslationKey = 'notes.updated.justNow';

function noteSnippet(body: string): string {
  return body.replace(/\s+/g, ' ').trim();
}

export function NotesApp() {
  const { t, isChinese } = useI18n();
  const [notes, setNotes] = useState<DemoNote[]>(INITIAL_NOTES);
  const [selectedId, setSelectedId] = useState<string | null>(INITIAL_NOTES[0]?.id ?? null);
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const [focusTitleId, setFocusTitleId] = useState<string | null>(null);
  const saveTimer = useRef<number | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const selected = notes.find((note) => note.id === selectedId) ?? null;

  const noteTitle = (note: DemoNote): string => {
    if (note.titleOverride !== undefined) return note.titleOverride;
    return note.seed ? t(SEED_KEYS[note.seed].title) : t('notes.untitled');
  };

  const noteBody = (note: DemoNote): string => {
    if (note.bodyOverride !== undefined) return note.bodyOverride;
    return note.seed ? t(SEED_KEYS[note.seed].body) : '';
  };

  const noteUpdated = (note: DemoNote): string => t(note.updatedKey);

  useEffect(() => {
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!focusTitleId || focusTitleId !== selectedId) return;
    titleRef.current?.focus();
    titleRef.current?.select();
    setFocusTitleId(null);
  }, [focusTitleId, selectedId]);

  const markSaving = () => {
    setSaveState('saving');
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      setSaveState('saved');
      saveTimer.current = null;
    }, 750);
  };

  const updateSelected = (patch: Pick<Partial<DemoNote>, 'titleOverride' | 'bodyOverride'>) => {
    if (!selectedId) return;
    setNotes((current) =>
      current.map((note) =>
        note.id === selectedId
          ? {
              ...note,
              ...(patch.titleOverride !== undefined
                ? { titleOverride: patch.titleOverride }
                : {}),
              ...(patch.bodyOverride !== undefined ? { bodyOverride: patch.bodyOverride } : {}),
              updatedKey: JUST_NOW,
            }
          : note,
      ),
    );
    markSaving();
  };

  const addNote = () => {
    const note: DemoNote = {
      id: `note-${Date.now().toString(36)}`,
      updatedKey: JUST_NOW,
    };
    setNotes((current) => [note, ...current]);
    setSelectedId(note.id);
    setFocusTitleId(note.id);
    markSaving();
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    const remaining = notes.filter((note) => note.id !== selectedId);
    setNotes(remaining);
    setSelectedId(remaining[0]?.id ?? null);
    markSaving();
  };

  const selectedBody = selected ? noteBody(selected) : '';
  const wordCount = selectedBody.trim()
    ? selectedBody.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = selectedBody.length;
  const wordLabel = t(wordCount === 1 ? 'notes.wordCountOne' : 'notes.wordCount', {
    count: wordCount,
  });
  const charLabel = t(charCount === 1 ? 'notes.charCountOne' : 'notes.charCount', {
    count: charCount,
  });

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden bg-surface/20"
      data-testid="notes-app"
    >
      <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-line/[0.07] bg-surface/40 px-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-[9px] bg-accent/10 text-accent-strong">
            <StickyNote className="size-[15px]" strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold leading-tight text-ink">
              {t('notes.title')}
              <Badge tone="demo" className="px-1.5 py-0 text-[8px] leading-4">
                {t('common.demo')}
              </Badge>
            </p>
            <p className="mt-0.5 text-[9px] leading-none text-muted">{t('notes.localOnly')}</p>
          </div>
        </div>
        <Button
          variant="soft"
          size="sm"
          leadingIcon={<Plus className="size-3.5" />}
          data-testid="notes-new"
          onClick={addNote}
        >
          {t('notes.newNote')}
        </Button>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[39%] min-w-[150px] max-w-[208px] shrink-0 flex-col border-r border-line/[0.07] bg-surface/25">
          <div className="flex items-center justify-between gap-2 px-3 pb-1.5 pt-2.5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">
              {t('notes.listTitle')}
            </p>
            <span className="rounded-full bg-line/[0.06] px-1.5 py-px text-[8.5px] font-medium tabular-nums text-muted">
              {notes.length}
            </span>
          </div>

          <div
            className="aether-scroll min-h-0 flex-1 overflow-y-auto px-1.5 pb-2"
            data-testid="notes-list"
          >
            {notes.length > 0 ? (
              <div className="space-y-0.5">
                {notes.map((note) => {
                  const isSelected = note.id === selectedId;
                  const title = noteTitle(note).trim() || t('notes.untitled');
                  return (
                    <button
                      key={note.id}
                      type="button"
                      aria-current={isSelected ? 'true' : undefined}
                      data-testid={`note-item-${note.id}`}
                      onClick={() => setSelectedId(note.id)}
                      className={cn(
                        'w-full rounded-[12px] px-2.5 py-2 text-left transition-colors duration-150',
                        isSelected
                          ? 'bg-accent/[0.09] shadow-[0_0_0_1px_rgb(var(--accent)/0.18)_inset]'
                          : 'hover:bg-line/[0.04]',
                      )}
                    >
                      <span className="flex items-baseline justify-between gap-2">
                        <span
                          className={cn(
                            'truncate text-[11.5px] font-medium leading-tight',
                            isSelected ? 'text-ink' : 'text-ink-2',
                          )}
                        >
                          {title}
                        </span>
                        <span className="shrink-0 text-[8px] tabular-nums text-muted/80">
                          {noteUpdated(note)}
                        </span>
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[9.5px] leading-[1.5] text-muted">
                        {noteSnippet(noteBody(note)) || t('notes.emptySnippet')}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="px-2 py-3 text-[10px] leading-relaxed text-muted">
                {t('notes.emptyList')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 border-t border-line/[0.06] px-3 py-1.5 text-[8.5px] text-muted">
            <HardDrive className="size-2.5 shrink-0" strokeWidth={1.9} aria-hidden />
            {t('notes.sessionOnly')}
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col bg-surface/20">
          {selected ? (
            <>
              <div className="flex h-8 shrink-0 items-center justify-between gap-2 border-b border-line/[0.05] px-4">
                <span
                  className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-muted"
                  data-testid="notes-save-status"
                  role="status"
                >
                  {saveState === 'saving' ? (
                    <>
                      <span className="size-1.5 animate-soft-pulse rounded-full bg-warning" aria-hidden />
                      {t('notes.savingLocally')}
                    </>
                  ) : (
                    <>
                      <Check className="size-3 text-positive" strokeWidth={2.4} aria-hidden />
                      {t('notes.savedLocally')}
                    </>
                  )}
                </span>
                <IconButton
                  label={t('notes.deleteNote')}
                  size="sm"
                  variant="ghost"
                  data-testid="note-delete"
                  onClick={deleteSelected}
                >
                  <Trash2 />
                </IconButton>
              </div>

              <div className="flex min-h-0 flex-1 flex-col px-4 pt-3.5">
                <input
                  ref={titleRef}
                  type="text"
                  aria-label={t('notes.titleAria')}
                  data-testid="note-title"
                  value={noteTitle(selected)}
                  onChange={(event) => updateSelected({ titleOverride: event.target.value })}
                  placeholder={t('notes.untitled')}
                  className="w-full bg-transparent text-[17px] font-semibold leading-tight tracking-[-0.02em] text-ink outline-none placeholder:text-muted/50"
                />
                <p className="mt-1 flex items-center gap-1.5 text-[9px] text-muted">
                  <PencilLine className="size-2.5 shrink-0" strokeWidth={1.9} aria-hidden />
                  {t('notes.edited', { time: noteUpdated(selected) })}
                </p>
                <textarea
                  aria-label={t('notes.bodyAria')}
                  data-testid="note-body"
                  value={noteBody(selected)}
                  onChange={(event) => updateSelected({ bodyOverride: event.target.value })}
                  placeholder={t('notes.bodyPlaceholder')}
                  spellCheck={false}
                  className="aether-scroll mt-3 min-h-0 w-full flex-1 resize-none bg-transparent text-[12px] leading-[1.75] text-ink-2 outline-none placeholder:text-muted/55"
                />
              </div>

              <div className="flex h-8 shrink-0 items-center justify-between gap-2 border-t border-line/[0.06] px-4 text-[9px] text-muted">
                <span className="tabular-nums">
                  {isChinese ? charLabel : `${wordLabel} · ${charLabel}`}
                </span>
                <span className="flex items-center gap-1">
                  <HardDrive className="size-2.5" strokeWidth={1.9} aria-hidden />
                  {t('notes.localDemo')}
                </span>
              </div>
            </>
          ) : (
            <div className="flex min-h-0 flex-1 items-center justify-center p-4">
              <EmptyState
                compact
                icon={NotebookPen}
                title={t('notes.emptyTitle')}
                description={t('notes.emptyDescription')}
                action={
                  <Button
                    variant="primary"
                    size="sm"
                    leadingIcon={<Plus className="size-3.5" />}
                    data-testid="notes-empty-new"
                    onClick={addNote}
                  >
                    {t('notes.newNote')}
                  </Button>
                }
                className="w-full"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
