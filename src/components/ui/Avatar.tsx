import { getInitials } from '@/lib/format';
import { cn } from '@/lib/cn';

type AvatarTone = 'blue' | 'iris' | 'teal' | 'sand' | 'slate';

const tones: Record<AvatarTone, string> = {
  blue: 'from-[#7cc7ff] to-[#1677ff] text-white',
  iris: 'from-[#c9c3ff] to-[#7160e8] text-white',
  teal: 'from-[#a5efe2] to-[#1ba99d] text-white',
  sand: 'from-[#ffe4b0] to-[#db9b38] text-[#4c3411]',
  slate: 'from-[#d6dce7] to-[#7b879b] text-white',
};

const sizes = {
  sm: 'size-7 text-[10px]',
  md: 'size-9 text-[11px]',
  lg: 'size-12 text-[14px]',
  xl: 'size-16 text-[18px]',
};

interface AvatarProps {
  name: string;
  tone?: AvatarTone;
  size?: keyof typeof sizes;
  className?: string;
  status?: 'online' | 'busy' | 'away';
}

export function Avatar({
  name,
  tone = 'blue',
  size = 'md',
  className,
  status,
}: AvatarProps) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br font-semibold tracking-[-0.02em] shadow-[0_1px_0_rgb(255_255_255/0.35)_inset,0_2px_8px_-3px_rgb(15_23_42/0.28)] ring-1 ring-black/[0.04]',
          tones[tone],
          sizes[size],
        )}
        aria-hidden
      >
        {getInitials(name)}
      </span>
      {status && (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-surface',
            status === 'online' && 'bg-positive',
            status === 'busy' && 'bg-warning',
            status === 'away' && 'bg-muted',
          )}
        />
      )}
      <span className="sr-only">{name}</span>
    </span>
  );
}
