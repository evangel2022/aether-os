import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padded?: boolean;
}

export function Card({
  interactive = false,
  padded = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'glass-card relative rounded-[22px]',
        padded && 'p-5',
        interactive && 'card-lift cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
