import { expect, test } from '@playwright/test';
import { seedEnglishLocale } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedEnglishLocale(page);
  await page.goto('/');
  await expect(page.getByTestId('desktop-shell')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
});

test('boots the desktop and navigates the core pages', async ({ page }) => {
  await expect(page.getByTestId('home-command-input')).toBeVisible();
  await expect(page.getByRole('toolbar', { name: 'Dock' })).toBeVisible();

  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  await nav.getByRole('button', { name: 'Agents', exact: true }).click();
  await expect(page.getByTestId('agents-page')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Agents', level: 1 })).toBeVisible();

  await nav.getByRole('button', { name: 'Tasks', exact: true }).click();
  await expect(page.getByTestId('tasks-page')).toBeVisible();

  await nav.getByRole('button', { name: 'Command', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Command Center', level: 1 })).toBeVisible();
});

test('simulates a command from Home and adds a demo task', async ({ page }) => {
  const prompt = 'Plan a calm three-day launch moment for Aether OS';
  await page.getByTestId('home-command-input').fill(prompt);
  await page.getByTestId('home-command-submit').click();

  await expect(page.getByRole('heading', { name: 'Command Center', level: 1 })).toBeVisible();
  const plan = page.getByTestId('command-plan');
  await expect(plan).toBeVisible();
  await expect(plan).toContainText('Simulated plan');
  await expect(plan).toContainText('No model called');
  await expect(plan.getByText('Ready for review')).toBeVisible({ timeout: 10_000 });
  await expect(plan).toContainText('Nothing was executed by a real agent');

  await page.getByRole('button', { name: 'Open in Tasks' }).click();
  await expect(page.getByTestId('tasks-page')).toBeVisible();
  await expect(page.getByTestId('task-list')).toContainText(
    'Plan a calm three-day launch moment for Aether OS',
  );
  await expect(page.getByTestId('task-list')).toContainText('Simulated plan');
});

test('stops a simulated Command Center plan before completion', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  await nav.getByRole('button', { name: 'Command', exact: true }).click();

  await page.getByTestId('command-input').fill('Audit the window manager for edge cases');
  await page.getByTestId('command-submit').click();
  const plan = page.getByTestId('command-plan');
  await expect(plan).toBeVisible();
  await expect(plan.getByText('Simulating locally')).toBeVisible();
  await plan.getByRole('button', { name: 'Stop' }).click();
  await expect(plan.getByText('Stopped', { exact: true })).toBeVisible();
  await expect(plan).toContainText('This simulation was stopped');
});

test('opens, drags, pins, minimizes, restores and closes windows', async ({ page }) => {
  await page.getByTestId('dock-files').click();
  const filesWindow = page.getByTestId('window-files');
  await expect(filesWindow).toBeVisible();
  await page.waitForTimeout(450);

  const before = await filesWindow.boundingBox();
  expect(before).not.toBeNull();
  const titlebar = page.getByTestId('window-titlebar-files');
  const titlebarBox = await titlebar.boundingBox();
  expect(titlebarBox).not.toBeNull();
  if (!before || !titlebarBox) return;

  await page.mouse.move(titlebarBox.x + titlebarBox.width * 0.5, titlebarBox.y + titlebarBox.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(
    titlebarBox.x + titlebarBox.width * 0.5 + 70,
    titlebarBox.y + titlebarBox.height * 0.5 + 44,
    { steps: 8 },
  );
  await page.mouse.up();
  await page.waitForTimeout(250);
  const after = await filesWindow.boundingBox();
  expect(after).not.toBeNull();
  if (!after) return;
  expect(Math.round(after.x)).not.toBe(Math.round(before.x));
  expect(Math.round(after.y)).not.toBe(Math.round(before.y));

  await filesWindow.getByRole('button', { name: 'Pin window on top' }).click();
  await expect(filesWindow.getByRole('button', { name: 'Unpin window from top' })).toBeVisible();
  await expect(filesWindow.getByText('On top')).toBeVisible();

  await filesWindow.getByRole('button', { name: 'Minimize Files' }).click();
  await expect(filesWindow).toBeHidden();
  await expect(page.getByTestId('dock-files')).toHaveAttribute('aria-label', /Minimized/);

  await page.getByTestId('dock-files').click();
  await expect(filesWindow).toBeVisible();

  await page.getByTestId('dock-agents').click();
  const agentsWindow = page.getByTestId('window-agents');
  await expect(agentsWindow).toBeVisible();
  await expect(filesWindow).toBeVisible();

  // The pinned Files window stays on top; close it first, then Agents.
  await filesWindow.getByRole('button', { name: 'Close Files' }).click();
  await expect(filesWindow).toBeHidden();
  await agentsWindow.getByRole('button', { name: 'Close Agents' }).click();
  await expect(agentsWindow).toBeHidden();
  await expect(page.getByTestId('dock-files')).toHaveAttribute('aria-label', /Files — Open/);
});

test('opens agent details from the Agents page', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  await nav.getByRole('button', { name: 'Agents', exact: true }).click();

  await page.getByTestId('agent-card-research').click();
  const sheet = page.getByTestId('agent-detail-sheet');
  await expect(sheet).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('Research Agent');
  await expect(sheet).toContainText('Simulated status');
  await expect(sheet).toContainText('Demo profile');

  await page.getByTestId('detail-sheet-close').click();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('filters tasks and opens a task detail', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  await nav.getByRole('button', { name: 'Tasks', exact: true }).click();

  const filters = page.getByRole('group', { name: 'Filter tasks by status' });
  await filters.getByRole('button', { name: /^Completed/ }).click();
  await expect(filters.getByRole('button', { name: /^Completed/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByTestId('task-row-t-1006')).toBeVisible();
  await expect(page.getByTestId('task-row-t-1001')).toHaveCount(0);

  await page.getByTestId('task-row-t-1006').click();
  const sheet = page.getByTestId('task-detail-sheet');
  await expect(sheet).toBeVisible();
  await expect(sheet).toContainText('Plan timeline');
  await expect(page.getByRole('dialog')).toContainText(
    'Prototype Command Center task routing',
  );
  await page.getByTestId('task-close').click();
  await expect(page.getByRole('dialog')).toBeHidden();

  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.getByTestId('task-row-t-1001')).toBeVisible();
});

test('keeps every workspace page free of horizontal overflow', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  const pageNames = [
    'Home',
    'Command',
    'Agents',
    'Tasks',
    'Apps',
    'Files',
    'Memory',
    'Settings',
  ];

  for (const name of pageNames) {
    await nav.getByRole('button', { name, exact: true }).click();
    await page.waitForTimeout(280);
    const metrics = await page.evaluate(() => ({
      documentOverflow: document.documentElement.scrollWidth - window.innerWidth,
      bodyOverflow: document.body.scrollWidth - window.innerWidth,
    }));
    expect(metrics.documentOverflow).toBeLessThanOrEqual(0);
    expect(metrics.bodyOverflow).toBeLessThanOrEqual(0);
  }
});

test('keeps Home above the fold on short laptop viewports', async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(
    !viewport || viewport.height > 820,
    'The compact Home layout applies to viewports shorter than 820px.',
  );

  const metrics = await page.evaluate(() => {
    const scroller = document.querySelector('#workspace .aether-scroll');
    return scroller
      ? { clientHeight: scroller.clientHeight, scrollHeight: scroller.scrollHeight }
      : null;
  });

  expect(metrics).not.toBeNull();
  if (!metrics) return;
  expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.clientHeight + 1);
});

test('routes embedded window actions into the target app window', async ({ page }) => {
  await page.getByTestId('dock-agents').click();
  const agentsWindow = page.getByTestId('window-agents');
  await expect(agentsWindow).toBeVisible();

  await agentsWindow.getByRole('button', { name: 'Create a plan' }).click();
  const commandWindow = page.getByTestId('window-command');
  await expect(commandWindow).toBeVisible();
  await expect(commandWindow.getByTestId('command-input')).toBeVisible();

  await commandWindow.getByRole('button', { name: 'Close Command Center' }).click();
  await expect(commandWindow).toBeHidden();
  await agentsWindow.getByRole('button', { name: 'Close Agents' }).click();
  await expect(agentsWindow).toBeHidden();
});

test('control center, notifications and user menu are interactive', async ({ page }) => {
  await page.getByRole('button', { name: 'Control Center' }).click();
  const controlCenter = page.getByRole('region', { name: 'Control Center' });
  await expect(controlCenter).toBeVisible();

  const wifi = controlCenter.getByRole('button', { name: /Wi-Fi/ });
  await expect(wifi).toHaveAttribute('aria-pressed', 'true');
  await wifi.click();
  await expect(wifi).toHaveAttribute('aria-pressed', 'false');

  await controlCenter.getByRole('button', { name: 'Dark', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.keyboard.press('Escape');
  await expect(controlCenter).toBeHidden();

  await page.getByRole('button', { name: /^Notifications/ }).click();
  const notifications = page.getByRole('region', { name: 'Notifications' });
  await expect(notifications).toBeVisible();
  await notifications.getByRole('button', { name: 'Mark all as read' }).click();
  await expect(page.getByRole('button', { name: /^Notifications/ })).not.toHaveAttribute(
    'aria-label',
    /unread/,
  );
  await page.keyboard.press('Escape');
  await expect(notifications).toBeHidden();

  await page.getByRole('button', { name: 'Open user menu' }).click();
  const menu = page.getByRole('region', { name: 'User menu' });
  await expect(menu).toBeVisible();
  await expect(menu).toContainText('Avery Chen');
  await expect(menu).toContainText('Demo session');
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();

  await page.keyboard.press('Control+K');
  const palette = page.getByRole('dialog', { name: 'Aether command' });
  await expect(palette).toBeVisible();
  await expect(palette).toContainText('Demo simulation');
  await page.keyboard.press('Escape');
  await expect(palette).toBeHidden();
});
