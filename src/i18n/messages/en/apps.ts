const apps = {
  'apps.eyebrow': 'The collection',
  'apps.title': 'Apps',
  'apps.description':
    'Every Aether app has one job and opens as a floating window on this simulated desktop. Launch one, move it around, and close it from the title bar.',
  'apps.searchPlaceholder': 'Search apps',
  'apps.searchAria': 'Search apps',
  'apps.library': 'App library',
  'apps.libraryDescription':
    '{count} local apps. Every launch creates a real demo window — one per app.',
  'apps.filteredCount': '{shown} of {total} apps',
  'apps.windowsOpenOne': '{count} window open',
  'apps.windowsOpen': '{count} windows open',
  'apps.emptyTitle': 'No apps match “{query}”',
  'apps.emptyDescription':
    'Try a different name or clear the search to see all eight apps in the library.',
  'apps.infoNote':
    'App windows are simulated locally. Closed apps return to this library, running apps show a status badge, and launching a running app brings its window forward instead of opening a duplicate. No installs, downloads or network calls happen in this prototype.',
  'apps.windowSize': '{width} × {height} window',
  'apps.launchAria': 'Launch {name} — {tagline}',
  'apps.bringForwardAria': 'Bring {name} forward — {tagline}',
} as const;

export type AppsMessages = typeof apps;
export default apps;
