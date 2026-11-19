import type { CommandMessages } from '@/i18n/messages/en/command';

const command = {
  'command.eyebrow': 'Aether 智能',
  'command.title': '指挥中心',
  'command.description': '提出目标，先看清计划，再决定是否推进。',
  'command.demoBadge': '演示模拟',
  'command.tasksButton': '任务',

  'command.composer.aria': '指令输入',
  'command.composer.title': '从一个意图开始',
  'command.composer.subtitle': '自然语言输入 · 本地演示，不调用模型',
  'command.composer.inputAria': '向 Aether 提出计划需求',
  'command.composer.placeholder':
    '描述一个目标——一次发布计划、一份复杂的总结、一个产品决定……',
  'command.composer.shortcutToPlan': '生成计划',
  'command.composer.planning': '规划中',
  'command.composer.submit': '生成计划',

  'command.inspiration.aria': '指令灵感',
  'command.inspiration.title': '试用一条演示指令',
  'command.inspiration.description':
    '这些指令会走同一套本地规划流程，不会真的执行任何智能体任务。',
  'command.inspiration.stepOne': '描述目标',
  'command.inspiration.stepTwo': '观察计划生成',
  'command.inspiration.stepThree': '由你亲自审核',

  'command.suggestion.launch.title': '规划发布周',
  'command.suggestion.launch.prompt': '为 Aether OS 原型规划一个从容的三天发布节点。',
  'command.suggestion.launch.hint': '调研 + 写作',
  'command.suggestion.narrative.title': '打磨一段叙事',
  'command.suggestion.narrative.prompt':
    '把调研笔记整理成一段简短的发布叙事，主题是安静的主动性。',
  'command.suggestion.narrative.hint': '写作',
  'command.suggestion.audit.title': '审查一项交互',
  'command.suggestion.audit.prompt':
    '审查窗口管理器的焦点、置顶和恢复等边界情况。',
  'command.suggestion.audit.hint': '编码',
  'command.suggestion.summary.title': '总结这一周',
  'command.suggestion.summary.prompt':
    '总结团队本周做出的决定，并列出仍未解决的问题。',
  'command.suggestion.summary.hint': '调研',

  'command.plan.aria': '模拟计划',
  'command.plan.title': '模拟计划',
  'command.plan.noModel': '未调用模型',
  'command.plan.agentRoute': '演示智能体路由',
  'command.plan.progressAria': '模拟计划进度',
  'command.plan.stages': '{completed}/{total} 个阶段',
  'command.plan.status.running': '本地模拟中',
  'command.plan.status.ready': '可审核',
  'command.plan.status.cancelled': '已停止',
  'command.plan.step.done': '已完成',
  'command.plan.step.now': '进行中',
  'command.plan.step.waiting': '等待中',
  'command.plan.stop': '停止',
  'command.plan.readyTitle': '演示计划已完成，由你决定。',
  'command.plan.readyDescription':
    '任务“{title}”已加入本地任务演示。没有任何真实智能体执行任务。',
  'command.plan.openTasks': '在任务中查看',
  'command.plan.cancelledNote':
    '本次模拟在完成前被停止。没有创建任务，也没有执行任何操作。',

  'command.step.intent.label': '理解意图',
  'command.step.intent.detail': '在演示环境中于本地解析“{prompt}”',
  'command.step.context.label': '收集上下文',
  'command.step.context.detail': '已附加 3 条固定的演示记忆和当前工作区上下文。',
  'command.step.route.label': '分配智能体',
  'command.step.route.detail':
    '已选择{agent}。这是本地路由模拟，不是模型调用。',
  'command.step.draft.label': '起草计划',
  'command.step.draft.detail': '已准备一份包含五个可见步骤的可审核大纲。',
  'command.step.ready.label': '可审核',
  'command.step.ready.detail': '演示计划已完成，模拟任务将加入任务列表。',

  'command.context.aria': '指令上下文',
  'command.context.sessionTitle': '会话上下文',
  'command.context.sessionDescription': '这份演示计划可以参考的内容',
  'command.context.openMemory': '打开记忆',
  'command.context.agentsOnCall': '可调度的智能体',
  'command.context.simulatedAvailability': '模拟可用状态',
  'command.context.meetAgents': '认识这些智能体',
  'command.context.guardrails': '护栏',
  'command.context.guardrailNoNetwork': '不发起网络请求',
  'command.context.guardrailNoModel': '不连接模型或智能体后端',
  'command.context.guardrailVisible': '每个阶段都保持可见',
  'command.context.guardrailReview': '任何行动前都需人工审核',
  'command.context.localDemoOnly': '仅本地演示 · 无系统访问权限',
  'command.context.recentRequests': '最近的演示请求',

  'command.context.run.running': '模拟中',
  'command.context.run.ready': '就绪',
  'command.context.run.cancelled': '已停止',

  'command.task.description':
    '这是由指挥中心演示请求“{prompt}”生成的可审核计划。全部内容均在本地模拟，没有调用模型或智能体后端。',
  'command.task.due': '待审核',
  'command.task.tagCommandDemo': '指令演示',
  'command.task.tagSimulated': '模拟',
  'command.task.output':
    '确定性的演示输出。该计划由界面模拟层从本地模板拼装，不是由语言模型生成的。',
  'command.notification.title': '演示计划已可审核',
  'command.notification.body': '{agent}模拟了一份计划：“{title}”。',
} satisfies Record<keyof CommandMessages, string>;

export default command;
