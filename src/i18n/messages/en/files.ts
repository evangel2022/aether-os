/** Copy for the Files workspace: page header, sidebar, toolbar, list, grid and preview. */
const files = {
  // Page header
  'files.eyebrow': 'Your workspace',
  'files.title': 'Files',
  'files.description':
    'A calm, local demo workspace. Browse a simulated drive — every folder and file here is demo data, never your disk.',
  'files.browser': 'File browser',

  // Sidebar
  'files.sidebar.aria': 'File locations',
  'files.sidebar.favorites': 'Favorites',
  'files.sidebar.locations': 'Locations',
  'files.sidebar.file': 'file',
  'files.sidebar.storage.title': 'Demo storage',
  'files.sidebar.storage.label': 'Demo storage used',
  'files.sidebar.storage.summary': '{used} GB of {total} GB · simulated',

  // Toolbar
  'files.toolbar.back': 'Back to parent folder',
  'files.toolbar.breadcrumb': 'Breadcrumb',
  'files.toolbar.searchPlaceholder': 'Search demo drive',
  'files.toolbar.searchLabel': 'Search demo files',
  'files.toolbar.view': 'File view',
  'files.view.list': 'List',
  'files.view.grid': 'Grid',

  // Status footer under the browser
  'files.footer.localOnly': 'Demo workspace · local only',
  'files.footer.search.one': '{count} result across the drive',
  'files.footer.search.other': '{count} results across the drive',
  'files.footer.stats': '{folders} · {files}',

  // Empty states
  'files.empty.search.title': 'No matches for “{query}”',
  'files.empty.search.description':
    "Search covers the whole demo drive. Try a file name, a folder, a tag or a phrase from a document's contents.",
  'files.empty.search.action': 'Clear search',
  'files.empty.folder.title': 'This folder is empty',
  'files.empty.folder.description': 'There are no demo items in this folder yet.',
  'files.empty.folder.action': 'Go up',

  // List headers, row tooltips and counts
  'files.list.name': 'Name',
  'files.list.modified': 'Modified',
  'files.list.size': 'Size',
  'files.list.resultsPrefix': 'Results for ',
  'files.list.resultsSuffix': '',
  'files.row.openFolder': 'Open {name}',
  'files.row.folderHint': '{name} — folder, double-click to open',
  'files.count.item.one': '{count} item',
  'files.count.item.other': '{count} items',
  'files.count.folder.one': '{count} folder',
  'files.count.folder.other': '{count} folders',
  'files.count.file.one': '{count} file',
  'files.count.file.other': '{count} files',
  'files.count.result.one': '{count} result',
  'files.count.result.other': '{count} results',

  // File types and shared badges
  'files.type.folder': 'Folder',
  'files.type.document': 'Document',
  'files.type.code': 'Code',
  'files.type.image': 'Image',
  'files.type.archive': 'Archive',
  'files.type.audio': 'Audio',
  'files.type.data': 'Data',
  'files.starred': 'Starred',
  'files.grid.meta': '{type} · {size}',

  // Preview panel
  'files.preview.aria': 'File preview',
  'files.preview.title': 'Preview',
  'files.preview.clear': 'Clear preview',
  'files.preview.fact.type': 'Type',
  'files.preview.fact.modified': 'Modified',
  'files.preview.fact.size': 'Size',
  'files.preview.fact.origin': 'Origin',
  'files.preview.originDemo': 'Demo only',
  'files.preview.imageAbout': 'About this image',
  'files.preview.codeExcerpt': 'Source excerpt',
  'files.preview.contents': 'Contents',
  'files.preview.imageNote': 'Abstract placeholder artwork — no image file is loaded.',
  'files.preview.openFolder': 'Open folder',
  'files.preview.showInFolder': 'Show in folder',
  'files.preview.demoFooter': 'Demo file · read-only preview · nothing is read from disk',
  'files.preview.currentFolder': 'Current folder',
  'files.preview.updated': 'Updated {date}',
  'files.preview.description':
    'A local demo folder in {drive}. Select a file to preview its contents, or open a folder to keep browsing.',
  'files.preview.inThisFolder': 'In this folder',
  'files.preview.folderFooter': 'Demo workspace · local only · nothing is read from disk',
  'files.preview.emptyTitle': 'Nothing selected',
  'files.preview.emptyDescription':
    'Choose a result to inspect it here. Folder results open from the preview.',
  'files.preview.searchingNote': 'Searching across all of {drive} · {count} in {folder}.',

  // Screen-reader announcements
  'files.sr.search.one': '{count} search result for {query}',
  'files.sr.search.other': '{count} search results for {query}',
  'files.sr.folder.one': '{folder} contains {count} item',
  'files.sr.folder.other': '{folder} contains {count} items',
} as const;

export type FilesMessages = typeof files;
export default files;
