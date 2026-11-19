import type { Locale, LocalizedText } from '@/types';
import { enUS, type TranslationKey } from '@/i18n/messages/en';
import { zhCN } from '@/i18n/messages/zh';

export type { TranslationKey };

export type TranslationVars = Record<string, string | number>;

const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

function interpolate(template: string, vars?: TranslationVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    return value === undefined ? match : String(value);
  });
}

/** Translate a key for a locale. */
export function translate(
  locale: Locale,
  key: TranslationKey,
  vars?: TranslationVars,
): string {
  const template = dictionaries[locale][key] ?? enUS[key];
  return interpolate(template ?? key, vars);
}

/** Build the two localized variants of one message. */
export function translateAll(
  key: TranslationKey,
  vars?: TranslationVars,
): LocalizedText {
  return {
    'zh-CN': translate('zh-CN', key, vars),
    'en-US': translate('en-US', key, vars),
  };
}
