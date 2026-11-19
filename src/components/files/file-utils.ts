import {
  Archive,
  AudioLines,
  Database,
  FileCode2,
  FileText,
  Folder,
  Image as ImageIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { localize } from '@/i18n/localized';
import { translate, type TranslationKey, type TranslationVars } from '@/i18n/translate';
import { DEMO_FILES } from '@/data/files';
import { DEFAULT_LOCALE, type FileEntry, type FileType, type Locale } from '@/types';

/** The simulated drive root. Every entry below it is demo data. */
export const ROOT_FOLDER_ID = 'drive';

export interface FileTypeMeta {
  /** Typed dictionary key for the visible file-type label. */
  labelKey: TranslationKey;
  icon: LucideIcon;
  /** Icon chip styling used in lists, grids and previews. */
  chipClassName: string;
}

export const FILE_TYPE_META: Record<FileType, FileTypeMeta> = {
  folder: {
    labelKey: 'files.type.folder',
    icon: Folder,
    chipClassName: 'border-accent/15 bg-accent/[0.09] text-accent-strong',
  },
  document: {
    labelKey: 'files.type.document',
    icon: FileText,
    chipClassName: 'border-line/[0.09] bg-line/[0.045] text-ink-2',
  },
  code: {
    labelKey: 'files.type.code',
    icon: FileCode2,
    chipClassName: 'border-[#7563e8]/15 bg-[#7563e8]/[0.08] text-[#7563e8]',
  },
  image: {
    labelKey: 'files.type.image',
    icon: ImageIcon,
    chipClassName: 'border-positive/15 bg-positive/[0.08] text-positive',
  },
  archive: {
    labelKey: 'files.type.archive',
    icon: Archive,
    chipClassName: 'border-warning/20 bg-warning/[0.08] text-warning',
  },
  audio: {
    labelKey: 'files.type.audio',
    icon: AudioLines,
    chipClassName: 'border-positive/15 bg-positive/[0.08] text-positive',
  },
  data: {
    labelKey: 'files.type.data',
    icon: Database,
    chipClassName: 'border-line/[0.09] bg-line/[0.045] text-ink-2',
  },
};

const ENTRIES_BY_ID = new Map(DEMO_FILES.map((entry) => [entry.id, entry]));

/** Translator signature shared by `useI18n().t`. */
export type TranslateFn = (key: TranslationKey, vars?: TranslationVars) => string;

/** Pick the singular or plural message for a count. */
export function formatCount(
  t: TranslateFn,
  count: number,
  singularKey: TranslationKey,
  pluralKey: TranslationKey,
): string {
  return t(count === 1 ? singularKey : pluralKey, { count });
}

export function getFileEntry(id: string | null | undefined): FileEntry | undefined {
  if (!id) return undefined;
  return ENTRIES_BY_ID.get(id);
}

export function getFileTypeMeta(type: FileType): FileTypeMeta {
  return FILE_TYPE_META[type];
}

export function isFolderEntry(entry: FileEntry): boolean {
  return entry.type === 'folder';
}

function compareEntries(a: FileEntry, b: FileEntry, locale: Locale): number {
  const aFolder = isFolderEntry(a);
  const bFolder = isFolderEntry(b);
  if (aFolder !== bFolder) return aFolder ? -1 : 1;
  return localize(locale, a.name).localeCompare(localize(locale, b.name), locale, {
    sensitivity: 'base',
  });
}

/** Direct children of a folder: folders first, then files, each alphabetised. */
export function getFolderChildren(
  folderId: string,
  locale: Locale = DEFAULT_LOCALE,
): FileEntry[] {
  return DEMO_FILES.filter((entry) => entry.parentId === folderId).sort((a, b) =>
    compareEntries(a, b, locale),
  );
}

/** Ordered folder chain from the drive root down to `folderId`. */
export function getFolderChain(folderId: string): FileEntry[] {
  const chain: FileEntry[] = [];
  let current = getFileEntry(folderId);
  let guard = 0;
  while (current && guard < 16) {
    chain.unshift(current);
    current = getFileEntry(current.parentId);
    guard += 1;
  }
  return chain;
}

/** Breadcrumb-ready ancestors (root → current folder). */
export function getBreadcrumbs(folderId: string): FileEntry[] {
  return getFolderChain(folderId);
}

export interface FolderStats {
  folders: number;
  files: number;
  total: number;
}

export function getFolderStats(folderId: string): FolderStats {
  const children = getFolderChildren(folderId);
  const folders = children.filter(isFolderEntry).length;
  return { folders, files: children.length - folders, total: children.length };
}

/**
 * Location label for a search result / selected file, e.g. "Aether Drive / Projects".
 * Excludes the entry's own name.
 */
export function getEntryLocation(entry: FileEntry, locale: Locale = DEFAULT_LOCALE): string {
  if (!entry.parentId) return localize(locale, entry.name);
  const chain = getFolderChain(entry.parentId);
  return chain.map((folder) => localize(locale, folder.name)).join(' / ');
}

const MAX_SEARCH_RESULTS = 40;

/** Number of hand-drawn abstract compositions used for demo images. */
export const ARTWORK_VARIANTS = 4;

/** Deterministic placeholder selection so a demo image keeps the same art. */
export function getArtworkVariant(seed: string): number {
  let hash = 0;
  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) % 9973;
  }
  return hash % ARTWORK_VARIANTS;
}

export interface FileSearchMatch {
  entry: FileEntry;
  /** Lower is a better match. */
  score: number;
}

function matchesStart(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().startsWith(needle);
}

function matchesPart(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle);
}

/**
 * Global demo search across names, excerpts and file types — not limited to the
 * open folder. Search runs against the active locale first and falls back to the
 * other language, so a query typed before switching locales still finds results.
 * The root folder itself is never a result.
 */
export function searchFileEntries(
  query: string,
  locale: Locale = DEFAULT_LOCALE,
): FileSearchMatch[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const fallbackLocale: Locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
  const matches: FileSearchMatch[] = [];

  for (const entry of DEMO_FILES) {
    if (entry.id === ROOT_FOLDER_ID) continue;

    const names = [localize(locale, entry.name), localize(fallbackLocale, entry.name)];
    const excerpts = entry.excerpt
      ? [localize(locale, entry.excerpt), localize(fallbackLocale, entry.excerpt)]
      : [];
    const typeLabels = [
      translate(locale, FILE_TYPE_META[entry.type].labelKey),
      translate(fallbackLocale, FILE_TYPE_META[entry.type].labelKey),
    ];

    let score = -1;
    if (matchesStart(names[0], normalized)) {
      score = 0;
    } else if (matchesPart(names[0], normalized)) {
      score = 1;
    } else if (excerpts.some((excerpt) => matchesPart(excerpt, normalized))) {
      score = 2;
    } else if (matchesPart(typeLabels[0], normalized)) {
      score = 3;
    } else if (matchesStart(names[1], normalized)) {
      score = 4;
    } else if (matchesPart(names[1], normalized)) {
      score = 5;
    } else if (matchesPart(typeLabels[1], normalized)) {
      score = 6;
    }

    if (score >= 0) matches.push({ entry, score });
  }

  return matches
    .sort(
      (a, b) =>
        a.score - b.score ||
        localize(locale, a.entry.name).localeCompare(
          localize(locale, b.entry.name),
          locale,
          { sensitivity: 'base' },
        ),
    )
    .slice(0, MAX_SEARCH_RESULTS);
}
