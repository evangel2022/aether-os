import { createContext } from 'react';
import type { TranslationKey, TranslationVars } from '@/i18n/translate';
import type { Locale, LocalizedText } from '@/types';

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: TranslationVars) => string;
  /** Translate a data field that carries both Chinese and English copy. */
  tr: (value: LocalizedText) => string;
  isChinese: boolean;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
