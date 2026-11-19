import { cn } from '@/lib/cn';

export interface FilterOption<Value extends string> {
  value: Value;
  label: string;
  count?: number;
}

interface FilterPillsProps<Value extends string> {
  options: FilterOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  ariaLabel: string;
  className?: string;
}

export function FilterPills<Value extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: FilterPillsProps<Value>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex w-fit max-w-full flex-wrap items-center gap-1 rounded-full border border-line/[0.06] bg-line/[0.035] p-1',
        className,
      )}
    >
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-medium transition-all duration-200 ease-aether',
              active
                ? 'bg-surface text-ink shadow-[0_1px_4px_rgb(15_23_42/0.1)]'
                : 'text-muted hover:text-ink-2',
            )}
          >
            {option.label}
            {typeof option.count === 'number' && (
              <span
                className={cn(
                  'tabular-nums text-[10px]',
                  active ? 'text-muted' : 'text-muted/70',
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
