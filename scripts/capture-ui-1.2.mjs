import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = process.env.AETHER_URL ?? 'http://127.0.0.1:5173/';
const OUT_DIR = path.resolve('docs/screenshots/ui-1.2');
const SETTINGS_KEY = 'aether-os-demo-settings-v1';

const locales = [
  {
    code: 'zh-CN',
    dir: 'zh',
    notifications: '通知',
    controlCenter: '控制中心',
    userMenu: '打开用户菜单',
    openTasks: '在任务中查看',
    prompt: '为 Aether OS 原型规划一个从容的三天发布节点。',
  },
  {
    code: 'en-US',
    dir: 'en',
    notifications: 'Notifications',
    controlCenter: 'Control Center',
    userMenu: 'Open user menu',
    openTasks: 'Open in Tasks',
    prompt: 'Plan a calm, three-day launch moment for the Aether OS prototype.',
  },
];

const pages = [
  'home',
  'command',
  'agents',
  'tasks',
  'apps',
  'files',
  'memory',
  'settings',
];

const viewports = [
  { width: 1920, height: 1080, suffix: '1920' },
  { width: 1366, height: 768, suffix: '1366' },
];

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const metrics = {};

async function newContext(locale, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  });
  await context.addInitScript(
    ({ storageKey, language }) => {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          language,
          appearance: 'light',
          accent: 'blue',
          wallpaper: 'dawn',
          dockMagnification: true,
          reduceMotion: false,
          showSeconds: false,
          memoryEnabled: true,
          localOnly: true,
        }),
      );
    },
    { storageKey: SETTINGS_KEY, language: locale.code },
  );
  return context;
}

async function shot(page, locale, viewport, name) {
  const dir = path.join(OUT_DIR, locale.dir);
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `${name}-${viewport.suffix}.png`);
  await page.screenshot({ path: file, animations: 'disabled' });
  return file;
}

async function waitReady(page) {
  await page.getByTestId('desktop-shell').waitFor();
  await page.waitForTimeout(450);
}

async function closeAnyWindow(page) {
  const closeButtons = page.locator(
    '[data-testid^="window-"] button[aria-label^="Close "], [data-testid^="window-"] button[aria-label^="关闭"]',
  );
  const count = await closeButtons.count();
  for (let index = count - 1; index >= 0; index -= 1) {
    await closeButtons.nth(index).click({ force: true }).catch(() => {});
  }
  await page.waitForTimeout(180);
}

for (const locale of locales) {
  for (const viewport of viewports) {
    const context = await newContext(locale, viewport);
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await waitReady(page);

    await page.getByTestId('home-page').waitFor();
    const homeMetrics = await page.evaluate(() => {
      const scroller = document.querySelector('#workspace .aether-scroll');
      const footer = document.querySelector('#workspace footer');
      const workspace = document.querySelector('#workspace');
      return {
        clientHeight: scroller?.clientHeight ?? null,
        scrollHeight: scroller?.scrollHeight ?? null,
        footerBottom: footer
          ? Math.round(footer.getBoundingClientRect().bottom)
          : null,
        workspaceBottom: workspace
          ? Math.round(workspace.getBoundingClientRect().bottom)
          : null,
      };
    });
    metrics[`${locale.code}-home-${viewport.suffix}`] = homeMetrics;

    for (const pageId of pages) {
      await page.getByTestId(`nav-${pageId}`).click();
      await page.waitForTimeout(380);
      await shot(page, locale, viewport, `page-${pageId}`);
    }

    // Composed desktop windows.
    await page.getByTestId('nav-home').click();
    await page.waitForTimeout(250);
    await page.getByTestId('dock-files').click();
    await page.waitForTimeout(260);
    await page.getByTestId('dock-agents').click();
    await page.waitForTimeout(700);
    await shot(page, locale, viewport, 'windows-desktop');
    await closeAnyWindow(page);

    // Single app windows, including embedded page layouts.
    await page.reload({ waitUntil: 'networkidle' });
    await waitReady(page);
    await page.getByTestId('dock-files').click();
    await page.waitForTimeout(500);
    await shot(page, locale, viewport, 'window-files');
    await closeAnyWindow(page);

    await page.reload({ waitUntil: 'networkidle' });
    await waitReady(page);
    await page.getByTestId('dock-command').click();
    await page.waitForTimeout(500);
    await shot(page, locale, viewport, 'window-command');
    await closeAnyWindow(page);

    // Notes and Weather mini-apps in their own windows.
    await page.reload({ waitUntil: 'networkidle' });
    await waitReady(page);
    await page.getByTestId('dock-notes').click();
    await page.waitForTimeout(500);
    await shot(page, locale, viewport, 'window-notes');
    await closeAnyWindow(page);

    await page.reload({ waitUntil: 'networkidle' });
    await waitReady(page);
    await page.getByTestId('dock-weather').click();
    await page.waitForTimeout(500);
    await shot(page, locale, viewport, 'window-weather');
    await closeAnyWindow(page);

    if (viewport.suffix === '1920') {
      // Desktop overlays.
      await page.reload({ waitUntil: 'networkidle' });
      await waitReady(page);
      await page.getByRole('button', { name: locale.controlCenter, exact: true }).click();
      await page.waitForTimeout(420);
      await shot(page, locale, viewport, 'overlay-control-center');
      await page.keyboard.press('Escape');

      await page
        .getByRole('button', { name: new RegExp(`^${locale.notifications}`) })
        .click();
      await page.waitForTimeout(420);
      await shot(page, locale, viewport, 'overlay-notifications');
      await page.keyboard.press('Escape');

      await page.getByRole('button', { name: locale.userMenu }).click();
      await page.waitForTimeout(420);
      await shot(page, locale, viewport, 'overlay-user-menu');
      await page.keyboard.press('Escape');

      // A completed, simulated Command Center plan and its generated task.
      await page.getByTestId('nav-command').click();
      await page.waitForTimeout(300);
      await page.getByTestId('command-input').fill(locale.prompt);
      await page.getByTestId('command-submit').click();
      await page.getByTestId('command-plan').waitFor();
      const openTasks = page.getByRole('button', {
        name: locale.openTasks,
        exact: true,
      });
      await openTasks.waitFor({ timeout: 15_000 });
      await page.waitForTimeout(350);
      await shot(page, locale, viewport, 'command-plan-ready');

      await openTasks.click();
      await page.getByTestId('tasks-page').waitFor();
      await page.waitForTimeout(400);
      await shot(page, locale, viewport, 'command-task-added');
    }

    await context.close();
  }
}

await browser.close();

const metricsPath = path.join(OUT_DIR, 'capture-metrics.json');
await mkdir(OUT_DIR, { recursive: true });
await writeFile(
  metricsPath,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      locales: locales.map((locale) => locale.code),
      viewports,
      homeMetrics: metrics,
    },
    null,
    2,
  ),
  'utf8',
);

console.log(`Captured UI-1.2 screenshots to ${OUT_DIR}`);
console.log(JSON.stringify(metrics, null, 2));
