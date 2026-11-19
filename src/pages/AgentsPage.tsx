import { ArrowRight, FlaskConical, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AgentCard } from '@/components/agents/AgentCard';
import { AgentDetailSheet } from '@/components/agents/AgentDetailSheet';
import { Button } from '@/components/ui/Button';
import { DemoBadge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AGENTS } from '@/data/agents';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { useDesktop } from '@/state/desktop';
import { useWindows } from '@/state/windows';
import type { Agent } from '@/types';

export function AgentsPage({ embedded = false }: { embedded?: boolean }) {
  const { navigate } = useDesktop();
  const { openApp } = useWindows();
  const { t } = useI18n();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const workingCount = AGENTS.filter((agent) => agent.status === 'working').length;
  const agentCount = AGENTS.length;
  const summaryKey =
    agentCount === 1 ? 'agents.summary.one' : 'agents.summary.other';

  const openAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setSheetOpen(true);
  };

  const closeSheet = () => setSheetOpen(false);

  const openCommand = () => {
    if (embedded) {
      openApp('command');
    } else {
      navigate('command');
    }
  };

  const openTasks = () => {
    setSheetOpen(false);
    if (embedded) {
      openApp('tasks');
    } else {
      navigate('tasks');
    }
  };

  return (
    <div
      className={cn(
        'aether-scroll h-full overflow-y-auto page-pad',
        embedded ? 'pb-5 pt-4' : 'pb-8 pt-7',
      )}
      data-testid="agents-page"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col">
        {embedded ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <DemoBadge />
              <span className="text-[10.5px] font-medium text-muted">
                {t(summaryKey, { count: agentCount, working: workingCount })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                data-testid="agents-view-tasks"
                trailingIcon={<ArrowRight className="size-3" />}
                onClick={openTasks}
              >
                {t('agents.viewTasks')}
              </Button>
              <Button
                size="sm"
                leadingIcon={<Sparkles className="size-3.5" />}
                onClick={openCommand}
              >
                {t('agents.createPlan')}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <PageHeader
              eyebrow={t('agents.eyebrow')}
              title={t('agents.title')}
              description={t('agents.description')}
              actions={
                <>
                  <DemoBadge />
                  <Button
                    data-testid="agents-create-plan"
                    leadingIcon={<Sparkles className="size-3.5" />}
                    onClick={openCommand}
                  >
                    {t('agents.createPlan')}
                  </Button>
                </>
              }
            />

            <div
              data-testid="agents-demo-note"
              className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[14px] border border-line/[0.06] bg-line/[0.02] px-3 py-2 text-[10.5px] leading-relaxed text-muted"
            >
              <FlaskConical className="size-3 shrink-0" strokeWidth={1.8} aria-hidden />
              <p className="font-semibold text-ink-2">{t('agents.demoNote.title')}</p>
              <p>{t('agents.demoNote.body')}</p>
            </div>

            <SectionHeading
              className="mt-7"
              title={t('agents.section.title')}
              description={t('agents.section.description')}
              action={
                <div className="flex items-center gap-1.5">
                  <span className="hidden text-[10.5px] font-medium text-muted sm:inline">
                    {workingCount === 1
                      ? t('agents.workingNow.one')
                      : t('agents.workingNow.other', { count: workingCount })}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    data-testid="agents-view-tasks"
                    trailingIcon={<ArrowRight className="size-3" />}
                    onClick={openTasks}
                  >
                    {t('agents.viewTasks')}
                  </Button>
                </div>
              }
            />
          </>
        )}

        <div
          className={cn(
            'grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4',
            embedded ? 'mt-3' : 'mt-4',
          )}
        >
          {AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onOpen={openAgent} />
          ))}
        </div>
      </div>

      <AgentDetailSheet
        agent={selectedAgent}
        open={sheetOpen}
        onClose={closeSheet}
        onViewTasks={openTasks}
      />
    </div>
  );
}
