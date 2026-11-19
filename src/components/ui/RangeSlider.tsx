import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  icon?: ReactNode;
  showValue?: boolean;
  className?: string;
  min?: number;
  max?: number;
}

export function RangeSlider({
  value,
  onChange,
  label,
  icon,
  showValue = false,
  className,
  min = 0,
  max = 100,
}: RangeSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex items-center justify-between text-[11px] text-muted">
        <span className="flex items-center gap-1.5 font-medium text-ink-2">
          {icon}
          {label}
        </span>
        {showValue && <span className="tabular-nums">{Math.round(value)}%</span>}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number(event.target.value))}
        className="aether-range h-1.5 cursor-pointer"
        style={{ '--range': `${percentage}%` } as CSSProperties}
      />
    </div>
  );
}
