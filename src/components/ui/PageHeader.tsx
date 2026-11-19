import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-wrap items-end justify-between gap-x-8 gap-y-4',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="h-px w-6 bg-accent/45" aria-hidden />
            <p className="eyebrow">{eyebrow}</p>
          </div>
        )}
        <h1 className="text-[clamp(1.45rem,2.15vw,1.9rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-[58ch] text-[13px] leading-[1.65] text-ink-2">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      )}
    </header>
  );
}
