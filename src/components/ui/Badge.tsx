import type { HTMLAttributes, ReactNode } from 'react';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';

export type BadgeTone =
  | 'neutral'
  | 'accent'
  | 'positive'
  | 'warning'
  | 'danger'
  | 'violet'
  | 'demo';

const tones: Record<BadgeTone, string> = {
  neutral: 'border-line/10 bg-line/[0.045] text-ink-2',
  accent: 'border-accent/15 bg-accent/10 text-accent-strong',
  positive: 'border-positive/15 bg-positive/10 text-positive',
  warning: 'border-warning/20 bg-warning/10 text-warning',
  danger: 'border-danger/15 bg-danger/10 text-danger',
  violet: 'border-[#8b7cf6]/20 bg-[#8b7cf6]/10 text-[#7563e8]',
  demo: 'border-line/20 border-dashed bg-transparent text-muted',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
  children: ReactNode;
}

export function Badge({
  tone = 'neutral',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-[3px] text-[10.5px] font-medium leading-4 tracking-[0.01em]',
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <Badge tone="demo" className={cn('uppercase tracking-[0.12em]', className)}>
      {t('common.demoData')}
    </Badge>
  );
}
