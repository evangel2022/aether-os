import { ArrowUp, CornerDownLeft, LockKeyhole, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Kbd } from '@/components/ui/Kbd';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { modifierSymbol } from '@/lib/platform';
import { Spinner } from '@/components/ui/Spinner';

interface CommandComposerProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  running: boolean;
  embedded?: boolean;
}

export function CommandComposer({
  prompt,
  onPromptChange,
  onSubmit,
  running,
  embedded = false,
}: CommandComposerProps) {
  const { t } = useI18n();
  const submit = () => {
    if (!prompt.trim() || running) return;
    onSubmit();
  };

  return (
    <section
      aria-label={t('command.composer.aria')}
      className={cn(
        'relative isolate rounded-[24px] border border-white/50 bg-surface/80 shadow-[0_18px_44px_-38px_rgb(var(--shadow-tint)/0.4),0_1px_0_rgb(255_255_255/0.5)_inset]',
        embedded ? 'p-3.5' : 'p-4',
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]"
        aria-hidden
      >
        <div className="absolute -right-24 -top-32 size-80 rounded-full bg-accent/[0.075] blur-3xl" />
      </div>
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="command-orb flex size-8 items-center justify-center rounded-full">
            <Sparkles className="size-4 text-white" strokeWidth={1.9} />
          </span>
          <div>
            <h2 className="text-[12.5px] font-semibold tracking-[-0.015em] text-ink">
              {t('command.composer.title')}
            </h2>
            <p className="text-[9.5px] text-muted">
              {t('command.composer.subtitle')}
            </p>
          </div>
        </div>
        <Badge tone="demo">{t('common.simulated')}</Badge>
      </div>

      <form
        className="relative mt-3"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="rounded-[16px] border border-line/[0.09] bg-surface/80 p-1.5 shadow-[0_8px_26px_-22px_rgb(var(--shadow-tint)/0.45)] transition-all duration-200 focus-within:border-accent/35 focus-within:shadow-[0_0_0_3px_rgb(var(--accent)/0.07)]">
          <textarea
            value={prompt}
            rows={2}
            onChange={(event) => onPromptChange(event.target.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.preventDefault();
                submit();
              }
            }}
            placeholder={t('command.composer.placeholder')}
            aria-label={t('command.composer.inputAria')}
            data-testid="command-input"
            className="block min-h-[52px] w-full resize-none bg-transparent px-2.5 py-2 text-[13px] leading-relaxed text-ink outline-none placeholder:text-muted/80"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-0.5">
            <div className="flex items-center gap-2 text-[9px] text-muted">
              <span className="flex items-center gap-1">
                <LockKeyhole className="size-2.5" />
                {t('common.localOnly')}
              </span>
              <span className="h-2.5 w-px bg-line/10" aria-hidden />
              <span className="flex items-center gap-1">
                <Kbd>{modifierSymbol}</Kbd>
                <Kbd>
                  <CornerDownLeft className="size-2.5" />
                </Kbd>
                {t('command.composer.shortcutToPlan')}
              </span>
            </div>
            <Button
              type="submit"
              size="sm"
              disabled={!prompt.trim() || running}
              data-testid="command-submit"
              leadingIcon={
                running ? <Spinner className="size-3.5 text-on-accent" /> : undefined
              }
              trailingIcon={
                !running ? <ArrowUp className="size-3" strokeWidth={2.2} /> : undefined
              }
              className="h-7 px-3 text-[10.5px]"
            >
              {running
                ? t('command.composer.planning')
                : t('command.composer.submit')}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
