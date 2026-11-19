import { expect, test } from '@playwright/test';
import { seedEnglishLocale } from './helpers';

function nav(page: import('@playwright/test').Page) {
  return page.getByRole('navigation', { name: 'Primary navigation' });
}

test.beforeEach(async ({ page }) => {
  await seedEnglishLocale(page);
  await page.goto('/');
  await expect(page.getByTestId('desktop-shell')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
});

test('navigates folders, previews a file and searches the demo drive', async ({ page }) => {
  await nav(page).getByRole('button', { name: 'Files', exact: true }).click();
  await expect(page.getByTestId('files-page')).toBeVisible();
  await expect(page.getByTestId('file-row-roadmap')).toBeVisible();

  await page.getByTestId('file-row-aether-prototype').click();
  await expect(page.getByTestId('file-row-window-manager')).toBeVisible();
  await expect(page.getByTestId('files-breadcrumbs')).toContainText('Aether Prototype');

  await page.getByTestId('files-back').click();
  await expect(page.getByTestId('file-row-roadmap')).toBeVisible();

  await page.getByRole('searchbox', { name: 'Search demo files' }).fill('agent');
  await expect(page.getByTestId('file-row-agent-trends')).toBeVisible();
  await page.getByTestId('file-row-agent-trends').click();
  await expect(page.getByTestId('file-preview')).toContainText('agent-trends.md');
});

test('filters, pins and pauses local demo memory', async ({ page }) => {
  await nav(page).getByRole('button', { name: 'Memory', exact: true }).click();
  await expect(page.getByTestId('memory-page')).toBeVisible();
  const cards = page.locator('[data-testid^="memory-card-"]');
  await expect(cards).toHaveCount(9);

  const filters = page.getByRole('group', { name: 'Filter memories by category' });
  await filters.getByRole('button', { name: /^Projects/ }).click();
  await expect(page.getByTestId('memory-card-m-02')).toBeVisible();
  await expect(page.getByTestId('memory-card-m-04')).toHaveCount(0);

  await filters.getByRole('button', { name: /^All/ }).click();
  await page.getByTestId('memory-pin-m-04').click();
  await expect(page.getByTestId('memory-pin-m-04')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('memory-count')).toContainText('5 pinned');

  await page.getByRole('switch', { name: 'Memory enabled' }).click();
  await expect(page.getByTestId('memory-paused')).toBeVisible();
  await expect(page.getByTestId('memory-grid')).toHaveCount(0);
  await page.getByTestId('memory-enable').click();
  await expect(page.getByTestId('memory-grid')).toBeVisible();
});

test('launches an app from the library and reflects window state', async ({ page }) => {
  await nav(page).getByRole('button', { name: 'Apps', exact: true }).click();
  await expect(page.getByTestId('apps-page')).toBeVisible();

  const filesCard = page.getByTestId('app-card-files');
  await filesCard.click();
  await expect(page.getByTestId('window-files')).toBeVisible();
  await expect(page.getByTestId('window-files').getByTestId('files-page')).toBeVisible();
  await expect(filesCard).toHaveAttribute('data-state', 'active');

  await page.getByTestId('window-files').getByRole('button', { name: 'Close Files' }).click();
  await expect(page.getByTestId('window-files')).toBeHidden();
  await expect(filesCard).toHaveAttribute('data-state', 'closed');
});

test('applies appearance settings and restores the demo defaults', async ({ page }) => {
  await nav(page).getByRole('button', { name: 'Settings', exact: true }).click();
  await expect(page.getByTestId('settings-page')).toBeVisible();

  await page.getByTestId('settings-theme-dark').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByTestId('settings-accent-iris').click();
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'iris');
  await page.getByTestId('settings-wallpaper-mist').click();
  await expect(page.locator('html')).toHaveAttribute('data-wallpaper', 'mist');

  await page.reload();
  await expect(page.getByTestId('desktop-shell')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'iris');
  await expect(page.locator('html')).toHaveAttribute('data-wallpaper', 'mist');

  await nav(page).getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByTestId('settings-tab-privacy').click();
  await page.getByTestId('settings-reset-start').click();
  await expect(page.getByTestId('settings-reset-confirm-panel')).toBeVisible();
  await page.getByTestId('settings-reset-confirm').click();
  await expect(page.getByTestId('settings-reset-success')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'blue');
  await expect(page.locator('html')).toHaveAttribute('data-wallpaper', 'dawn');
});

test('supports local notes and the simulated weather window', async ({ page }) => {
  await page.getByTestId('dock-notes').click();
  await expect(page.getByTestId('notes-app')).toBeVisible();
  await page.getByTestId('notes-new').click();
  await expect(page.getByTestId('note-title')).toBeVisible();
  await page.getByTestId('note-title').fill('A test thought');
  await expect(page.getByTestId('notes-save-status')).toContainText('Saved locally', {
    timeout: 3000,
  });
  await page.getByTestId('window-notes').getByRole('button', { name: 'Close Notes' }).click();
  await expect(page.getByTestId('window-notes')).toBeHidden();

  await page.getByTestId('dock-weather').click();
  await expect(page.getByTestId('weather-app')).toBeVisible();
  await expect(page.getByTestId('weather-temperature')).toContainText('18');
  await page.getByTestId('window-weather').getByRole('button', { name: 'Close Weather' }).click();
  await expect(page.getByTestId('window-weather')).toBeHidden();
});
