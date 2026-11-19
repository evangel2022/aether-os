import {
  Bot,
  Brain,
  Folder,
  Home,
  LayoutGrid,
  ListChecks,
  Settings,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PageId, LocalizedText } from '@/types';
import { localized } from '@/i18n/localized';

export interface NavigationItem {
  id: PageId;
  label: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
}

export const NAVIGATION: NavigationItem[] = [
  {
    id: 'home',
    label: localized('首页', 'Home'),
    description: localized('今日一目了然', 'Your day at a glance'),
    icon: Home,
  },
  {
    id: 'command',
    label: localized('指挥中心', 'Command'),
    description: localized('向 Aether 提出任何需求', 'Ask Aether for anything'),
    icon: Sparkles,
  },
  {
    id: 'agents',
    label: localized('智能体', 'Agents'),
    description: localized('认识你的协作伙伴', 'Meet your collaborators'),
    icon: Bot,
  },
  {
    id: 'tasks',
    label: localized('任务', 'Tasks'),
    description: localized('正在推进的工作', 'Work in motion'),
    icon: ListChecks,
  },
  {
    id: 'apps',
    label: localized('应用', 'Apps'),
    description: localized('Aether 应用合集', 'The Aether collection'),
    icon: LayoutGrid,
  },
  {
    id: 'files',
    label: localized('文件', 'Files'),
    description: localized('各归其位', 'Everything in its place'),
    icon: Folder,
  },
  {
    id: 'memory',
    label: localized('记忆', 'Memory'),
    description: localized('由你掌控的上下文', 'Context you control'),
    icon: Brain,
  },
  {
    id: 'settings',
    label: localized('设置', 'Settings'),
    description: localized('打造专属空间', 'Personalise your space'),
    icon: Settings,
  },
];
