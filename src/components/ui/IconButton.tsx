import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '@/lib/cn';

type IconButtonVariant = 'ghost' | 'soft' | 'glass' | 'danger';
type IconButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<IconButtonVariant, string> = {
  ghost: 'text-ink-2 hover:bg-line/[0.06] hover:text-ink',
  soft: 'bg-accent-soft text-accent-strong hover:bg-accent-soft/75',
  glass:
    'border border-line/10 bg-surface/65 text-ink-2 shadow-[0_2px_10px_-8px_rgb(var(--shadow-tint)/0.5)] backdrop-blur-xl hover:border-line/20 hover:bg-surface hover:text-ink',
  danger: 'bg-danger/10 text-danger hover:bg-danger/15',
};

const sizes: Record<IconButtonSize, string> = {
  sm: 'h-7 w-7 rounded-lg [&_svg]:size-3.5',
  md: 'h-9 w-9 rounded-xl [&_svg]:size-[17px]',
  lg: 'h-10 w-10 rounded-[13px] [&_svg]:size-[18px]',
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  className,
  children,
  type = 'button',
  ref,
  ...props
}: IconButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={props.title ?? label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-all duration-200 ease-aether active:scale-95 disabled:pointer-events-none disabled:opacity-40',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
