import { expect, test, type Page } from '@playwright/test';

const NAV_PAGES = [
  { id: 'home', english: 'Home', chinese: '首页' },
  { id: 'command', english: 'Command', chinese: '指挥中心' },
  { id: 'agents', english: 'Agents', chinese: '智能体' },
  { id: 'tasks', english: 'Tasks', chinese: '任务' },
  { id: 'apps', english: 'Apps', chinese: '应用' },
  { id: 'files', english: 'Files', chinese: '文件' },
  { id: 'memory', english: 'Memory', chinese: '记忆' },
  { id: 'settings', english: 'Settings', chinese: '设置' },
] as const;

async function waitForDesktop(page: Page): Promise<void> {
  await expect(page.getByTestId('desktop-shell')).toBeVisible();
}

async function switchLocale(page: Page, locale: 'zh-CN' | 'en-US'): Promise<void> {
  await page.getByTestId('nav-settings').click();
  await expect(page.getByTestId('settings-page')).toBeVisible();
  await page
    .getByTestId(locale === 'zh-CN' ? 'settings-language-zh' : 'settings-language-en')
    .click();
  await expect(page.locator('html')).toHaveAttribute('lang', locale);
}

async function expectNoHorizontalOverflow(page: Page, context: string): Promise<void> {
  const metrics = await page.evaluate(() => {
    const workspace = document.querySelector('#workspace');
    return {
      document: document.documentElement.scrollWidth - window.innerWidth,
      body: document.body.scrollWidth - window.innerWidth,
      workspace: workspace
        ? workspace.scrollWidth - workspace.clientWidth
        : 0,
    };
  });

  expect(metrics.document, `${context}: document overflow`).toBeLessThanOrEqual(1);
  expect(metrics.body, `${context}: body overflow`).toBeLessThanOrEqual(1);
  expect(metrics.workspace, `${context}: workspace overflow`).toBeLessThanOrEqual(1);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await waitForDesktop(page);
});

test('defaults to Simplified Chinese on first run', async ({ page }) => {
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('toolbar', { name: '程序坞' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: '主导航' })).toBeVisible();

  const nav = page.getByTestId('nav-home').locator('..');
  for (const item of NAV_PAGES) {
    await expect(page.getByTestId(`nav-${item.id}`)).toContainText(item.chinese);
  }

  await expect(page.getByTestId('nav-home')).toHaveAttribute('aria-current', 'page');
  await expect(page.getByTestId('home-page')).toContainText('演示工作区');
  await expect(page.getByTestId('home-command-input')).toHaveAttribute(
    'aria-label',
    '向 Aether 提出计划需求',
  );
  await expect(page.getByTestId('home-command-submit')).toContainText('生成计划');
  await expect(nav).not.toContainText('Home');
});

test('switches the entire interface to English from Settings', async ({ page }) => {
  await switchLocale(page, 'en-US');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.getByTestId('settings-language-en')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByTestId('settings-page')).toContainText('Settings');
  await expect(page.getByTestId('nav-settings')).toContainText('Settings');

  await page.getByTestId('nav-home').click();
  await expect(page.getByTestId('home-page')).toContainText('Demo workspace');
  await expect(page.getByTestId('home-command-input')).toHaveAttribute(
    'aria-label',
    'Ask Aether to create a plan',
  );
});

test('persists the language choice after a reload', async ({ page }) => {
  await switchLocale(page, 'en-US');
  await page.reload();
  await waitForDesktop(page);

  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.getByTestId('nav-home')).toContainText('Home');

  await switchLocale(page, 'zh-CN');
  await page.reload();
  await waitForDesktop(page);

  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByTestId('nav-home')).toContainText('首页');
});

test('translates all main pages with no mixed navigation copy', async ({ page }) => {
  const headings: Record<string, string> = {
    command: '指挥中心',
    agents: '智能体',
    tasks: '任务',
    apps: '应用',
    files: '文件',
    memory: '记忆',
    settings: '设置',
  };

  for (const item of NAV_PAGES) {
    await page.getByTestId(`nav-${item.id}`).click();
    await page.waitForTimeout(250);

    await expect(page.getByTestId(`nav-${item.id}`)).toHaveAttribute(
      'aria-current',
      'page',
    );

    if (item.id === 'home') {
      await expect(page.getByTestId('home-page')).toContainText('演示工作区');
      continue;
    }

    await expect(
      page.getByRole('heading', { name: headings[item.id], level: 1 }),
    ).toBeVisible();
    await expect(page.locator('#workspace')).not.toContainText(item.english);
  }

  await expect(page.getByTestId('nav-home')).toContainText('首页');
  await expect(page.getByTestId('nav-command')).toContainText('指挥中心');
  await expect(page.getByTestId('nav-agents')).toContainText('智能体');
  await expect(page.getByTestId('nav-tasks')).toContainText('任务');
});

test('keeps Chinese layout free of horizontal overflow on every page', async ({
  page,
}) => {
  for (const item of NAV_PAGES) {
    await page.getByTestId(`nav-${item.id}`).click();
    await page.waitForTimeout(250);
    await expectNoHorizontalOverflow(page, `zh-CN ${item.id}`);
  }

  const footer = page.getByTestId('home-page').locator('footer');
  const viewport = page.viewportSize();
  await page.getByTestId('nav-home').click();
  if (!viewport || viewport.height > 820) {
    await expect(footer).toBeVisible();
  }
});

test('keeps Chinese Home above the fold on short laptop viewports', async ({
  page,
}) => {
  const viewport = page.viewportSize();
  test.skip(
    !viewport || viewport.height > 820,
    'The compact Chinese Home layout applies to short viewports.',
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

test('keeps English layout free of horizontal overflow on every page', async ({
  page,
}) => {
  await switchLocale(page, 'en-US');

  for (const item of NAV_PAGES) {
    await page.getByTestId(`nav-${item.id}`).click();
    await page.waitForTimeout(250);
    await expectNoHorizontalOverflow(page, `en-US ${item.id}`);
  }
});

test('keeps window titles and Dock labels in the active language', async ({ page }) => {
  await page.getByTestId('dock-files').click();
  await expect(page.getByTestId('window-files')).toBeVisible();
  await expect(page.getByTestId('window-title-files')).toHaveText('文件');
  await expect(page.getByTestId('dock-files')).toHaveAttribute(
    'aria-label',
    /文件 · (当前|打开)/,
  );

  await expect(page.getByTestId('window-files')).toContainText('当前文件夹');

  await page.getByTestId('dock-settings').click();
  await expect(page.getByTestId('window-settings')).toBeVisible();
  await expect(page.getByTestId('window-title-settings')).toHaveText('设置');
  await expect(page.getByTestId('window-settings')).toContainText('语言');

  await page.getByTestId('settings-language-en').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');

  await expect(page.getByTestId('window-title-files')).toHaveText('Files');
  await expect(page.getByTestId('window-title-settings')).toHaveText('Settings');
  await expect(page.getByTestId('window-files')).toContainText('Aether Drive');
  await expect(page.getByTestId('window-settings')).toContainText('Language');
  await expect(page.getByTestId('dock-files')).toHaveAttribute(
    'aria-label',
    /Files — (Active|Open)/,
  );
  await expect(page.getByTestId('settings-language-en')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
