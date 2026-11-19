/** Copy for the Memory page: summary band, filters, cards, paused state and footer. */
const memory = {
  // Page header
  'memory.eyebrow': 'Context',
  'memory.title': 'Memory',
  'memory.description':
    'What Aether remembers about you — visible, inspectable and entirely local. Pin what matters, and pause memory whenever you want.',
  'memory.count': '{pinned} pinned · {total} total',
  'memory.localOnlyNeverSynced': 'Local-only · never synced',

  // Filters and search
  'memory.filtersAria': 'Filter memories by category',
  'memory.filter.allCategories': 'all categories',
  'memory.search.placeholder': 'Search memories, tags, sources',
  'memory.search.label': 'Search memories',
  'memory.showing': 'Showing {visible} of {total} demo memories · {category}',
  'memory.showingMatching':
    'Showing {visible} of {total} demo memories · {category} · matching “{query}”',
  'memory.pinnedFirst': 'Pinned memories surface first',

  // Empty states
  'memory.empty.title': 'No memories match',
  'memory.empty.searchDescription':
    'Nothing in your {total} demo memories matches “{query}” with this filter. Try a tag, a project name, or reset below.',
  'memory.empty.filterDescription':
    'There are no demo memories in this category yet. Try another filter to see your saved context.',
  'memory.empty.reset': 'Reset search & filters',

  // Footer
  'memory.footer.demo': 'Demo memory · stored only in local demo state',
  'memory.footer.privacy': 'No backend, no model calls, no telemetry.',

  // Summary band
  'memory.summary.aria': 'Memory settings overview',
  'memory.summary.title': 'On-device context',
  'memory.summary.active': 'Active',
  'memory.summary.paused': 'Paused',
  'memory.summary.demoBadge': 'Demo memory',
  'memory.summary.description':
    'Aether only remembers what you can see here. In this prototype, memories live in local demo state — nothing is synced, uploaded or sent to a model.',
  'memory.summary.pinned': 'pinned',
  'memory.summary.remembered': 'remembered',
  'memory.summary.toggleTitle': 'Memory',
  'memory.summary.toggleOn': 'On · this device',
  'memory.summary.toggleLabel': 'Memory enabled',

  // Cards
  'memory.card.updated': 'Updated {date}',
  'memory.card.pin': 'Pin memory',
  'memory.card.unpin': 'Unpin memory',
  'memory.card.confidenceTitle': 'Demo confidence score',

  // Paused state
  'memory.paused.aria': 'Memory is paused',
  'memory.paused.title': 'Memory is paused',
  'memory.paused.body':
    "Aether isn't holding onto new context right now. Your {total} demo memories stay stored locally, exactly as they were.",
  'memory.paused.bodyPinned':
    "Aether isn't holding onto new context right now. Your {total} demo memories — {pinned} pinned — stay stored locally, exactly as they were.",
  'memory.paused.enable': 'Enable memory',
  'memory.paused.footer': 'Nothing leaves this device. You can pause again at any time.',

  // Categories
  'memory.category.preference.label': 'Preference',
  'memory.category.preference.plural': 'Preferences',
  'memory.category.preference.sentence': 'preferences',
  'memory.category.preference.hint': 'How you like things to look, read and feel',
  'memory.category.project.label': 'Project',
  'memory.category.project.plural': 'Projects',
  'memory.category.project.sentence': 'projects',
  'memory.category.project.hint': 'Scope, direction and guardrails for active work',
  'memory.category.conversation.label': 'Conversation',
  'memory.category.conversation.plural': 'Conversations',
  'memory.category.conversation.sentence': 'conversations',
  'memory.category.conversation.hint': 'Threads saved from recent conversations',
  'memory.category.system.label': 'System',
  'memory.category.system.plural': 'System',
  'memory.category.system.sentence': 'system',
  'memory.category.system.hint': 'Local policy and privacy notes',
} as const;

export type MemoryMessages = typeof memory;
export default memory;
