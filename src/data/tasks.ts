import type { TaskRecord } from '@/types';
import { localized } from '@/i18n/localized';

export const INITIAL_TASKS: TaskRecord[] = [
  {
    id: 't-1001',
    title: localized(
      '综合梳理环境计算版图',
      'Synthesize the ambient computing landscape',
    ),
    description: localized(
      '将最新的访谈笔记与十二份产品拆解整理成一页简报，并给出对 Aether OS 清晰的产品启示。',
      'Turn the latest interview notes and twelve product teardowns into a one-page brief with clear product implications for Aether OS.',
    ),
    agentId: 'research',
    status: 'in_progress',
    priority: 'high',
    progress: 68,
    updatedAt: localized('5 分钟前', '5m ago'),
    createdAt: localized('今天 09:12', 'Today, 09:12'),
    dueLabel: localized('今天 16:00', 'Today · 16:00'),
    origin: 'demo',
    tags: [localized('调研', 'Research'), localized('策略', 'Strategy')],
    steps: [
      {
        id: 's1',
        label: localized('收集原始资料', 'Collect source material'),
        detail: localized(
          '已收集 12 份产品拆解与 6 份访谈笔记。',
          '12 teardowns and 6 interview notes collected.',
        ),
        status: 'done',
      },
      {
        id: 's2',
        label: localized('归纳模式', 'Cluster patterns'),
        detail: localized(
          '浮现出三个主题：环境上下文、信任与安静的主动性。',
          'Three themes surfaced: ambient context, trust, quiet agency.',
        ),
        status: 'done',
      },
      {
        id: 's3',
        label: localized('起草产品启示', 'Draft product implications'),
        detail: localized(
          '进行中：正在梳理五条平台层面的启示。',
          'In progress — shaping five implications for the platform.',
        ),
        status: 'active',
      },
      {
        id: 's4',
        label: localized('编辑润色', 'Editorial pass'),
        detail: localized(
          '等待初稿完成后进行最终润色。',
          'Waiting on the draft before a final pass.',
        ),
        status: 'pending',
      },
    ],
  },
  {
    id: 't-1002',
    title: localized(
      '打磨窗口聚焦与拖拽交互',
      'Polish window focus and drag interactions',
    ),
    description: localized(
      '让桌面窗口拥有真实的物理感：可预期的聚焦顺序、顺滑的拖拽、克制的动效，以及清晰的固定窗口行为。',
      'Make desktop windows feel physical: predictable focus order, smooth dragging, restrained motion, and clear pinned-window behaviour.',
    ),
    agentId: 'coding',
    status: 'in_progress',
    priority: 'medium',
    progress: 42,
    updatedAt: localized('18 分钟前', '18m ago'),
    createdAt: localized('今天 08:40', 'Today, 08:40'),
    dueLabel: localized('明天', 'Tomorrow'),
    origin: 'demo',
    tags: [localized('UI-1', 'UI-1'), localized('原型', 'Prototype')],
    steps: [
      {
        id: 's1',
        label: localized('梳理交互状态', 'Map interaction states'),
        detail: localized(
          '聚焦、拖拽、最小化、固定与恢复状态均已梳理。',
          'Focus, drag, minimize, pin and restore mapped.',
        ),
        status: 'done',
      },
      {
        id: 's2',
        label: localized('实现指针拖拽', 'Implement pointer dragging'),
        detail: localized(
          '边界约束与指针捕获正在实现中。',
          'Bounds clamping and pointer capture in progress.',
        ),
        status: 'active',
      },
      {
        id: 's3',
        label: localized('置顶动效编排', 'Bring-to-front choreography'),
        detail: localized(
          '计划加入阴影与边框强调。',
          'Shadow and border emphasis planned.',
        ),
        status: 'pending',
      },
      {
        id: 's4',
        label: localized('Playwright 交互验证', 'Playwright interaction pass'),
        detail: localized(
          '桌面与笔记本视口已排入队列。',
          'Desktop and laptop viewports queued.',
        ),
        status: 'pending',
      },
    ],
  },
  {
    id: 't-1003',
    title: localized(
      '起草 Aether OS 发布叙事',
      'Draft the Aether OS launch narrative',
    ),
    description: localized(
      '撰写 Aether OS 的第一个公开故事。从更安静、更强大的电脑体验入手，而不是罗列功能。',
      'Write the first public story for Aether OS. Lead with the feeling of a calmer, more capable computer — not a list of features.',
    ),
    agentId: 'writing',
    status: 'review',
    priority: 'high',
    progress: 78,
    updatedAt: localized('32 分钟前', '32m ago'),
    createdAt: localized('昨天 15:20', 'Yesterday, 15:20'),
    dueLabel: localized('今天 18:00', 'Today · 18:00'),
    origin: 'demo',
    tags: [localized('叙事', 'Narrative'), localized('发布', 'Launch')],
    steps: [
      {
        id: 's1',
        label: localized('收集语气参考', 'Collect voice references'),
        detail: localized(
          '已挑选并标注三段参考文本。',
          'Three reference passages selected and annotated.',
        ),
        status: 'done',
      },
      {
        id: 's2',
        label: localized('撰写 v1 初稿', 'Write v1'),
        detail: localized(
          '第一版完整叙事已完成初稿。',
          'First complete narrative drafted.',
        ),
        status: 'done',
      },
      {
        id: 's3',
        label: localized('收紧开篇', 'Tighten the opening'),
        detail: localized(
          '开篇已从五句精简为两句。',
          'Opening reduced from five sentences to two.',
        ),
        status: 'done',
      },
      {
        id: 's4',
        label: localized('与产品团队评审', 'Review with product'),
        detail: localized(
          '等待人工评审后进入下一轮迭代。',
          'Awaiting a human review before the next iteration.',
        ),
        status: 'active',
      },
    ],
  },
  {
    id: 't-1004',
    title: localized('审查记忆隐私模型', 'Review the memory privacy model'),
    description: localized(
      '审查演示记忆的呈现、固定与遗忘方式，找出系统在记住之前必须先询问用户的时刻。',
      'Audit how demo memories are surfaced, pinned and forgotten. Identify the moments where the system needs to ask before remembering.',
    ),
    agentId: 'research',
    status: 'queued',
    priority: 'medium',
    progress: 0,
    updatedAt: localized('1 小时前', '1h ago'),
    createdAt: localized('今天 07:55', 'Today, 07:55'),
    dueLabel: localized('周五', 'Friday'),
    origin: 'demo',
    tags: [localized('记忆', 'Memory'), localized('隐私', 'Privacy')],
    steps: [
      {
        id: 's1',
        label: localized('盘点记忆触点', 'Inventory memory surfaces'),
        detail: localized('尚未开始。', 'Not started.'),
        status: 'pending',
      },
      {
        id: 's2',
        label: localized('梳理征得同意的时刻', 'Map consent moments'),
        detail: localized('尚未开始。', 'Not started.'),
        status: 'pending',
      },
      {
        id: 's3',
        label: localized('撰写建议', 'Write recommendations'),
        detail: localized('尚未开始。', 'Not started.'),
        status: 'pending',
      },
    ],
  },
  {
    id: 't-1005',
    title: localized(
      '设计首次启动的引导时刻',
      'Design the first-run onboarding moment',
    ),
    description: localized(
      '设计一段简短而温暖的介绍，让人无需功能巡览也能理解 Aether 能做什么。',
      'Create a short, warm introduction that helps someone understand what Aether can do without a feature tour.',
    ),
    agentId: 'writing',
    status: 'queued',
    priority: 'low',
    progress: 0,
    updatedAt: localized('2 小时前', '2h ago'),
    createdAt: localized('昨天 11:05', 'Yesterday, 11:05'),
    dueLabel: localized('下周', 'Next week'),
    origin: 'demo',
    tags: [localized('写作', 'Writing'), localized('引导', 'Onboarding')],
    steps: [
      {
        id: 's1',
        label: localized('搭建叙事大纲', 'Outline the narrative'),
        detail: localized('尚未开始。', 'Not started.'),
        status: 'pending',
      },
      {
        id: 's2',
        label: localized('起草两个方向', 'Draft two directions'),
        detail: localized('尚未开始。', 'Not started.'),
        status: 'pending',
      },
      {
        id: 's3',
        label: localized('与设计团队确定方向', 'Pick a direction with design'),
        detail: localized('尚未开始。', 'Not started.'),
        status: 'pending',
      },
    ],
  },
  {
    id: 't-1006',
    title: localized(
      '打造指挥中心任务路由原型',
      'Prototype Command Center task routing',
    ),
    description: localized(
      '探索自然语言请求如何转化为一份可见、可审核的计划，并由三个演示智能体协同完成。',
      'Explore how a natural-language request becomes a visible, reviewable plan across the three demo agents.',
    ),
    agentId: 'coding',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    updatedAt: localized('昨天', 'Yesterday'),
    createdAt: localized('周一 10:10', 'Mon, 10:10'),
    dueLabel: localized('已完成', 'Completed'),
    origin: 'demo',
    tags: [localized('指挥中心', 'Command'), localized('原型', 'Prototype')],
    output: localized(
      '一个确定性的纯本地模拟：五个可见的规划阶段，没有任何网络请求，也不会伪造模型输出。计划始终标注为演示。',
      'A deterministic, local-only simulation: five visible planning stages, no network calls and no fabricated model output. The plan is always labelled as a demo.',
    ),
    steps: [
      {
        id: 's1',
        label: localized('勾勒计划模型', 'Sketch the plan model'),
        detail: localized(
          '已定义五阶段的模拟计划。',
          'Five-stage simulated plan defined.',
        ),
        status: 'done',
      },
      {
        id: 's2',
        label: localized('搭建时间线界面', 'Build the timeline UI'),
        detail: localized(
          '阶段切换与进度状态已完成。',
          'Stage transitions and progress states complete.',
        ),
        status: 'done',
      },
      {
        id: 's3',
        label: localized('验证无网络请求', 'Verify no network calls'),
        detail: localized(
          '已确认：模拟完全在本地运行。',
          'Confirmed — simulation is fully local.',
        ),
        status: 'done',
      },
    ],
  },
  {
    id: 't-1007',
    title: localized('绘制智能体交接图', 'Create the agent handoff diagram'),
    description: localized(
      '呈现一个请求如何在调研、编码与写作智能体之间传递而不丢失上下文。',
      'Visualise how a request moves between Research, Coding and Writing without losing context.',
    ),
    agentId: 'research',
    status: 'completed',
    priority: 'low',
    progress: 100,
    updatedAt: localized('周三', 'Wed'),
    createdAt: localized('周一 16:30', 'Mon, 16:30'),
    dueLabel: localized('已完成', 'Completed'),
    origin: 'demo',
    tags: [localized('系统', 'Systems'), localized('调研', 'Research')],
    output: localized(
      '一张三栏式交接图，标注明确的上下文检查点。以静态矢量图形式为演示构建。',
      'A three-column handoff map with explicit context checkpoints. Built as a static vector diagram for the demo.',
    ),
    steps: [
      {
        id: 's1',
        label: localized('收集交接案例', 'Collect handoff examples'),
        detail: localized(
          '已收集三个代表性流程。',
          'Three representative flows collected.',
        ),
        status: 'done',
      },
      {
        id: 's2',
        label: localized('起草示意图', 'Draft the diagram'),
        detail: localized('三栏布局已优化。', 'Three-column layout refined.'),
        status: 'done',
      },
      {
        id: 's3',
        label: localized('添加上下文检查点', 'Add context checkpoints'),
        detail: localized(
          '已在智能体之间加入审核关卡。',
          'Review gates added between agents.',
        ),
        status: 'done',
      },
    ],
  },
];
