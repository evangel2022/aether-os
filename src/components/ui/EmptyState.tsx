import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[22px] border border-dashed border-line/15 bg-line/[0.018] text-center',
        compact ? 'px-6 py-8' : 'px-8 py-14',
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl border border-line/10 bg-surface/70 text-muted shadow-[0_8px_20px_-14px_rgb(var(--shadow-tint)/0.4)]">
        <Icon className="size-5" strokeWidth={1.6} />
      </div>
      <h3 className="mt-4 text-[14px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-[12px] leading-relaxed text-muted">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
