import type { AppsMessages } from '@/i18n/messages/en/apps';

const apps = {
  'apps.eyebrow': '应用合集',
  'apps.title': '应用',
  'apps.description':
    '每个 Aether 应用只做一件事，并以浮动窗口的形式打开在这个模拟桌面上。启动一个应用，拖动窗口，或从标题栏关闭它。',
  'apps.searchPlaceholder': '搜索应用',
  'apps.searchAria': '搜索应用',
  'apps.library': '应用库',
  'apps.libraryDescription':
    '共 {count} 个本地应用。每次启动都会创建一个真实的演示窗口 — 每个应用一个。',
  'apps.filteredCount': '显示 {shown} / {total} 个应用',
  'apps.windowsOpenOne': '{count} 个窗口已打开',
  'apps.windowsOpen': '{count} 个窗口已打开',
  'apps.emptyTitle': '没有匹配“{query}”的应用',
  'apps.emptyDescription': '换一个名称试试，或清除搜索以查看应用库中的全部八个应用。',
  'apps.infoNote':
    '应用窗口仅在本地模拟。关闭的应用会回到应用库，运行中的应用会显示状态徽章，启动已运行的应用会把它的窗口置于顶层，而不是再开一个重复窗口。此原型不会安装、下载或发起任何网络请求。',
  'apps.windowSize': '{width} × {height} 窗口',
  'apps.launchAria': '启动 {name} — {tagline}',
  'apps.bringForwardAria': '将 {name} 置于顶层 — {tagline}',
} satisfies Record<keyof AppsMessages, string>;

export default apps;
