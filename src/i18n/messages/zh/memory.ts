import type { MemoryMessages } from '@/i18n/messages/en/memory';

/** 记忆页面文案：概览条、筛选、卡片、暂停状态与页脚。 */
const memory = {
  // 页头
  'memory.eyebrow': '上下文',
  'memory.title': '记忆',
  'memory.description':
    'Aether 对你的了解 —— 完全可见、可检查，并且全部保存在本地。固定重要的内容，也可以随时暂停记忆。',
  'memory.count': '{pinned} 条已固定 · 共 {total} 条',
  'memory.localOnlyNeverSynced': '仅本地 · 永不联网同步',

  // 筛选与搜索
  'memory.filtersAria': '按类别筛选记忆',
  'memory.filter.allCategories': '全部分类',
  'memory.search.placeholder': '搜索记忆、标签、来源',
  'memory.search.label': '搜索记忆',
  'memory.showing': '显示 {visible} / {total} 条演示记忆 · {category}',
  'memory.showingMatching': '显示 {visible} / {total} 条演示记忆 · {category} · 匹配“{query}”',
  'memory.pinnedFirst': '已固定的记忆优先显示',

  // 空状态
  'memory.empty.title': '没有匹配的记忆',
  'memory.empty.searchDescription':
    '你的 {total} 条演示记忆中没有符合“{query}”且属于当前筛选的结果。可以试试某个标签、项目名称，或点击下方重置。',
  'memory.empty.filterDescription':
    '这个分类中还没有演示记忆。试试其他筛选，查看已保存的上下文。',
  'memory.empty.reset': '重置搜索与筛选',

  // 页脚
  'memory.footer.demo': '演示记忆 · 仅保存在本地演示状态中',
  'memory.footer.privacy': '无后端、无模型调用、无遥测。',

  // 概览条
  'memory.summary.aria': '记忆设置概览',
  'memory.summary.title': '设备端上下文',
  'memory.summary.active': '已开启',
  'memory.summary.paused': '已暂停',
  'memory.summary.demoBadge': '演示记忆',
  'memory.summary.description':
    'Aether 只记住你在此处能看到的内容。在这个原型中，记忆只存在于本地演示状态中 —— 不会同步、上传或发送给模型。',
  'memory.summary.pinned': '条已固定',
  'memory.summary.remembered': '条记忆',
  'memory.summary.toggleTitle': '记忆',
  'memory.summary.toggleOn': '开启 · 仅此设备',
  'memory.summary.toggleLabel': '记忆已开启',

  // 卡片
  'memory.card.updated': '更新于 {date}',
  'memory.card.pin': '固定记忆',
  'memory.card.unpin': '取消固定记忆',
  'memory.card.confidenceTitle': '演示置信度分数',

  // 暂停状态
  'memory.paused.aria': '记忆已暂停',
  'memory.paused.title': '记忆已暂停',
  'memory.paused.body': 'Aether 目前不会记录新的上下文。你的 {total} 条演示记忆仍完全按原样保存在本地。',
  'memory.paused.bodyPinned':
    'Aether 目前不会记录新的上下文。你的 {total} 条演示记忆（其中 {pinned} 条已固定）仍完全按原样保存在本地。',
  'memory.paused.enable': '开启记忆',
  'memory.paused.footer': '任何内容都不会离开此设备。你随时可以再次暂停。',

  // 分类
  'memory.category.preference.label': '偏好',
  'memory.category.preference.plural': '偏好',
  'memory.category.preference.sentence': '偏好',
  'memory.category.preference.hint': '你对外观、阅读与体验的偏好',
  'memory.category.project.label': '项目',
  'memory.category.project.plural': '项目',
  'memory.category.project.sentence': '项目',
  'memory.category.project.hint': '进行中工作的范围、方向与边界',
  'memory.category.conversation.label': '对话',
  'memory.category.conversation.plural': '对话',
  'memory.category.conversation.sentence': '对话',
  'memory.category.conversation.hint': '从近期对话中保存的片段',
  'memory.category.system.label': '系统',
  'memory.category.system.plural': '系统',
  'memory.category.system.sentence': '系统',
  'memory.category.system.hint': '本地策略与隐私说明',
} satisfies Record<keyof MemoryMessages, string>;

export default memory;
