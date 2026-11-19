import type { NotesMessages } from '@/i18n/messages/en/notes';

const notes = {
  'notes.title': '备忘录',
  'notes.localOnly': '仅限此窗口 · 不同步',
  'notes.newNote': '新建笔记',
  'notes.listTitle': '笔记',
  'notes.emptyList': '还没有笔记。点击“新建笔记”开始记录。',
  'notes.sessionOnly': '仅限本次会话 · 演示笔记',
  'notes.localDemo': '本地演示',
  'notes.savedLocally': '已本地保存',
  'notes.savingLocally': '正在本地保存…',
  'notes.deleteNote': '删除笔记',
  'notes.titleAria': '笔记标题',
  'notes.untitled': '无标题笔记',
  'notes.edited': '编辑于 {time} · 本地演示',
  'notes.bodyAria': '笔记正文',
  'notes.bodyPlaceholder': '开始书写。这条笔记不会离开此窗口。',
  'notes.emptySnippet': '空白笔记',
  'notes.wordCountOne': '{count} 个词',
  'notes.wordCount': '{count} 个词',
  'notes.charCountOne': '{count} 个字符',
  'notes.charCount': '{count} 个字符',
  'notes.emptyTitle': '此窗口没有笔记',
  'notes.emptyDescription':
    '创建一条本地演示笔记 — 它仅存在于这个窗口，关闭后即消失。',
  'notes.updated.justNow': '刚刚',
  'notes.seed.morningBrief.title': '晨间简报',
  'notes.seed.morningBrief.body':
    '今天值得关注的三件事：\n- 和团队一起审阅指挥中心的计划\n- 午饭前完成每周回顾初稿\n- 询问新版引导文案的情况\n\n本页所有内容都是本地演示笔记，不会同步或发送到任何地方。',
  'notes.seed.morningBrief.updated': '上午 9:41',
  'notes.seed.quietIdeas.title': '安静的想法',
  'notes.seed.quietIdeas.body':
    '一眼就能看到天气，却从不索取定位。\n只留在此设备上的笔记。\n一个说明什么是真实、什么是模拟的设置页。\n\n让桌面保持安静，让细节承载个性。',
  'notes.seed.quietIdeas.updated': '昨天',
  'notes.seed.weekendList.title': '周末清单',
  'notes.seed.weekendList.body':
    '周六\n- 农贸市场，上午 9 点\n- 取回修好的自行车\n- 给妈妈打电话\n\n周日\n- 沿湾散步\n- 读两章书\n- 规划下周',
  'notes.seed.weekendList.updated': '周一',
} satisfies Record<keyof NotesMessages, string>;

export default notes;
