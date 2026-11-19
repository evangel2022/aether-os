import { motion } from 'framer-motion';
import { ArrowUp, CornerDownLeft, Sparkles } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Kbd } from '@/components/ui/Kbd';
import { useI18n } from '@/i18n';
import { COMMAND_SUGGESTIONS } from '@/lib/command-simulation';
import { cn } from '@/lib/cn';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';

export function CommandPalette() {
  const { closeOverlay, navigate } = useDesktop();
  const { t, tr } = useI18n();
  const { runCommand } = useDemoData();
  const [prompt, setPrompt] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    runCommand(prompt);
    closeOverlay();
    navigate('command');
  };

  return (
    <motion.div
      className="fixed inset-0 z-[190] flex items-start justify-center px-4 pt-[14vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <button
        type="button"
        aria-label={t('shell.palette.closeAria')}
        tabIndex={-1}
        onClick={closeOverlay}
        className="absolute inset-0 bg-[#081221]/25 backdrop-blur-[5px]"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t('shell.palette.aria')}
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
        className="overlay-panel relative w-full max-w-[610px] origin-top overflow-hidden rounded-[26px]"
      >
        <form onSubmit={submit}>
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="command-orb flex size-9 shrink-0 items-center justify-center rounded-full">
              <Sparkles className="size-[17px] text-white" strokeWidth={1.9} />
            </span>
            <input
              autoFocus
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={t('shell.palette.placeholder')}
              aria-label={t('shell.palette.inputAria')}
              className="min-w-0 flex-1 bg-transparent text-[15px] font-medium tracking-[-0.015em] text-ink outline-none placeholder:font-normal placeholder:text-muted/80"
            />
            <button
              type="submit"
              disabled={!prompt.trim()}
              aria-label={t('shell.palette.submitAria')}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-all duration-200 hover:brightness-105 disabled:opacity-25"
            >
              <ArrowUp className="size-4" strokeWidth={2.2} />
            </button>
          </div>

          <div className="border-t border-line/[0.065] px-2.5 py-2">
            <p className="px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">
              {t('shell.palette.tryRequest')}
            </p>
            <div className="space-y-0.5">
              {COMMAND_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
                <button
                  key={`${tr(suggestion.title)}-${index}`}
                  type="button"
                  onClick={() => setPrompt(tr(suggestion.prompt))}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-line/[0.04]',
                    index === 0 ? 'bg-line/[0.025]' : '',
                  )}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-line/[0.08] bg-surface/60 text-muted">
                    <Sparkles className="size-3.5" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11.5px] font-medium text-ink">
                      {tr(suggestion.title)}
                    </span>
                    <span className="block truncate text-[10.5px] text-muted">
                      {tr(suggestion.prompt)}
                    </span>
                  </span>
                  <span className="shrink-0 text-[9px] font-medium text-muted">
                    {tr(suggestion.hint)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line/[0.065] px-4 py-2.5 text-[9.5px] text-muted">
            <span>{t('shell.palette.footer')}</span>
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Kbd>
                  <CornerDownLeft className="size-2.5" />
                </Kbd>
                {t('shell.palette.toPlan')}
              </span>
              <span className="flex items-center gap-1">
                <Kbd>Esc</Kbd>
                {t('shell.palette.toClose')}
              </span>
            </span>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
