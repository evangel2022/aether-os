import { ArrowUpRight, ListChecks, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { CommandComposer } from '@/components/command/CommandComposer';
import { CommandContext } from '@/components/command/CommandContext';
import { CommandPlan } from '@/components/command/CommandPlan';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { useI18n } from '@/i18n';
import { COMMAND_SUGGESTIONS } from '@/lib/command-simulation';
import { cn } from '@/lib/cn';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';
import { useWindows } from '@/state/windows';

export function CommandCenterPage({ embedded = false }: { embedded?: boolean }) {
  const { navigate } = useDesktop();
  const { openApp } = useWindows();
  const { t, tr } = useI18n();
  const {
    activeRun,
    commandHistory,
    runCommand,
    cancelActiveRun,
  } = useDemoData();
  const [prompt, setPrompt] = useState('');
  const isRunning = activeRun?.status === 'running';

  const submit = () => {
    if (!prompt.trim() || isRunning) return;
    runCommand(prompt);
    setPrompt('');
  };

  const openTasks = () => {
    if (embedded) {
      openApp('tasks');
    } else {
      navigate('tasks');
    }
  };

  return (
    <div className="aether-scroll h-full overflow-y-auto">
      <div className={cn('page-pad', embedded ? 'pb-5 pt-4' : 'pb-8 pt-6')}>
        {!embedded && (
          <PageHeader
            eyebrow={t('command.eyebrow')}
            title={t('command.title')}
            description={t('command.description')}
            actions={
              <>
                <Badge tone="demo">{t('command.demoBadge')}</Badge>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 text-[10.5px]"
                  onClick={openTasks}
                  leadingIcon={<ListChecks className="size-3" />}
                >
                  {t('command.tasksButton')}
                </Button>
              </>
            }
          />
        )}

        <div
          className={cn(
            'grid grid-cols-1 gap-3.5',
            embedded ? 'mt-0' : 'mt-4 xl:grid-cols-[minmax(0,1fr)_310px]',
          )}
        >
          <div className="min-w-0 space-y-3.5">
            <CommandComposer
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={submit}
              running={isRunning}
              embedded={embedded}
            />

            {activeRun ? (
              <CommandPlan
                run={activeRun}
                onStop={cancelActiveRun}
                onOpenTasks={openTasks}
              />
            ) : (
              <section
                aria-label={t('command.inspiration.aria')}
                className="rounded-[24px] border border-line/[0.075] bg-surface/45 p-5 backdrop-blur-xl"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-3.5 text-accent" strokeWidth={1.8} />
                      <h2 className="text-[12.5px] font-semibold tracking-[-0.015em] text-ink">
                        {t('command.inspiration.title')}
                      </h2>
                      <Badge tone="demo">{t('common.simulated')}</Badge>
                    </div>
                    <p className="mt-1 max-w-[60ch] text-[10.5px] leading-relaxed text-muted">
                      {t('command.inspiration.description')}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {COMMAND_SUGGESTIONS.map((suggestion, index) => (
                    <button
                      key={`${tr(suggestion.title)}-${index}`}
                      type="button"
                      onClick={() => setPrompt(tr(suggestion.prompt))}
                      className="group flex flex-col rounded-[15px] border border-line/[0.06] bg-surface/40 p-3 text-left transition-all duration-200 ease-aether hover:border-line/12 hover:bg-surface/80 hover:shadow-[0_10px_24px_-20px_rgb(var(--shadow-tint)/0.5)] active:scale-[0.99]"
                    >
                      <span className="flex items-center justify-between">
                        <span className="text-[8.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                          0{index + 1} · {tr(suggestion.hint)}
                        </span>
                        <ArrowUpRight className="size-3 text-muted/50 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </span>
                      <span className="mt-1.5 text-[11.5px] font-medium leading-snug text-ink">
                        {tr(suggestion.title)}
                      </span>
                      <span className="mt-1 line-clamp-2 text-[9.5px] leading-relaxed text-muted">
                        {tr(suggestion.prompt)}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/[0.06] pt-3 text-[9px] text-muted">
                  {[
                    t('command.inspiration.stepOne'),
                    t('command.inspiration.stepTwo'),
                    t('command.inspiration.stepThree'),
                  ].map((label, index) => (
                    <span key={label} className="flex items-center gap-1.5">
                      <span className="flex size-4 items-center justify-center rounded-full bg-accent/10 text-[8px] font-semibold text-accent">
                        {index + 1}
                      </span>
                      {label}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {!embedded && (
            <div className="hidden xl:block">
              <CommandContext history={commandHistory} onUsePrompt={setPrompt} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
