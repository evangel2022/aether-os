import type { Page } from '@playwright/test';

export const SETTINGS_STORAGE_KEY = 'aether-os-demo-settings-v1';

/**
 * Keep the original UI interaction suite deterministic and in English while
 * the product default is Simplified Chinese. Other stored preferences (theme,
 * accent, wallpaper, toggles) are preserved.
 */
export async function seedEnglishLocale(page: Page): Promise<void> {
  await page.addInitScript((storageKey: string) => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const parsed: Record<string, unknown> = raw
        ? (JSON.parse(raw) as Record<string, unknown>)
        : {};
      parsed.language = 'en-US';
      window.localStorage.setItem(storageKey, JSON.stringify(parsed));
    } catch {
      // localStorage may be unavailable; the app still defaults to zh-CN.
    }
  }, SETTINGS_STORAGE_KEY);
}
