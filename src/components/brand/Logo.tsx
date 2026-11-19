import { useId } from 'react';
import { cn } from '@/lib/cn';

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 22, className }: LogoMarkProps) {
  const gradientId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={cn('shrink-0 drop-shadow-[0_2px_4px_rgb(0_80_200/0.25)]', className)}
    >
      <defs>
        <linearGradient id={`bg-${gradientId}`} x1="8" y1="4" x2="58" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#61BCFF" />
          <stop offset="0.5" stopColor="#0B80FF" />
          <stop offset="1" stopColor="#0556D2" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill={`url(#bg-${gradientId})`} />
      <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="16.25" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="10.5" stroke="white" strokeOpacity="0.94" strokeWidth="3.3" />
      <ellipse
        cx="32"
        cy="32"
        rx="20"
        ry="8.4"
        transform="rotate(-28 32 32)"
        stroke="white"
        strokeOpacity="0.82"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="44.6" cy="20.4" r="3" fill="white" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-baseline gap-1.5', className)}>
      <span className="text-[13.5px] font-semibold tracking-[-0.025em] text-topbar-ink">
        Aether
      </span>
      <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-topbar-muted">
        OS
      </span>
    </span>
  );
}
