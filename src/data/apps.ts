import {
  Bot,
  Brain,
  CloudSun,
  Folder,
  ListChecks,
  Settings,
  Sparkles,
  StickyNote,
} from 'lucide-react';
import { localized } from '@/i18n/localized';
import type { AppDefinition, AppId, AppTone } from '@/types';

export const APP_DEFINITIONS: AppDefinition[] = [
  {
    id: 'command',
    name: localized('指挥中心', 'Command Center'),
    tagline: localized('把想法说出来，带着计划离开。', 'Think out loud. Leave with a plan.'),
    icon: Sparkles,
    tone: 'azure',
    showInDock: true,
    defaultWindow: { width: 880, height: 640 },
  },
  {
    id: 'agents',
    name: localized('智能体', 'Agents'),
    tagline: localized('三位专家，协同工作。', 'Three specialists, working together.'),
    icon: Bot,
    tone: 'iris',
    showInDock: true,
    defaultWindow: { width: 940, height: 660 },
  },
  {
    id: 'tasks',
    name: localized('任务', 'Tasks'),
    tagline: localized('清晰掌握正在推进的工作。', 'A clear view of work in motion.'),
    icon: ListChecks,
    tone: 'mint',
    showInDock: true,
    defaultWindow: { width: 920, height: 650 },
  },
  {
    id: 'files',
    name: localized('文件', 'Files'),
    tagline: localized('一切都井然有序。', 'Everything in its place.'),
    icon: Folder,
    tone: 'sky',
    showInDock: true,
    defaultWindow: { width: 980, height: 660 },
  },
  {
    id: 'memory',
    name: localized('记忆', 'Memory'),
    tagline: localized('可见、可控的上下文。', 'Context you can see and control.'),
    icon: Brain,
    tone: 'violet',
    showInDock: true,
    defaultWindow: { width: 900, height: 640 },
  },
  {
    id: 'notes',
    name: localized('备忘录', 'Notes'),
    tagline: localized('安放零散思绪的安静角落。', 'A quiet place for loose threads.'),
    icon: StickyNote,
    tone: 'sand',
    showInDock: true,
    defaultWindow: { width: 640, height: 540 },
  },
  {
    id: 'weather',
    name: localized('天气', 'Weather'),
    tagline: localized('一眼看尽今天。', 'A small glance at the day.'),
    icon: CloudSun,
    tone: 'cloud',
    showInDock: true,
    defaultWindow: { width: 580, height: 620 },
  },
  {
    id: 'settings',
    name: localized('设置', 'Settings'),
    tagline: localized('让 Aether 更贴合你。', 'Make Aether feel like yours.'),
    icon: Settings,
    tone: 'slate',
    showInDock: true,
    defaultWindow: { width: 960, height: 680 },
  },
];

export const APP_BY_ID: Record<AppId, AppDefinition> = APP_DEFINITIONS.reduce(
  (acc, app) => {
    acc[app.id] = app;
    return acc;
  },
  {} as Record<AppId, AppDefinition>,
);

export const DOCK_APPS = APP_DEFINITIONS.filter((app) => app.showInDock);

export const TONE_GRADIENTS: Record<AppTone, string> = {
  azure: 'from-[#69c0ff] via-[#1687ff] to-[#075bd4]',
  iris: 'from-[#b9b2ff] via-[#7b73f7] to-[#4e45cf]',
  mint: 'from-[#87e4d3] via-[#25b6a7] to-[#0c857c]',
  sky: 'from-[#9bd8ff] via-[#48aaf0] to-[#1e74c7]',
  violet: 'from-[#d3b9ff] via-[#9c7cf0] to-[#6d4dca]',
  sand: 'from-[#ffdb9c] via-[#f0b95e] to-[#c9872b]',
  slate: 'from-[#b9c2d1] via-[#7d899d] to-[#505b6d]',
  cloud: 'from-[#a9d9ff] via-[#63b5f4] to-[#3182ce]',
};

export function getApp(appId: AppId): AppDefinition {
  return APP_BY_ID[appId];
}
