import type { FilesMessages } from '@/i18n/messages/en/files';

/** 文件工作区文案：页头、侧边栏、工具栏、列表、网格与预览面板。 */
const files = {
  // 页头
  'files.eyebrow': '你的工作空间',
  'files.title': '文件',
  'files.description':
    '一个安静、完全本地的演示工作空间。浏览模拟硬盘 —— 这里的每个文件夹和文件都是演示数据，绝不会读取你的磁盘。',
  'files.browser': '文件浏览器',

  // 侧边栏
  'files.sidebar.aria': '文件位置',
  'files.sidebar.favorites': '收藏',
  'files.sidebar.locations': '位置',
  'files.sidebar.file': '文件',
  'files.sidebar.storage.title': '演示存储',
  'files.sidebar.storage.label': '演示存储用量',
  'files.sidebar.storage.summary': '已用 {used} GB / 共 {total} GB · 模拟',

  // 工具栏
  'files.toolbar.back': '返回上级文件夹',
  'files.toolbar.breadcrumb': '面包屑导航',
  'files.toolbar.searchPlaceholder': '搜索演示硬盘',
  'files.toolbar.searchLabel': '搜索演示文件',
  'files.toolbar.view': '文件视图',
  'files.view.list': '列表',
  'files.view.grid': '网格',

  // 浏览器状态栏
  'files.footer.localOnly': '演示工作空间 · 仅本地',
  'files.footer.search.one': '{count} 个结果 · 覆盖全盘',
  'files.footer.search.other': '{count} 个结果 · 覆盖全盘',
  'files.footer.stats': '{folders} · {files}',

  // 空状态
  'files.empty.search.title': '没有与“{query}”匹配的结果',
  'files.empty.search.description':
    '搜索范围覆盖整个演示硬盘。可以尝试文件名、文件夹名、标签，或文档内容中的词组。',
  'files.empty.search.action': '清除搜索',
  'files.empty.folder.title': '此文件夹为空',
  'files.empty.folder.description': '这个文件夹里还没有演示项目。',
  'files.empty.folder.action': '返回上级',

  // 列表表头、行提示与数量
  'files.list.name': '名称',
  'files.list.modified': '修改时间',
  'files.list.size': '大小',
  'files.list.resultsPrefix': '搜索',
  'files.list.resultsSuffix': '的结果',
  'files.row.openFolder': '打开 {name}',
  'files.row.folderHint': '{name} — 文件夹，双击打开',
  'files.count.item.one': '{count} 项',
  'files.count.item.other': '{count} 项',
  'files.count.folder.one': '{count} 个文件夹',
  'files.count.folder.other': '{count} 个文件夹',
  'files.count.file.one': '{count} 个文件',
  'files.count.file.other': '{count} 个文件',
  'files.count.result.one': '{count} 个结果',
  'files.count.result.other': '{count} 个结果',

  // 文件类型与共用徽标
  'files.type.folder': '文件夹',
  'files.type.document': '文档',
  'files.type.code': '代码',
  'files.type.image': '图片',
  'files.type.archive': '压缩包',
  'files.type.audio': '音频',
  'files.type.data': '数据',
  'files.starred': '已收藏',
  'files.grid.meta': '{type} · {size}',

  // 预览面板
  'files.preview.aria': '文件预览',
  'files.preview.title': '预览',
  'files.preview.clear': '清除预览',
  'files.preview.fact.type': '类型',
  'files.preview.fact.modified': '修改时间',
  'files.preview.fact.size': '大小',
  'files.preview.fact.origin': '来源',
  'files.preview.originDemo': '仅演示',
  'files.preview.imageAbout': '关于这张图片',
  'files.preview.codeExcerpt': '源码片段',
  'files.preview.contents': '内容',
  'files.preview.imageNote': '抽象占位插画 —— 未加载任何图片文件。',
  'files.preview.openFolder': '打开文件夹',
  'files.preview.showInFolder': '在文件夹中显示',
  'files.preview.demoFooter': '演示文件 · 只读预览 · 绝不读取磁盘',
  'files.preview.currentFolder': '当前文件夹',
  'files.preview.updated': '更新于 {date}',
  'files.preview.description':
    '位于 {drive} 的本地演示文件夹。选择一个文件即可预览其内容，或打开文件夹继续浏览。',
  'files.preview.inThisFolder': '此文件夹中',
  'files.preview.folderFooter': '演示工作空间 · 仅本地 · 绝不读取磁盘',
  'files.preview.emptyTitle': '未选择任何内容',
  'files.preview.emptyDescription': '选择一个搜索结果即可在此查看；文件夹结果可从预览中打开。',
  'files.preview.searchingNote': '正在搜索整个 {drive} · {folder} 共 {count}。',

  // 读屏播报
  'files.sr.search.one': '“{query}” 有 {count} 个搜索结果',
  'files.sr.search.other': '“{query}” 有 {count} 个搜索结果',
  'files.sr.folder.one': '{folder} 包含 {count} 项',
  'files.sr.folder.other': '{folder} 包含 {count} 项',
} satisfies Record<keyof FilesMessages, string>;

export default files;
