import { describe, expect, it } from 'vitest';
import { deriveTaskTitle, formatClock, getInitials, pct, truncate } from '@/lib/format';

describe('format helpers', () => {
  it('creates a concise title from a natural-language prompt', () => {
    expect(deriveTaskTitle('Please plan a calm three-day launch moment.')).toBe(
      'Plan a calm three-day launch moment',
    );
  });

  it('truncates long text with an ellipsis', () => {
    const result = truncate('A'.repeat(80), 20);
    expect(result).toHaveLength(20);
    expect(result.endsWith('…')).toBe(true);
  });

  it('calculates safe percentages', () => {
    expect(pct(186, 512)).toBe(36);
    expect(pct(5, 0)).toBe(0);
    expect(pct(-2, 10)).toBe(0);
  });

  it('builds initials and a readable clock', () => {
    expect(getInitials('Avery Chen')).toBe('AC');
    expect(formatClock(new Date(2026, 10, 20, 14, 5), false)).toContain('2:05');
  });
});
