import { Brain, CloudOff, LockKeyhole, Pin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';

interface MemorySummaryProps {
  total: number;
  pinned: number;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

/** Calm context band: what Aether remembers, where it lives and the master switch. */
export function MemorySummary({ total, pinned, enabled, onToggle }: MemorySummaryProps) {
  const { t } = useI18n();

  return (
    <section
      data-testid="memory-summary"
      aria-label={t('memory.summary.aria')}
      className="mt-5 flex flex-wrap items-start gap-4 rounded-[22px] border border-line/[0.07] bg-surface/55 p-4 shadow-[0_18px_36px_-32px_rgb(var(--shadow-tint)/0.45)] backdrop-blur-sm sm:items-center sm:gap-5 sm:p-5"
    >
      <div
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-[14px] border transition-colors duration-300',
          enabled
            ? 'border-accent/15 bg-accent-soft/70 text-accent-strong'
            : 'border-line/[0.08] bg-line/[0.04] text-muted',
        )}
        aria-hidden="true"
      >
        <Brain className="size-5" strokeWidth={1.7} />
      </div>

      <div className="min-w-0 flex-1 basis-[280px]">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[13.5px] font-semibold tracking-[-0.015em] text-ink">
            {t('memory.summary.title')}
          </h2>
          <Badge tone={enabled ? 'positive' : 'neutral'} dot>
            {enabled ? t('memory.summary.active') : t('memory.summary.paused')}
          </Badge>
          <Badge tone="demo">{t('memory.summary.demoBadge')}</Badge>
        </div>

        <p className="mt-1.5 max-w-[64ch] text-[11.5px] leading-relaxed text-ink-2">
          {t('memory.summary.description')}
        </p>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-muted">
          <span className="flex items-center gap-1.5">
            <Pin className="size-3" aria-hidden="true" />
            <span className="tabular-nums font-medium text-ink-2">{pinned}</span>{' '}
            {t('memory.summary.pinned')}
          </span>
          <span className="flex items-center gap-1.5">
            <Brain className="size-3" aria-hidden="true" />
            <span className="tabular-nums font-medium text-ink-2">{total}</span>{' '}
            {t('memory.summary.remembered')}
          </span>
          <span className="flex items-center gap-1.5">
            <LockKeyhole className="size-3" aria-hidden="true" />
            {t('common.localOnly')}
          </span>
          <span className="flex items-center gap-1.5">
            <CloudOff className="size-3" aria-hidden="true" />
            {t('common.neverSynced')}
          </span>
        </div>
      </div>

      <div
        data-testid="memory-toggle"
        className="flex w-full shrink-0 items-center justify-between gap-4 rounded-[15px] border border-line/[0.07] bg-surface/60 px-3.5 py-2.5 sm:w-auto"
      >
        <div className="min-w-0">
          <p className="text-[11.5px] font-medium leading-tight text-ink">
            {t('memory.summary.toggleTitle')}
          </p>
          <p
            className={cn(
              'mt-0.5 text-[9.5px] leading-tight',
              enabled ? 'text-positive' : 'text-muted',
            )}
          >
            {enabled ? t('memory.summary.toggleOn') : t('memory.summary.paused')}
          </p>
        </div>
        <Toggle
          checked={enabled}
          onChange={onToggle}
          label={t('memory.summary.toggleLabel')}
          hideLabel
        />
      </div>
    </section>
  );
}
