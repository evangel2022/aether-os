import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface SegmentOption<Value extends string> {
  value: Value;
  label: string;
  icon?: ReactNode;
}

interface SegmentedControlProps<Value extends string> {
  options: SegmentOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  ariaLabel: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function SegmentedControl<Value extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  size = 'md',
  className,
}: SegmentedControlProps<Value>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-line/[0.07] bg-line/[0.035] p-0.5',
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-all duration-200 ease-aether',
              size === 'sm'
                ? 'h-[26px] px-2.5 text-[11px]'
                : 'h-[30px] px-3.5 text-[12px]',
              active
                ? 'bg-surface text-ink shadow-[0_1px_4px_rgb(15_23_42/0.12)]'
                : 'text-muted hover:text-ink-2',
            )}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
