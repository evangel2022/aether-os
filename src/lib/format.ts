import type { Locale } from '@/types';

/** Format a clock for the desktop menu bar. */
export function formatClock(
  date: Date,
  showSeconds: boolean,
  locale: Locale = 'en-US',
): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    ...(showSeconds ? { second: '2-digit' } : {}),
    hour12: locale === 'en-US',
    ...(locale === 'zh-CN' ? { hourCycle: 'h23' } : {}),
  }).format(date);
}

/** Format the short date used in the menu bar. */
export function formatMenuDate(date: Date, locale: Locale = 'en-US'): string {
  if (locale === 'zh-CN') {
    const monthDay = new Intl.DateTimeFormat('zh-CN', {
      month: 'numeric',
      day: 'numeric',
    }).format(date);
    const weekday = new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(date);
    return `${monthDay} ${weekday}`;
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/** Format the long date used by the Home welcome area. */
export function formatLongDate(date: Date, locale: Locale = 'en-US'): string {
  if (locale === 'zh-CN') {
    const monthDay = new Intl.DateTimeFormat('zh-CN', {
      month: 'long',
      day: 'numeric',
    }).format(date);
    const weekday = new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(date);
    return `${monthDay} ${weekday}`;
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function truncate(value: string, max = 72): string {
  const clean = value.trim().replace(/\s+/g, ' ');
  if (clean.length <= max) return clean;
  return `${clean.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function titleCase(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Turn a free-form prompt into a short, human-readable demo task title. */
export function deriveTaskTitle(prompt: string): string {
  const cleaned = prompt
    .trim()
    .replace(/^(please|can you|could you|help me|i want to|i'd like to)\s+/i, '')
    .replace(/\s+/g, ' ')
    .replace(/[。．.!?！？]+$/g, '');

  if (!cleaned) return 'A new simulated task';
  const title = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return truncate(title, 58);
}

export function pct(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((value / total) * 100)));
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
