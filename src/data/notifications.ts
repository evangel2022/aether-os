import type { AppNotification } from '@/types';
import { localized } from '@/i18n/localized';

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n-01',
    kind: 'agent',
    title: localized(
      '调研智能体发现了一个有价值的模式',
      'Research Agent found a useful pattern',
    ),
    body: localized(
      '三份来源指向同一个环境上下文思路，已补充到简报中。',
      'Three sources converge on the same ambient-context idea. Added to the brief.',
    ),
    time: localized('6 分钟前', '6m ago'),
    read: false,
  },
  {
    id: 'n-02',
    kind: 'task',
    title: localized('发布叙事已可评审', 'Launch narrative is ready for review'),
    body: localized(
      '写作智能体已提交 v3，正在等待人工决策。',
      'Writing Agent submitted v3 and is waiting for a human decision.',
    ),
    time: localized('28 分钟前', '28m ago'),
    read: false,
  },
  {
    id: 'n-03',
    kind: 'memory',
    title: localized('记忆已更新', 'Memory updated'),
    body: localized(
      '已保存你在 Aether OS 原型中的显示偏好。',
      'Saved your display preferences for the Aether OS prototype.',
    ),
    time: localized('1 小时前', '1h ago'),
    read: true,
  },
  {
    id: 'n-04',
    kind: 'system',
    title: localized('Aether OS 演示已是最新版本', 'Aether OS demo is up to date'),
    body: localized(
      '版本 UI-1 · 仅本地运行。不会发起任何模型或网络调用。',
      'Build UI-1 · local-only. No model or network calls are made.',
    ),
    time: localized('2 小时前', '2h ago'),
    read: true,
  },
];
