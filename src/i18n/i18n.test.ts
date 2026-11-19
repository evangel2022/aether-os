import { describe, expect, it } from 'vitest';
import { AGENTS } from '@/data/agents';
import { APP_DEFINITIONS } from '@/data/apps';
import { DEMO_FILES } from '@/data/files';
import { INITIAL_MEMORIES } from '@/data/memories';
import { NAVIGATION } from '@/data/navigation';
import { INITIAL_NOTIFICATIONS } from '@/data/notifications';
import { DEMO_WEATHER, SYSTEM_SNAPSHOT } from '@/data/system';
import { INITIAL_TASKS } from '@/data/tasks';
import { localize, localized } from '@/i18n/localized';
import { enUS, type TranslationKey } from '@/i18n/messages/en';
import { zhCN } from '@/i18n/messages/zh';
import { translate } from '@/i18n/translate';
import { DEFAULT_LOCALE, LOCALES, type LocalizedText } from '@/types';

interface LocalizedEntry {
  path: string;
  value: LocalizedText;
}

function collectLocalizedText(
  value: unknown,
  path: string,
  found: LocalizedEntry[],
): void {
  if (!value || typeof value !== 'object') return;

  const candidate = value as Partial<LocalizedText>;
  if (
    typeof candidate['zh-CN'] === 'string' &&
    typeof candidate['en-US'] === 'string'
  ) {
    found.push({ path, value: candidate as LocalizedText });
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectLocalizedText(item, `${path}[${index}]`, found),
    );
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    collectLocalizedText(child, `${path}.${key}`, found);
  }
}

describe('i18n dictionary', () => {
  it('uses Simplified Chinese as the first-run default', () => {
    expect(DEFAULT_LOCALE).toBe('zh-CN');
    expect(LOCALES).toEqual(['zh-CN', 'en-US']);
  });

  it('keeps complete, typed key parity between English and Chinese', () => {
    const enKeys = (Object.keys(enUS) as TranslationKey[]).sort();
    const zhKeys = (Object.keys(zhCN) as TranslationKey[]).sort();
    expect(zhKeys).toEqual(enKeys);
    expect(enKeys.length).toBeGreaterThan(250);

    // This suffix is intentionally empty in English: "Results for {query}" is
    // composed from a prefix, the query, and an optional locale-specific suffix.
    const optionalSuffixKeys = new Set<TranslationKey>(['files.list.resultsSuffix']);

    for (const key of enKeys) {
      if (!optionalSuffixKeys.has(key)) {
        expect(enUS[key].trim(), `English message for ${key}`).not.toBe('');
      }
      expect(zhCN[key].trim(), `Chinese message for ${key}`).not.toBe('');
    }
  });

  it('keeps interpolation placeholders in sync between locales', () => {
    const placeholders = (template: string) =>
      [...template.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

    for (const key of Object.keys(enUS) as TranslationKey[]) {
      expect(placeholders(zhCN[key]), `placeholders for ${key}`).toEqual(
        placeholders(enUS[key]),
      );
    }
  });

  it('translates and interpolates for the active locale', () => {
    expect(translate('zh-CN', 'common.close')).toBe('关闭');
    expect(translate('en-US', 'common.close')).toBe('Close');
    expect(translate('zh-CN', 'shell.profile.name')).toBe('陈艾薇');
    expect(
      translate('zh-CN', 'home.summary', { working: 2, waiting: 1 }),
    ).toContain('2 个智能体');
    expect(
      translate('en-US', 'home.summary', { working: 2, waiting: 1 }),
    ).toContain('2 agents');
  });

  it('resolves bilingual data without leaking the other language', () => {
    const value = localized('文件', 'Files');
    expect(localize('zh-CN', value)).toBe('文件');
    expect(localize('en-US', value)).toBe('Files');
  });
});

describe('bilingual demo data', () => {
  it('provides both languages for every localized demo-data field', () => {
    const entries: LocalizedEntry[] = [];
    collectLocalizedText(
      {
        agents: AGENTS,
        tasks: INITIAL_TASKS,
        files: DEMO_FILES,
        memories: INITIAL_MEMORIES,
        notifications: INITIAL_NOTIFICATIONS,
        navigation: NAVIGATION,
        apps: APP_DEFINITIONS,
        weather: DEMO_WEATHER,
        system: SYSTEM_SNAPSHOT,
      },
      'data',
      entries,
    );

    expect(entries.length).toBeGreaterThan(300);
    for (const entry of entries) {
      expect(entry.value['zh-CN'].trim(), `${entry.path} zh-CN`).not.toBe('');
      expect(entry.value['en-US'].trim(), `${entry.path} en-US`).not.toBe('');
    }
  });

  it('does not leak Chinese copy into English demo data', () => {
    const entries: LocalizedEntry[] = [];
    collectLocalizedText(
      {
        agents: AGENTS,
        tasks: INITIAL_TASKS,
        files: DEMO_FILES,
        memories: INITIAL_MEMORIES,
        notifications: INITIAL_NOTIFICATIONS,
        navigation: NAVIGATION,
        apps: APP_DEFINITIONS,
        weather: DEMO_WEATHER,
      },
      'data',
      entries,
    );

    for (const entry of entries) {
      expect(entry.value['en-US'], `${entry.path} English`).not.toMatch(
        /[\u3400-\u9fff]/,
      );
    }
  });
});
