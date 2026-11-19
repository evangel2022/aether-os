import { TONE_GRADIENTS } from '@/data/apps';
import { cn } from '@/lib/cn';
import type { AppDefinition } from '@/types';

type AppIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'dock';

const sizes: Record<AppIconSize, string> = {
  xs: 'size-7 rounded-[8px] [&_svg]:size-3.5',
  sm: 'size-9 rounded-[10px] [&_svg]:size-[18px]',
  md: 'size-11 rounded-[13px] [&_svg]:size-[22px]',
  lg: 'size-14 rounded-[16px] [&_svg]:size-7',
  xl: 'size-[68px] rounded-[20px] [&_svg]:size-[33px]',
  dock: 'size-[52px] rounded-[15px] [&_svg]:size-[26px]',
};

interface AppIconProps {
  app: AppDefinition;
  size?: AppIconSize;
  className?: string;
}

export function AppIcon({ app, size = 'md', className }: AppIconProps) {
  const Icon = app.icon;
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden shadow-[0_8px_16px_-9px_rgb(15_30_55/0.5),0_1px_0_rgb(255_255_255/0.45)_inset]',
        sizes[size],
        className,
      )}
    >
      <span
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          TONE_GRADIENTS[app.tone],
        )}
      />
      <span className="absolute inset-0 bg-gradient-to-b from-white/28 via-white/[0.03] to-black/[0.14]" />
      <span className="absolute -inset-x-[20%] top-0 h-[46%] rounded-[100%] bg-gradient-to-b from-white/30 to-transparent blur-[3px]" />
      <Icon
        className="relative text-white drop-shadow-[0_1px_2px_rgb(10_30_60/0.32)]"
        strokeWidth={1.65}
      />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25" />
    </span>
  );
}
