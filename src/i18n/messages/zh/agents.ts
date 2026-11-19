import type { AgentsMessages } from '@/i18n/messages/en/agents';

const agents = {
  'agents.title': '智能体',
  'agents.eyebrow': '协作伙伴',
  'agents.description':
    '三位专家共同分担工作——每位都有清晰的重点、专属工具和可见的活动轨迹。这里展示的全部是模拟演示数据，并非真实的智能体后端。',
  'agents.createPlan': '创建计划',
  'agents.viewTasks': '查看任务',
  'agents.section.title': '你的团队',
  'agents.section.description': '每个智能体都会公开地规划、执行并汇报。',
  'agents.workingNow.one': '1 位正在工作',
  'agents.workingNow.other': '{count} 位正在工作',
  'agents.summary.one': '1 位专家 · {working} 位执行中 · 无智能体后端',
  'agents.summary.other': '{count} 位专家 · {working} 位执行中 · 无智能体后端',
  'agents.demoNote.title': '演示沙盒 · 无智能体后端。',
  'agents.demoNote.body': '状态、进度与活动均为示意内容，仅保存在本地。',

  'agents.card.currentFocus': '当前重点',
  'agents.card.focusProgress': '{name} 的重点进度',

  'agents.stats.tasksDone': '已完成任务',
  'agents.stats.success': '成功率',
  'agents.stats.avgTime': '平均耗时',
  'agents.stats.successRate': '成功率',
  'agents.stats.avgDuration': '平均时长',

  'agents.detail.eyebrow': '智能体档案 · 演示',
  'agents.detail.fallbackTitle': '智能体',
  'agents.detail.demoProfile': '演示档案',
  'agents.detail.simulatedStatus': '模拟状态',
  'agents.detail.status.working': '正在演示沙盒中推进当前重点。',
  'agents.detail.status.waiting': '在此模拟中已暂停——等待人工审核步骤。',
  'agents.detail.status.idle': '在此模拟中可承接新工作。',
  'agents.detail.capabilities': '能力',
  'agents.detail.tools': '工具',
  'agents.detail.recentActivity': '近期活动',
  'agents.detail.demoNote':
    '演示沙盒 · 无智能体后端。状态、进度与活动仅为示意——没有执行任何操作，数据也不会离开此原型。',
  'agents.detail.footerNote': '本地模拟 · 未调用任何智能体。',
} satisfies Record<keyof AgentsMessages, string>;

export default agents;
