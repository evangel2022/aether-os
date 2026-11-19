import type { Locale, LocalizedText } from '@/types';

/** Create a bilingual value with Chinese first, since Chinese is the default. */
export function localized(zh: string, en: string): LocalizedText {
  return {
    'zh-CN': zh,
    'en-US': en,
  };
}

/** Resolve a bilingual value for the active locale. */
export function localize(locale: Locale, value: LocalizedText): string {
  return value[locale] ?? value['zh-CN'];
}
