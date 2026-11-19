import { cn } from '@/lib/cn';

type ProgressTone = 'accent' | 'positive' | 'warning' | 'neutral';
type ProgressSize = 'xs' | 'sm' | 'md';

const toneClasses: Record<ProgressTone, string> = {
  accent: 'bg-accent',
  positive: 'bg-positive',
  warning: 'bg-warning',
  neutral: 'bg-ink-2/70',
};

const sizeClasses: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
};

interface ProgressProps {
  value: number;
  tone?: ProgressTone;
  size?: ProgressSize;
  label?: string;
  className?: string;
  trackClassName?: string;
}

export function Progress({
  value,
  tone = 'accent',
  size = 'sm',
  label,
  className,
  trackClassName,
}: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(safeValue)}
      aria-label={label}
      className={cn(
        'w-full overflow-hidden rounded-full bg-line/[0.075]',
        sizeClasses[size],
        trackClassName,
        className,
      )}
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-500 ease-aether',
          toneClasses[tone],
        )}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
