const settings = {
  'settings.eyebrow': 'Personal',
  'settings.title': 'Settings',
  'settings.description':
    'Appearance, desktop behaviour, privacy and system. Every preference is local to this prototype and saved in this browser.',
  'settings.savedInBrowser': 'Saved in this browser',
  'settings.resetDemo': 'Reset demo',
  'settings.resetShortcutTitle': 'Jump to the reset confirmation in Privacy',
  'settings.navAria': 'Settings sections',
  'settings.sections': 'Sections',
  'settings.footerVersion': 'UI-1 · 0.1.0',
  'settings.footerBuild': 'Local demo build',

  'settings.tabs.appearance.label': 'Appearance',
  'settings.tabs.appearance.description': 'Theme & wallpaper',
  'settings.tabs.desktop.label': 'Desktop',
  'settings.tabs.desktop.description': 'Dock & interface',
  'settings.tabs.privacy.label': 'Privacy',
  'settings.tabs.privacy.description': 'Memory & reset',
  'settings.tabs.system.label': 'System',
  'settings.tabs.system.description': 'Device & build',

  'settings.language.title': 'Language',
  'settings.language.description':
    'Choose the language for Aether OS. The interface and all demo data update immediately.',
  'settings.language.groupAria': 'Interface language',
  'settings.language.zhLabel': 'Simplified Chinese',
  'settings.language.enLabel': 'English',
  'settings.language.zhHint': 'Interface and demo data in Simplified Chinese.',
  'settings.language.enHint': 'Interface and demo data in English.',
  'settings.language.current': 'Current',
  'settings.language.saved': 'The choice is saved in this browser.',

  'settings.appearance.title': 'Theme',
  'settings.appearance.description': 'Applied to the whole desktop the moment you choose it.',
  'settings.appearance.groupAria': 'Theme',
  'settings.appearance.light.label': 'Light',
  'settings.appearance.light.description': 'Bright surfaces',
  'settings.appearance.dark.label': 'Dark',
  'settings.appearance.dark.description': 'Dimmed surfaces',
  'settings.appearance.system.label': 'System',
  'settings.appearance.system.description': 'Follows the OS',
  'settings.appearance.accentTitle': 'Accent colour',
  'settings.appearance.accentDescription':
    'Used for selection, focus rings and the primary action across apps.',
  'settings.appearance.accentGroupAria': 'Accent colour',
  'settings.appearance.accentAria': '{label} accent',
  'settings.appearance.accent.blue': 'Aether Blue',
  'settings.appearance.accent.iris': 'Iris',
  'settings.appearance.accent.teal': 'Teal',
  'settings.appearance.accent.graphite': 'Graphite',
  'settings.appearance.wallpaperTitle': 'Wallpaper',
  'settings.appearance.wallpaperDescription':
    'A quiet backdrop behind your windows. Preview adapts to the current theme.',
  'settings.appearance.wallpaperGroupAria': 'Wallpaper',
  'settings.appearance.wallpaper.dawn.label': 'Dawn',
  'settings.appearance.wallpaper.dawn.description': 'Cool blue with a warm horizon',
  'settings.appearance.wallpaper.mist.label': 'Mist',
  'settings.appearance.wallpaper.mist.description': 'Soft coastal greys and teal',
  'settings.appearance.wallpaper.linen.label': 'Linen',
  'settings.appearance.wallpaper.linen.description': 'Warm paper with a cool edge',
  'settings.appearance.localNote':
    'Appearance preferences live in this browser only. Nothing is sent to a server.',

  'settings.desktop.title': 'Desktop behaviour',
  'settings.desktop.description': 'Small switches that change how the demo desktop feels.',
  'settings.desktop.dockMagnification.label': 'Dock magnification',
  'settings.desktop.dockMagnification.description':
    'Icons grow as the pointer moves across the Dock.',
  'settings.desktop.showSeconds.label': 'Show clock seconds',
  'settings.desktop.showSeconds.description': 'Adds seconds to the menu bar clock.',
  'settings.desktop.reduceMotion.label': 'Reduce motion',
  'settings.desktop.reduceMotion.description':
    'Trims window, Dock and overlay animations across the demo.',
  'settings.desktop.note':
    'Every switch takes effect immediately. Preferences are stored in this browser by the demo settings provider.',
  'settings.desktop.windows.title': 'Windows',
  'settings.desktop.windows.description':
    'Aether keeps simulated windows instead of real application processes.',
  'settings.desktop.windows.openTitle': 'Open windows',
  'settings.desktop.windows.openDescription':
    'One window per app. Launching a running app brings it forward.',
  'settings.desktop.windows.controlsTitle': 'Drag, pin, maximise',
  'settings.desktop.windows.controlsDescription':
    'Window controls are interactive here: drag the title bar, pin a window on top or maximise it. Nothing outside this browser is affected.',

  'settings.privacy.title': 'Memory & context',
  'settings.privacy.description':
    'Demo preferences only — nothing here changes a real system.',
  'settings.privacy.memory.label': 'Enable Memory',
  'settings.privacy.memory.description':
    'Lets Aether reference saved context in this prototype session.',
  'settings.privacy.localOnly.label': 'Keep everything local',
  'settings.privacy.localOnly.description':
    'A demo preference: this prototype has no network path for your data.',
  'settings.privacy.note':
    'These two switches are honest preferences, but they are not enforcement. Aether OS is a UI prototype — the seeded content you see already lives only in this browser tab.',
  'settings.privacy.localTitle': 'Local by design',
  'settings.privacy.localHeadline': 'Memory is local to this demo',
  'settings.privacy.localDescription':
    'There is no memory service, no account and no sync. The Memory page reads seeded demo items so the interface feels real; everything disappears on refresh.',
  'settings.privacy.localFact1':
    'Seeded memories live in React state for this browser session.',
  'settings.privacy.localFact2':
    'No model, backend or analytics call ever receives them.',
  'settings.privacy.localFact3':
    'Resetting restores the seeds and default preferences instantly.',
  'settings.privacy.reset.title': 'Reset demo',
  'settings.privacy.reset.description': 'Put the prototype back to its seeded starting point.',
  'settings.privacy.reset.rowTitle': 'Reset demo data & settings',
  'settings.privacy.reset.rowDescription':
    'Restores seeded tasks, memories and notifications and returns appearance, accent, wallpaper, language and desktop switches to defaults.',
  'settings.privacy.reset.start': 'Reset…',
  'settings.privacy.reset.confirmTitle': 'Reset this demo session?',
  'settings.privacy.reset.confirmDescription':
    'Seeded tasks, memories and notifications are restored, and appearance, accent, wallpaper, language and desktop switches return to defaults. Notes typed inside the Notes window are not affected. This cannot be undone.',
  'settings.privacy.reset.confirm': 'Yes, reset everything',
  'settings.privacy.reset.doneTitle': 'Demo restored',
  'settings.privacy.reset.doneDescription':
    'Seeded data and default preferences are back. Theme, accent, wallpaper and language were reapplied to the live desktop.',
  'settings.privacy.reset.note':
    'No confirmation dialog or system permission appears — this is a self-contained UI demo, and reset only touches local prototype state.',
  'settings.privacy.reset.detailPrefix': 'Reset calls',
  'settings.privacy.reset.detailDemo': 'demo data',
  'settings.privacy.reset.detailMiddle': 'and',
  'settings.privacy.reset.detailSettings': 'settings',
  'settings.privacy.reset.detailSuffix': 'stores — no window.confirm, no network.',

  'settings.system.device.title': 'Device snapshot',
  'settings.system.device.description':
    'Simulated telemetry for the demo desktop — not a real device reading.',
  'settings.system.device.battery': 'Battery',
  'settings.system.device.charging': 'Charging',
  'settings.system.device.onBattery': 'On battery',
  'settings.system.device.network': 'Network',
  'settings.system.device.connected': 'Connected · demo SSID',
  'settings.system.device.storage': 'Storage',
  'settings.system.device.storageHint': 'of {total} GB · {used}% used',
  'settings.system.device.memory': 'Memory',
  'settings.system.device.memoryHint': 'In use',
  'settings.system.device.cpu': 'CPU',
  'settings.system.device.cpuHint': 'Light load',
  'settings.system.device.uptime': 'Uptime',
  'settings.system.device.uptimeHint': 'This demo session',
  'settings.system.device.usageAria': '{label} usage',
  'settings.system.device.notePrefix':
    'Battery, network, storage, memory and CPU values are fixed fixtures in',
  'settings.system.device.noteSuffix': '. They never update.',
  'settings.system.about.title': 'About Aether OS',
  'settings.system.about.description': 'Version and build information for this prototype.',
  'settings.system.about.tagline':
    'An AI-native desktop concept, built as a local UI prototype.',
  'settings.system.about.version': 'Version',
  'settings.system.about.versionValue': 'UI-1 · 0.1.0',
  'settings.system.about.build': 'Build',
  'settings.system.about.buildValue': 'Local demo',
  'settings.system.about.interface': 'Interface',
  'settings.system.about.interfaceValue': 'React 19 · Vite · Tailwind',
  'settings.system.about.state': 'State',
  'settings.system.about.stateValue': 'Browser session only',
  'settings.system.about.prototypeTitle': 'A UI prototype, not an operating system',
  'settings.system.about.prototypeBody':
    'There is no backend, no language model and no network access. Every agent, task, command result and weather reading is seeded demo data or a deterministic local simulation. Nothing is installed, nothing is sent, and no real system setting changes.',
  'settings.system.about.demoNoticeTitle': 'Demo data.',
  'settings.system.about.demoNoticeBody':
    'All names, agents, tasks, files, memories and device readings in Aether OS are fixtures for demonstration. They do not describe a real person or machine.',
} as const;

export type SettingsMessages = typeof settings;
export default settings;
