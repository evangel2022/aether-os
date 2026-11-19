import type { Agent, AgentId } from '@/types';
import { localized } from '@/i18n/localized';

export const AGENTS: Agent[] = [
  {
    id: 'research',
    name: localized('调研智能体', 'Research Agent'),
    shortName: localized('调研', 'Research'),
    role: localized('深度调研与综合分析', 'Deep research & synthesis'),
    description: localized(
      '将零散的信源整理成清晰、有据可查的简报。先求广度，再对关键细节做细致的第二遍梳理。',
      'Turns scattered sources into clear, sourced briefs. Prefers breadth first, then a careful second pass on the details that matter.',
    ),
    status: 'working',
    focus: localized('环境计算版图', 'Ambient computing landscape'),
    progress: 68,
    tone: 'iris',
    model: localized('Aether Reasoning · 演示配置', 'Aether Reasoning · demo profile'),
    tasksCompleted: 128,
    successRate: 96,
    avgDuration: localized('14 分钟', '14m'),
    capabilities: [
      localized('资料综合', 'Source synthesis'),
      localized('竞品扫描', 'Competitive scans'),
      localized('证据表格', 'Evidence tables'),
      localized('简报撰写', 'Brief writing'),
    ],
    tools: [
      localized('浏览器（演示）', 'Browser (demo)'),
      localized('知识库', 'Knowledge base'),
      localized('记忆', 'Memory'),
    ],
    activity: [
      {
        id: 'ra-1',
        title: localized('对比了 12 份产品拆解', 'Compared 12 product teardowns'),
        meta: localized('调研会话 · 演示', 'Research session · demo'),
        time: localized('12 分钟前', '12m ago'),
      },
      {
        id: 'ra-2',
        title: localized('将三项发现保存到记忆', 'Saved three findings to Memory'),
        meta: localized('上下文更新 · 演示', 'Context update · demo'),
        time: localized('41 分钟前', '41m ago'),
      },
      {
        id: 'ra-3',
        title: localized('完成了环境计算大纲', 'Finished the ambient computing outline'),
        meta: localized('任务里程碑 · 演示', 'Task milestone · demo'),
        time: localized('2 小时前', '2h ago'),
      },
    ],
  },
  {
    id: 'coding',
    name: localized('编码智能体', 'Coding Agent'),
    shortName: localized('编码', 'Coding'),
    role: localized('实现与验证', 'Implementation & verification'),
    description: localized(
      '以小而安全的步骤构建、审查并验证软件。用平实的语言解释取舍，并让代码库在离开时比接手时更整洁。',
      'Builds, reviews and verifies software in small safe steps. Explains tradeoffs in plain language and leaves the codebase tidier than it found it.',
    ),
    status: 'working',
    focus: localized('窗口管理器交互打磨', 'Window manager interaction polish'),
    progress: 42,
    tone: 'azure',
    model: localized('Aether Code · 演示配置', 'Aether Code · demo profile'),
    tasksCompleted: 94,
    successRate: 98,
    avgDuration: localized('9 分钟', '9m'),
    capabilities: [
      localized('功能实现', 'Feature implementation'),
      localized('交互质量保障', 'Interaction QA'),
      localized('代码审查', 'Code review'),
      localized('测试编写', 'Test writing'),
    ],
    tools: [
      localized('编辑器（演示）', 'Editor (demo)'),
      localized('预览（演示）', 'Preview (demo)'),
      localized('沙盒', 'Sandbox'),
    ],
    activity: [
      {
        id: 'ca-1',
        title: localized('优化了窗口聚焦行为', 'Refined window focus behaviour'),
        meta: localized('UI-1 原型 · 演示', 'UI-1 prototype · demo'),
        time: localized('8 分钟前', '8m ago'),
      },
      {
        id: 'ca-2',
        title: localized('通过了交互冒烟测试套件', 'Passed the interaction smoke suite'),
        meta: localized('验证 · 演示', 'Verification · demo'),
        time: localized('34 分钟前', '34m ago'),
      },
      {
        id: 'ca-3',
        title: localized('为程序坞发起了一次草稿评审', 'Opened a draft review for the Dock'),
        meta: localized('评审 · 演示', 'Review · demo'),
        time: localized('1 小时前', '1h ago'),
      },
    ],
  },
  {
    id: 'writing',
    name: localized('写作智能体', 'Writing Agent'),
    shortName: localized('写作', 'Writing'),
    role: localized('叙事与沟通', 'Narrative & communication'),
    description: localized(
      '以克制、精准的笔触塑造产品故事。句子简短，立意开阔，每个论点都扎根于真实。',
      'Shapes product stories with a calm, precise voice. Keeps sentences short, ideas generous, and every claim anchored to something real.',
    ),
    status: 'waiting',
    focus: localized('发布叙事 · 等待评审', 'Launch narrative · awaiting review'),
    progress: 78,
    tone: 'teal',
    model: localized('Aether Language · 演示配置', 'Aether Language · demo profile'),
    tasksCompleted: 76,
    successRate: 95,
    avgDuration: localized('6 分钟', '6m'),
    capabilities: [
      localized('叙事策略', 'Narrative strategy'),
      localized('产品文案', 'Product writing'),
      localized('语气打磨', 'Tone editing'),
      localized('发布文案', 'Announcement copy'),
    ],
    tools: [
      localized('草稿（演示）', 'Drafts (demo)'),
      localized('记忆', 'Memory'),
      localized('风格指南', 'Style guide'),
    ],
    activity: [
      {
        id: 'wa-1',
        title: localized('提交发布叙事 v3 以供评审', 'Submitted launch narrative v3 for review'),
        meta: localized('待审核 · 演示', 'Needs review · demo'),
        time: localized('5 分钟前', '5m ago'),
      },
      {
        id: 'wa-2',
        title: localized('收紧了指挥中心的故事线', 'Tightened the Command Center story'),
        meta: localized('草稿编辑 · 演示', 'Draft edit · demo'),
        time: localized('52 分钟前', '52m ago'),
      },
      {
        id: 'wa-3',
        title: localized('让语气与产品原则保持一致', 'Aligned tone with product principles'),
        meta: localized('风格润色 · 演示', 'Style pass · demo'),
        time: localized('3 小时前', '3h ago'),
      },
    ],
  },
];

export const AGENT_BY_ID: Record<AgentId, Agent> = AGENTS.reduce(
  (acc, agent) => {
    acc[agent.id] = agent;
    return acc;
  },
  {} as Record<AgentId, Agent>,
);

export function getAgent(id: AgentId): Agent {
  return AGENT_BY_ID[id];
}
