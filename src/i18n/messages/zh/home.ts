import type { HomeMessages } from '@/i18n/messages/en/home';

const home = {
  'home.greeting.late': '夜深了，{name}。',
  'home.greeting.morning': '早上好，{name}。',
  'home.greeting.afternoon': '下午好，{name}。',
  'home.greeting.evening': '晚上好，{name}。',
  'home.greeting.winding': '该放松一下了，{name}。',
  'home.demoWorkspace': '演示工作区',
  'home.summary': '{working} 个智能体正在推进工作，{waiting} 个等待你的审核。',
  'home.localDemoNote': '这里的全部内容均为本地演示数据。',
  'home.systemsCalm': '系统运行平稳',
  'home.openCommandCenter': '打开指挥中心',

  'home.command.title': 'Aether 指令',
  'home.command.subtitle': '全局模拟指令栏',
  'home.command.anywhere': '任意位置',
  'home.command.heading': '今天想完成什么？',
  'home.command.description':
    '用你自己的话描述一个目标。Aether 会先展示计划，再开始推进。',
  'home.command.descriptionCompact': '描述一个目标，Aether 会先展示计划。',
  'home.command.placeholder': '规划一次发布、审查一项交互……',
  'home.command.inputAria': '向 Aether 提出计划需求',
  'home.command.submit': '生成计划',
  'home.command.localSimulation': '本地模拟 · 未调用模型',

  'home.quickActions.title': '快捷操作',
  'home.quickActions.ask': '询问 Aether',
  'home.quickActions.askHint': '生成一个计划',
  'home.quickActions.files': '文件',
  'home.quickActions.filesHint': '浏览演示文件',
  'home.quickActions.notes': '备忘录',
  'home.quickActions.notesHint': '记录一个想法',
  'home.quickActions.agents': '智能体',
  'home.quickActions.agentsHint': '查看谁在工作',

  'home.system.title': '系统',
  'home.system.demo': '演示',
  'home.system.battery': '电量',
  'home.system.storage': '存储',
  'home.system.aria': '演示系统状态',

  'home.recentTasks.title': '最近任务',
  'home.recentTasks.description': '平静查看正在推进的演示工作',
  'home.recentTasks.viewAll': '查看全部',
  'home.recentTasks.simulatedShort': '模拟',
  'home.recentTasks.openAria': '打开任务：{title}',

  'home.agents.title': '智能体',
  'home.agents.subtitle': '{working} 个执行中 · 模拟演示状态',
  'home.agents.meetTeam': '认识团队',
  'home.agents.viewAria': '查看{name}状态',

  'home.memory.title': '已记住的上下文',
  'home.memory.description': '已固定的演示记忆，随时可用于下一次请求',
  'home.memory.button': '记忆',
  'home.memory.contextLabel': '上下文',
  'home.memory.openAria': '打开记忆：{title}',

  'home.activity.title': '近期动态',
  'home.activity.description': '最近一小时的模拟动态',
  'home.activity.button': '智能体',
  'home.activity.simulated': '模拟',

  'home.footer.disclaimer':
    'Aether UI-1 原型 · 智能体活动、任务与系统数据均为模拟',
  'home.footer.tagline': '为更从容的计算而设计',
} satisfies Record<keyof HomeMessages, string>;

export default home;
