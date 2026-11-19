import { ArrowUp, CornerDownLeft, Sparkles } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Kbd } from '@/components/ui/Kbd';
import { useI18n } from '@/i18n';
import { COMMAND_SUGGESTIONS } from '@/lib/command-simulation';
import { commandShortcut } from '@/lib/platform';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';

export function HomeCommand() {
  const { navigate } = useDesktop();
  const { runCommand } = useDemoData();
  const { t, tr } = useI18n();
  const [prompt, setPrompt] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    runCommand(prompt);
    navigate('command');
  };

  return (
    <section
      aria-label={t('home.command.title')}
      className="relative isolate flex h-full min-h-[250px] flex-col rounded-[26px] border border-white/50 bg-surface/70 p-5 shadow-[0_18px_40px_-32px_rgb(var(--shadow-tint)/0.35),0_1px_0_rgb(255_255_255/0.5)_inset] short:min-h-0 short:p-4"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]"
        aria-hidden
      >
        <div className="absolute -right-24 -top-36 size-[360px] rounded-full bg-accent/[0.09] blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 size-64 rounded-full bg-[#c5b5ff]/[0.08] blur-3xl" />
      </div>
      <div className="relative flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="command-orb flex size-8 items-center justify-center rounded-full">
              <Sparkles className="size-4 text-white" strokeWidth={1.9} />
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-[-0.01em] text-ink">
                {t('home.command.title')}
              </p>
              <p className="text-[9.5px] text-muted">{t('home.command.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge tone="demo" className="hidden sm:inline-flex">
              {t('common.demo')}
            </Badge>
            <span className="hidden items-center gap-1 text-[9.5px] text-muted md:flex">
              <Kbd>{commandShortcut}</Kbd>
              {t('home.command.anywhere')}
            </span>
          </div>
        </div>

        <div className="relative mt-4 short:mt-3">
          <h2 className="text-[clamp(1.3rem,2vw,1.65rem)] font-semibold leading-tight tracking-[-0.035em] text-ink">
            {t('home.command.heading')}
          </h2>
          <p className="mt-1.5 max-w-[52ch] text-[12px] leading-relaxed text-ink-2 short:hidden">
            {t('home.command.description')}
          </p>
          <p className="mt-1 hidden text-[11px] leading-relaxed text-ink-2 short:block">
            {t('home.command.descriptionCompact')}
          </p>
        </div>

        <form onSubmit={submit} className="relative mt-4 short:mt-3">
          <div className="flex items-center gap-2 rounded-[16px] border border-line/[0.09] bg-surface/80 py-1.5 pl-3.5 pr-1.5 shadow-[0_6px_20px_-16px_rgb(var(--shadow-tint)/0.45)] transition-all duration-200 focus-within:border-accent/35 focus-within:shadow-[0_0_0_3px_rgb(var(--accent)/0.07),0_8px_24px_-16px_rgb(var(--accent)/0.3)]">
            <Sparkles className="size-4 shrink-0 text-accent/80" strokeWidth={1.8} />
            <input
              ref={inputRef}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={t('home.command.placeholder')}
              aria-label={t('home.command.inputAria')}
              data-testid="home-command-input"
              className="h-8 min-w-0 flex-1 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-muted/80"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!prompt.trim()}
              className="h-7 px-3 text-[10.5px]"
              trailingIcon={<ArrowUp className="size-3" strokeWidth={2.2} />}
              data-testid="home-command-submit"
            >
              {t('home.command.submit')}
            </Button>
          </div>
        </form>

        <div className="relative mt-auto flex flex-wrap items-center justify-between gap-2 pt-3 short:pt-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {COMMAND_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setPrompt(tr(suggestion.prompt));
                  inputRef.current?.focus();
                }}
                className="rounded-full border border-line/[0.08] bg-surface/50 px-2.5 py-1 text-[9.5px] font-medium text-ink-2 transition-colors duration-150 hover:border-line/15 hover:bg-surface hover:text-ink"
              >
                {tr(suggestion.title)}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[9px] text-muted">
            <CornerDownLeft className="size-2.5" />
            {t('home.command.localSimulation')}
          </span>
        </div>
      </div>
    </section>
  );
}
