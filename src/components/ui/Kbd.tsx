import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Kbd({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        'inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[5px] border border-line/12 bg-line/[0.04] px-1 font-sans text-[9.5px] font-medium text-muted shadow-[0_1px_0_rgb(var(--line)/0.05)]',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
