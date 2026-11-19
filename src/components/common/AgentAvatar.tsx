import { Code2, PenLine, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { Agent, AgentId, AgentTone } from '@/types';

const toneStyles: Record<AgentTone, { surface: string; icon: string }> = {
  iris: {
    surface: 'from-[#e6e2ff] via-[#d6d0ff] to-[#beb4fb] dark:from-[#3e3870] dark:via-[#332d5e] dark:to-[#2a254e]',
    icon: 'text-[#6a58d6] dark:text-[#cabfff]',
  },
  azure: {
    surface: 'from-[#ddf0ff] via-[#c5e5ff] to-[#a5d3ff] dark:from-[#1d3b57] dark:via-[#193349] dark:to-[#142b3f]',
    icon: 'text-[#2378c9] dark:text-[#9ed3ff]',
  },
  teal: {
    surface: 'from-[#dbf5ef] via-[#c4ece3] to-[#a5e0d4] dark:from-[#163f3b] dark:via-[#133733] dark:to-[#102e2b]',
    icon: 'text-[#138778] dark:text-[#98e5d7]',
  },
};

const iconById: Record<AgentId, LucideIcon> = {
  research: Search,
  coding: Code2,
  writing: PenLine,
};

const sizes = {
  sm: 'size-8 rounded-[10px] [&_svg]:size-4',
  md: 'size-10 rounded-xl [&_svg]:size-[18px]',
  lg: 'size-12 rounded-[15px] [&_svg]:size-[22px]',
  xl: 'size-16 rounded-[20px] [&_svg]:size-7',
};

const dotSize = {
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-2.5',
  xl: 'size-3',
};

interface AgentAvatarProps {
  agent: Agent;
  size?: keyof typeof sizes;
  showStatus?: boolean;
  className?: string;
}

export function AgentAvatar({
  agent,
  size = 'md',
  showStatus = false,
  className,
}: AgentAvatarProps) {
  const { t } = useI18n();
  const Icon = iconById[agent.id];
  const tone = toneStyles[agent.tone];
  const statusLabel =
    agent.status === 'working'
      ? t('status.working')
      : agent.status === 'waiting'
        ? t('status.waiting')
        : t('status.idle');
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center bg-gradient-to-br shadow-[0_1px_0_rgb(255_255_255/0.5)_inset,0_5px_12px_-8px_rgb(15_30_55/0.45)] ring-1 ring-inset ring-white/45',
          tone.surface,
          sizes[size],
        )}
      >
        <Icon className={tone.icon} strokeWidth={1.7} aria-hidden />
      </span>
      {showStatus && (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-surface',
            dotSize[size],
            agent.status === 'working' && 'bg-positive',
            agent.status === 'waiting' && 'bg-warning',
            agent.status === 'idle' && 'bg-muted',
          )}
          aria-label={statusLabel}
        />
      )}
    </span>
  );
}
