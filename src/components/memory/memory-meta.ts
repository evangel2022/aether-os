import { FolderKanban, MessagesSquare, ShieldCheck, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TranslationKey } from '@/i18n/translate';
import type { LocalizedText, MemoryCategory, MemoryFilter } from '@/types';

export interface MemoryCategoryMeta {
  /** Typed dictionary key for the category chip label. */
  labelKey: TranslationKey;
  /** Filter-pill label, capitalised for sentence-initial use. */
  pluralKey: TranslationKey;
  /** Lower-case variant used inside the result summary sentence. */
  sentenceKey: TranslationKey;
  /** One-line, human explanation reserved for filter tooltips. */
  hintKey: TranslationKey;
  icon: LucideIcon;
  chipClassName: string;
}

export const MEMORY_CATEGORY_META: Record<MemoryCategory, MemoryCategoryMeta> = {
  preference: {
    labelKey: 'memory.category.preference.label',
    pluralKey: 'memory.category.preference.plural',
    sentenceKey: 'memory.category.preference.sentence',
    hintKey: 'memory.category.preference.hint',
    icon: Sparkles,
    chipClassName: 'border-accent/15 bg-accent/[0.075] text-accent-strong',
  },
  project: {
    labelKey: 'memory.category.project.label',
    pluralKey: 'memory.category.project.plural',
    sentenceKey: 'memory.category.project.sentence',
    hintKey: 'memory.category.project.hint',
    icon: FolderKanban,
    chipClassName: 'border-[#7563e8]/20 bg-[#7563e8]/[0.08] text-[#7563e8]',
  },
  conversation: {
    labelKey: 'memory.category.conversation.label',
    pluralKey: 'memory.category.conversation.plural',
    sentenceKey: 'memory.category.conversation.sentence',
    hintKey: 'memory.category.conversation.hint',
    icon: MessagesSquare,
    chipClassName: 'border-positive/20 bg-positive/[0.08] text-positive',
  },
  system: {
    labelKey: 'memory.category.system.label',
    pluralKey: 'memory.category.system.plural',
    sentenceKey: 'memory.category.system.sentence',
    hintKey: 'memory.category.system.hint',
    icon: ShieldCheck,
    chipClassName: 'border-line/[0.12] bg-line/[0.05] text-ink-2',
  },
};

export const MEMORY_FILTER_ORDER: MemoryFilter[] = [
  'all',
  'preference',
  'project',
  'conversation',
  'system',
];

/** Every language variant of a data field, so search keeps working after a locale switch. */
export function localizedVariants(value: LocalizedText): string[] {
  return [value['zh-CN'], value['en-US']];
}
