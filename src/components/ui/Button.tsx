import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[0_10px_24px_-14px_rgb(var(--accent))] hover:brightness-[1.045] active:brightness-95',
  secondary:
    'border border-line/10 bg-surface/75 text-ink shadow-[0_2px_8px_-6px_rgb(var(--shadow-tint)/0.35)] hover:border-line/20 hover:bg-surface',
  soft: 'bg-accent-soft text-accent-strong hover:bg-accent-soft/75',
  ghost: 'text-ink-2 hover:bg-line/[0.055] hover:text-ink',
  danger: 'bg-danger/10 text-danger hover:bg-danger/[0.16]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 rounded-full px-3 text-[12px]',
  md: 'h-10 gap-2 rounded-full px-[18px] text-[13px]',
  lg: 'h-11 gap-2 rounded-full px-5 text-[13.5px]',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-aether active:scale-[0.985] disabled:pointer-events-none disabled:opacity-45',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
