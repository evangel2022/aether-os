import { Pin, Quote } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import type { MemoryItem } from '@/types';
import { MEMORY_CATEGORY_META } from './memory-meta';

interface MemoryCardProps {
  memory: MemoryItem;
  onTogglePin: (memoryId: string) => void;
}

/** One piece of visible, local-only context. */
export function MemoryCard({ memory, onTogglePin }: MemoryCardProps) {
  const { t, tr } = useI18n();
  const meta = MEMORY_CATEGORY_META[memory.category];
  const Icon = meta.icon;

  return (
    <article
      data-testid={`memory-card-${memory.id}`}
      data-pinned={memory.pinned ? 'true' : undefined}
      className={cn(
        'group flex h-full flex-col rounded-[20px] border p-4 transition-[border-color,box-shadow,background-color] duration-300',
        memory.pinned
          ? 'border-accent/[0.22] bg-accent/[0.022] shadow-[0_16px_32px_-28px_rgb(var(--shadow-tint)/0.5)]'
          : 'border-line/[0.07] bg-surface/55 hover:border-line/[0.13] hover:shadow-[0_18px_34px_-30px_rgb(var(--shadow-tint)/0.45)]',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 pt-0.5">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[4px] text-[9px] font-semibold uppercase tracking-[0.06em]',
              meta.chipClassName,
            )}
          >
            <Icon className="size-3" strokeWidth={1.8} aria-hidden="true" />
            {t(meta.labelKey)}
          </span>
          {memory.pinned && (
            <span className="flex items-center gap-1 text-[8.5px] font-semibold uppercase tracking-[0.08em] text-accent-strong/80">
              <Pin className="size-2.5 fill-current" aria-hidden="true" />
              {t('common.pinned')}
            </span>
          )}
          <span className="text-[9.5px] text-muted">
            {t('memory.card.updated', { date: tr(memory.updatedAt) })}
          </span>
        </div>

        <IconButton
          label={memory.pinned ? t('memory.card.unpin') : t('memory.card.pin')}
          data-testid={`memory-pin-${memory.id}`}
          aria-pressed={memory.pinned}
          size="sm"
          onClick={() => onTogglePin(memory.id)}
          className={cn(
            '-mr-0.5 -mt-0.5',
            memory.pinned
              ? 'bg-accent/[0.1] text-accent-strong hover:bg-accent/[0.16]'
              : 'text-muted/70 hover:bg-line/[0.06] hover:text-ink',
          )}
        >
          <Pin className={cn('size-3.5', memory.pinned && 'fill-current')} />
        </IconButton>
      </div>

      <h3 className="mt-2.5 text-[13.5px] font-semibold leading-snug tracking-[-0.015em] text-ink">
        {tr(memory.title)}
      </h3>
      <p className="mt-1.5 text-[11.5px] leading-[1.72] text-ink-2">{tr(memory.summary)}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {memory.tags.map((tag, index) => (
          <span
            key={`${memory.id}-tag-${index}`}
            className="rounded-full border border-line/[0.06] bg-line/[0.035] px-2 py-[2px] text-[9px] font-medium text-muted"
          >
            {tr(tag)}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-line/[0.055] pt-2.5">
          <span className="flex min-w-0 items-center gap-1.5 text-[9.5px] text-muted">
            <Quote className="size-2.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{tr(memory.source)}</span>
          </span>
          <span
            className="flex shrink-0 items-center gap-1.5 text-[9.5px] text-muted"
            title={t('memory.card.confidenceTitle')}
          >
            <span className="h-1 w-8 overflow-hidden rounded-full bg-line/[0.1]" aria-hidden="true">
              <span
                className="block h-full rounded-full bg-accent/70"
                style={{ width: `${memory.confidence}%` }}
              />
            </span>
            <span className="tabular-nums font-semibold text-ink-2">{memory.confidence}%</span>
          </span>
        </div>
      </div>
    </article>
  );
}
