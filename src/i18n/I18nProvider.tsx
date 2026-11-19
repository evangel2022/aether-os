import { useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { I18nContext, type I18nContextValue } from '@/i18n/context';
import { localize } from '@/i18n/localized';
import { translate, type TranslationKey, type TranslationVars } from '@/i18n/translate';
import { useSettings } from '@/state/settings';
import type { Locale, LocalizedText } from '@/types';

export function I18nProvider({ children }: { children: ReactNode }) {
  const { settings, updateSetting } = useSettings();
  const locale = settings.language;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translate(locale, 'meta.title');
  }, [locale]);

  const t = useCallback(
    (key: TranslationKey, vars?: TranslationVars) => translate(locale, key, vars),
    [locale],
  );
  const tr = useCallback((value: LocalizedText) => localize(locale, value), [locale]);
  const setLocale = useCallback(
    (nextLocale: Locale) => updateSetting('language', nextLocale),
    [updateSetting],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, tr, isChinese: locale === 'zh-CN' }),
    [locale, setLocale, t, tr],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
