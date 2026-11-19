import { LockKeyhole, Play, Power } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n';

interface MemoryPausedStateProps {
  total: number;
  pinned: number;
  onEnable: () => void;
}

/** Designed resting state shown when the user pauses memory entirely. */
export function MemoryPausedState({ total, pinned, onEnable }: MemoryPausedStateProps) {
  const { t } = useI18n();

  return (
    <section
      data-testid="memory-paused"
      aria-label={t('memory.paused.aria')}
      className="relative mt-5 overflow-hidden rounded-[24px] border border-line/[0.07] bg-surface/45 px-6 py-12 text-center backdrop-blur-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgb(var(--accent)/0.08),transparent_72%)]"
      />

      <div className="relative mx-auto flex max-w-[430px] flex-col items-center">
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute -inset-3 rounded-[26px] border border-dashed border-line/[0.1]"
          />
          <span className="relative flex size-14 items-center justify-center rounded-[18px] border border-line/[0.08] bg-surface/75 text-muted shadow-[0_14px_28px_-24px_rgb(var(--shadow-tint)/0.55)]">
            <Power className="size-6" strokeWidth={1.6} aria-hidden="true" />
          </span>
        </div>

        <h2 className="mt-5 text-[16px] font-semibold tracking-[-0.02em] text-ink">
          {t('memory.paused.title')}
        </h2>
        <p className="mt-2 text-[12px] leading-relaxed text-ink-2">
          {t(pinned > 0 ? 'memory.paused.bodyPinned' : 'memory.paused.body', {
            total,
            pinned,
          })}
        </p>

        <Button
          data-testid="memory-enable"
          className="mt-5"
          leadingIcon={<Play className="size-3.5" />}
          onClick={onEnable}
        >
          {t('memory.paused.enable')}
        </Button>

        <p className="mt-3.5 flex items-center justify-center gap-1.5 text-[9.5px] leading-relaxed text-muted">
          <LockKeyhole className="size-2.5 shrink-0" aria-hidden="true" />
          {t('memory.paused.footer')}
        </p>
      </div>
    </section>
  );
}
