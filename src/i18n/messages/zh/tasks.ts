import type { TasksMessages } from '@/i18n/messages/en/tasks';

const tasks = {
  'tasks.title': '任务',
  'tasks.eyebrow': '工作推进中',
  'tasks.description':
    '智能体正在推进的一切——计划、进度与审核。在指挥中心创建的模拟任务会自动出现在这里。',
  'tasks.newPlan': '新建计划',
  'tasks.simulatedPlan': '模拟计划',
  'tasks.demoNote':
    '演示数据 · “模拟计划”任务由指挥中心的模拟流程在本地拼装，而非由模型生成。',
  'tasks.demoNote.simulated.one': '列表中有 {count} 个模拟计划。',
  'tasks.demoNote.simulated.other': '列表中有 {count} 个模拟计划。',

  'tasks.embeddedSummary': '{tasks} · {active} 个进行中 · {review} 个待审核',
  'tasks.count.one': '{count} 个任务',
  'tasks.count.other': '{count} 个任务',
  'tasks.summary.search': '{tasks}匹配“{query}”',
  'tasks.summary.searchInFilter': '{filter} · {tasks}匹配“{query}”',
  'tasks.summary.filtered': '{filter}任务 · {filtered}/{total}',
  'tasks.summary.all': '{tasks} · {active} 个进行中 · {review} 个待审核 · {completed} 个已完成',

  'tasks.search.placeholder': '搜索任务、智能体或标签',
  'tasks.search.aria': '搜索任务',
  'tasks.filter.aria': '按状态筛选任务',

  'tasks.empty.searchTitle': '没有匹配的任务',
  'tasks.empty.title': '暂无任务',
  'tasks.empty.filteredTitle.in_progress': '暂无进行中的任务',
  'tasks.empty.filteredTitle.queued': '暂无排队中的任务',
  'tasks.empty.filteredTitle.review': '暂无待审核的任务',
  'tasks.empty.filteredTitle.completed': '暂无已完成的任务',
  'tasks.empty.searchDescription': '“{query}”没有匹配结果。换个关键词，或清除筛选查看全部内容。',
  'tasks.empty.searchDescriptionFiltered':
    '当前视图中没有与“{query}”匹配的结果。换个关键词，或清除筛选查看全部内容。',
  'tasks.empty.description':
    '新的工作会出现在这里。在指挥中心创建的计划会自动以模拟任务的形式出现。',

  'tasks.row.updated': '更新于 {time}',
  'tasks.progressLabel': '{title} 进度',

  'tasks.step.done': '已完成',
  'tasks.step.active': '进行中',
  'tasks.step.pending': '待开始',

  'tasks.detail.eyebrow': '任务详情 · 演示',
  'tasks.detail.fallbackTitle': '任务',
  'tasks.detail.progress': '进度',
  'tasks.detail.simulatedNote':
    '此计划由指挥中心的演示在本地创建——由 UI 模拟层用静态模板拼装，而非由模型生成。全程没有发起网络请求。',
  'tasks.detail.planTimeline': '计划时间线',
  'tasks.detail.stepsComplete': '{done}/{total} 已完成',
  'tasks.detail.output': '产出',
  'tasks.detail.details': '详情',
  'tasks.detail.origin': '来源',
  'tasks.detail.agent': '智能体',
  'tasks.detail.created': '创建时间',
  'tasks.detail.updated': '更新时间',
  'tasks.detail.due': '截止时间',
  'tasks.detail.tags': '标签',
  'tasks.detail.roleSuffix': '{role} · 模拟',
  'tasks.origin.demo': '演示库',
  'tasks.origin.demoTask': '演示库任务',
  'tasks.detail.demoNote':
    '演示数据 · 任务为静态示例，模拟计划在浏览器本地生成，全程没有真实智能体参与。',
  'tasks.detail.footerNote': '本地模拟 · 未向任何地方发送数据。',
} satisfies Record<keyof TasksMessages, string>;

export default tasks;
