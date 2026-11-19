const isMacPlatform =
  typeof navigator !== 'undefined' &&
  /mac|iphone|ipad|ipod/i.test(navigator.userAgent || navigator.platform || '');

export const isMac = isMacPlatform;
export const modifierSymbol = isMac ? '⌘' : 'Ctrl';
export const commandShortcut = isMac ? '⌘K' : 'Ctrl K';
